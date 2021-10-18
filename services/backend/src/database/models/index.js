/* eslint-disable security/detect-object-injection */
const fs = require('fs');
const path = require('path');
const config = require('config');
const Sequelize = require('sequelize');
const sequelizeStream = require('node-sequelize-stream');

const environment = config.util.getEnv('NODE_ENV');
const logger = require('../../utils/logger').default;
const { client } = require('../../utils/metrics');
const databaseConfig = require('../config.js')[environment];

const basename = path.basename(__filename);

const database = new Sequelize({
  ...databaseConfig,
  logging: (message, time) => logger.debug({ time, message }),
  logQueryParameters: false,
  benchmark: true,
  retry: {
    name: 'database',
    max: 60 * 2,
    backoffBase: 500,
    backoffExponent: 1,
    report: (_message, info) => {
      if (info.$current === 1) return;
      logger.warn(`Trying to connect to database (try #${info.$current})`);
    },
    match: [
      Sequelize.ConnectionError,
      Sequelize.ConnectionRefusedError,
      Sequelize.ConnectionTimedOutError,
    ],
  },
});

const counter = new client.Counter({
  name: 'sequelize_table_creation_count',
  help: 'Total database rows created since process start.',
  labelNames: ['tableName'],
});

database.addHook('beforeCreate', instance => {
  counter.inc({
    tableName: instance.constructor.name,
  });
});

database.addHook('beforeBulkCreate', instances => {
  if (instances.length <= 0) return;
  counter.inc(
    {
      tableName: instances[0].constructor.name,
    },
    instances.length
  );
});

/* eslint-disable-next-line security/detect-non-literal-fs-filename */
fs.readdirSync(__dirname)
  .filter(
    file =>
      !file.startsWith('.') &&
      file !== basename &&
      file.endsWith('.js') &&
      !file.endsWith('.test.js')
  )
  .forEach(file => {
    // eslint-disable-next-line global-require, import/no-dynamic-require, security/detect-non-literal-require
    const model = require(path.join(__dirname, file))(
      database,
      Sequelize.DataTypes
    );
    database[model.name] = model;
  });

Object.keys(database).forEach(modelName => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

sequelizeStream(database);

module.exports = database;
