// import sequelize from "../models";
import config from "../config/config";
import { Sequelize } from "sequelize";

async function initializeDatabase() {
  const sequelize = new Sequelize('mysql', config.db.root.user, config.db.root.pass, {
    host: config.db.host,
    dialect: 'mysql',
  });

  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${config.db.name}\`;`);
    
    console.info(`Database ${config.db.name} is ready.`);
  } catch (error) {
    console.error(`Error creating DB ${config.db.name}`)
    process.exit(1);
  }
}

export {
  initializeDatabase,
}