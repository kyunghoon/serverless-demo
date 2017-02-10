const uuid = require('uuid-js');
const bcryptjs = require('bcryptjs');
const aws = require('../aws');
const auth = require('../auth');

const create = async (email, password) => {
  const exists = await aws.dynamodb.Query('Users', 'emailIndex', { email }, []);
  if (exists.length > 0) throw new Error('email already in use');
  const newUser = await aws.dynamodb.Put('Users', { id: uuid.create().toString() }, {
    email,
    permissions: ['UPDATE_USER', 'DELETE_USER'],
    screenName: email.split('@')[0],
    hash: bcryptjs.hashSync(password, 10),
  });
  return Object.assign({}, newUser, { token: auth.authenticate(newUser) });
};

const login = async (fields, email, password) => {
  const result = await aws.dynamodb.Query('Users', 'emailIndex', { email }, [].concat(fields, ['hash']));
  if (result.length !== 1) throw new Error('multiple users found');

  const user = result[0];
  if (!bcryptjs.compareSync(password, user.hash)) {
    throw new Error('invalid password');
  }
  return Object.assign({}, user, { token: auth.authenticate(user) });
};

const findOne = async (id) =>
  aws.dynamodb.Get('Users', { id });

const find = async (fields) =>
  aws.dynamodb.Scan('Users', fields);

const update = async (id, name, screenName) =>
  aws.dynamodb.Update('Users', { id }, { name, screenName });

const remove = async (id) => {
  if (id === '1') throw new Error('cannot remove guest account');
  return aws.dynamodb.Remove('Users', { id });
};

module.exports = {
  create,
  find,
  findOne,
  login,
  remove,
  update,
};
