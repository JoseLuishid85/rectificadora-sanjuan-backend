import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const connection = mysql.createPool({
    host: process.env.HOST ,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});
