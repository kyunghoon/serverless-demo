const AWS = require('aws-sdk');
const config = require('../../config');
const _ = require('lodash');

if (!process.env.NODE_ENV) throw new Error('NODE_ENV not set');

const formatTableName = tableName => `${process.env.NODE_ENV}_${tableName}`;

function promisify(callback) {
  const that = this;
  return function closure() {
    const args = Array.prototype.slice.call(arguments, 0); // eslint-disable-line prefer-rest-params
    return new Promise(function doPromise(resolve, reject) { // eslint-disable-line prefer-arrow-callback
      args.push(function doArgs() {
        if (arguments.length < 1) {
          return resolve.apply(that);
        } else if (arguments[0]) { // eslint-disable-line prefer-rest-params
          return reject.apply(that, Array.prototype.slice.call(arguments, 0)); // eslint-disable-line prefer-rest-params
        } else {
          return resolve.apply(that, Array.prototype.slice.call(arguments, 1)); // eslint-disable-line prefer-rest-params
        }
      });
      try {
        return callback.apply(that, args);
      } catch (e) {
        return reject(e);
      }
    });
  };
}

const promisifyAll = (obj, context) => {
  const ret = {};
  Object.entries(obj).forEach(([key, value]) => {
    ret[key] = promisify(value.bind(context));
  });
  return ret;
};

// { a: 1, b: 2 }, ... -> { ':a': 1, ':b': 2, ... }
const buildAttributeValues = (...rest) =>
  Object.entries(Object.assign({}, ...rest)).reduce((r, [k, v]) => Object.assign(r, { [`:${k}`]: v }), {});

// ['a', 'b', ...] -> { '#a': 'a', '#b': 'b', ... }
const buildAttributeNames = (...rest) =>
  _.uniq(Array.concat(...rest)).reduce((r, i) => Object.assign(r, { [`#${i}`]: i }), {});

// ['a', 'b', ...] -> 'set #a = :a, #b = :b, ...'
const buildUpdateExpression = (...rest) =>
  `set ${_.uniq(Array.concat(...rest)).reduce((r, i) => `${r ? `${r}, ` : r}#${i} = :${i}`, '')}`;

// ['a', 'b', ...] -> '#a = :a AND #b = :b AND ...'
const buildConditionExpression = fn => (...rest) =>
  _.uniq(Array.concat(...rest)).reduce((r, i) => `${r ? `${r} AND ` : r}${fn(i)}`, '');

// ['a', 'b', ...] -> '#a, #b, ...'
const buildProjectionExpression = (...rest) =>
  _.uniq(Array.concat(...rest)).map(i => `#${i}`).join(', ');

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
  apiVersions: {
    dynamodb: '2012-08-10',
  },
});

const docClient = new AWS.DynamoDB.DocumentClient({
  endpoint: new AWS.Endpoint(config.AWS_DYNAMO_DB_ENDPOINT),
});

const dynamodb = promisifyAll({
  put: docClient.put,
  get: docClient.get,
  scan: docClient.scan,
  update: docClient.update,
  delete: docClient.delete,
  query: docClient.query,
}, docClient);

const helpers = {
  Query: async (tableName, IndexName, Key, Names) => {
    const result = await dynamodb.query({
      TableName: formatTableName(tableName),
      IndexName,
      KeyConditionExpression: buildConditionExpression(i => `#${i} = :${i}`)(Object.keys(Key)),
      ExpressionAttributeNames: buildAttributeNames(Object.keys(Key), Names),
      ExpressionAttributeValues: buildAttributeValues(Key),
      ProjectionExpression: buildProjectionExpression(Object.keys(Key), Names),
    });
    return result.Items;
  },
  Update: async (tableName, Key, Values) => {
    const result = await dynamodb.update(Object.assign({
      TableName: formatTableName(tableName),
      Key,
      ReturnValues: 'ALL_NEW',
      ConditionExpression: buildConditionExpression(i => `#${i} = :${i}`)(Object.keys(Key)),
      ExpressionAttributeNames: buildAttributeNames(Object.keys(Key), Object.keys(Values)),
      ExpressionAttributeValues: buildAttributeValues(Key, Values),
      UpdateExpression: buildUpdateExpression(Object.keys(Values)),
    }));
    return result.Attributes;
  },
  Remove: async (tableName, Key) => {
    const result = await dynamodb.delete({
      TableName: formatTableName(tableName),
      Key,
      ReturnValues: 'ALL_OLD',
    });
    return result.Attributes;
  },
  Scan: async (tableName, AttributesToGet) => {
    const result = await dynamodb.scan({
      TableName: formatTableName(tableName),
      AttributesToGet,
    });
    return result.Items;
  },
  Get: async (tableName, Key) => {
    const result = await dynamodb.get({
      TableName: formatTableName(tableName),
      Key,
    });
    return result.Item;
  },
  Put: async (tableName, Key, Item) => {
    const query = {
      TableName: formatTableName(tableName),
      ConditionExpression: buildConditionExpression(i => `attribute_not_exists(${i})`)(Object.keys(Key)),
      Item: Object.assign({}, Item, Key),
    };
    await dynamodb.put(query);
    return Object.assign({}, Item, Key);
  },
};

module.exports = {
  sdk: AWS,
  dynamodb: helpers,
};
