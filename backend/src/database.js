import Sequelize from 'sequelize';
import env from './config';

const connection = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASS, {
        host: "127.0.0.1",
        dialect: "mysql",
        port: env.DB_PORT
    }
);

export default connection;