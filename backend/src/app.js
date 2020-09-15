import express from "express";
import { EXPRESS_PORT } from './config';
import connection from './database';
import Diet from './models/Diet';
import bcrypt from 'bcrypt';

const server = express();

const main = async () => {

    try {
        await server.listen(EXPRESS_PORT);

        console.log("Servidor de express iniciado");
    
        try {
            await connection.sync({ force: true });
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

    } catch (error) {
        console.error('Error al iniciar Express', error);
    }

    const dietObject = {
        mealData: [
            {
                name: "Merienda",
                courseMeals: [
                    {
                        name: "course 1",
                        properties: "propiedades",
                        ingredients: [
                            {
                                name: "arroz",
                                quantity: "80g",
                                location: "Soli Corbera",
                                brand: "Marca",
                                info: "más info"
                            }
                        ],
                        recipe: "preparación"
                    }
                ]
            }

        ]
    }

    const test = {
        caca: "dasdada",
        2323: "dsadsad",
        holas: {
            caca: "caca",
             1: 22,
             testjaja: "jk566/'`'`\\``",
            aver: {
                3: ["hola", "caca", "k''```//\\", {
                    2: ["ss", 2, {
                        final: "cabróòn"
                    }]
                }]
            }
        }

    }

    try {
       await Diet.create({
            title: "test",
            dietData: dietObject,
            email: "carlos.ole1996@gmail.com"
        });
        console.log("okok")
    } catch (error) {
        console.log(error+"nonooooo")
    }

}

export default main;
export { server };