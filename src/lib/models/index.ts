// import { Sequelize } from 'sequelize';
// import config from '../config/config';

// const sequelize = new Sequelize('mysql', config.db.root.user, config.db.root.pass, {
//   host: config.db.host,
//   dialect: 'mysql',
// });

// export default sequelize;

import { Sequelize } from 'sequelize';
import config from '../config/config';

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    host: config.db.host,
    dialect: 'mysql',
  }
);

export default sequelize;