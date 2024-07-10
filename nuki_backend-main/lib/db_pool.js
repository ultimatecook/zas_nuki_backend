import mysql from 'mysql2';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

const sequealize = new Sequelize(
    process.env.CENTRAL_DB_NAME,
    process.env.CENTRAL_DB_USER,
    process.env.CENTRAL_DB_PASS,
     {
       host: process.env.CENTRAL_DB_HOST,
       dialect: 'mysql',
       logging: false,
       port: process.env.CENTRAL_DB_PORT,
    
      
     }
   );

export default sequealize;