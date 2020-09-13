import express from "express";
import { EXPRESS_PORT } from './config';
import connection from './database';
import './models/Diet';

//server definition
const server = express();

const main = async () => {

    try {
        await server.listen(EXPRESS_PORT);

        console.log("Servidor de express iniciado");
    
        try {
            await connection.sync({ force: false });
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

    } catch (error) {
        console.error('Error al iniciar Express', error);
    }

}

export default main;
export { server };