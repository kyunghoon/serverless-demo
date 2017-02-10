const fs = require('fs');
const path = require('path');
const commonConfig = require('../src/config');

if (!process.env.NODE_ENV) throw new Error('NODE_ENV not set');
if (process.env.NODE_ENV !== 'production' &&
  process.env.NODE_ENV !== 'development' &&
  process.env.NODE_ENV !== 'local') {
  throw new Error('NODE_ENV invalid value must be one of [local | development | production]');
}

if (!process.env.TWITTER_CONSUMER_KEY) throw new Error('TWITTER_CONSUMER_KEY not set');
if (!process.env.TWITTER_CONSUMER_SECRET) throw new Error('TWITTER_CONSUMER_SECRET not set');
if (!process.env.TWITTER_ACCESS_TOKEN_KEY) throw new Error('TWITTER_ACCESS_TOKEN_KEY not set');
if (!process.env.TWITTER_ACCESS_TOKEN_SECRET) throw new Error('TWITTER_ACCESS_TOKEN_SECRET not set');

console.log('GENERATING CONFIG FOR', process.env.NODE_ENV);

const vars = require(`../envs/${process.env.NODE_ENV}.js`); // eslint-disable-line import/no-dynamic-require

const config = Object.assign({}, commonConfig, vars);

// eslint-disable-line no-multi-spaces
const content = `
process.env.NODE_ENV = "${process.env.NODE_ENV}";

module.exports = {
${Object.entries(config).reduce((r, [key, value]) => (`${r}  ${key}: ${JSON.stringify(value)},
`), '')}};
`;

const configPath = path.join(__dirname, '../build/config.js');

fs.writeFile(configPath, content, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log(`build/config.js (${process.env.NODE_ENV}) file was generated`);
  }
});
