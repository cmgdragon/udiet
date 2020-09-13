import Sequelize from 'sequelize';
import env from './config';

const connection = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASS, {
        host: "you-tales.com",
        dialect: "mysql"
    }

);
//console.log(DB_HOST, DB_USER, DB_PASS);

(async () => {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();