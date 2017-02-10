if (!process.env.NODE_ENV) throw new Error('NODE_ENV not set');

module.exports = require(`../envs/${process.env.NODE_ENV}.js`); // eslint-disable-line import/no-dynamic-require
