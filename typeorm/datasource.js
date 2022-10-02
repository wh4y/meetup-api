const { config } = require('dotenv');
const { DataSource } = require('typeorm');

config();

const datasource = new DataSource({
  type: process.env.DB_DIALECT,
  host: 'localhost',
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ["./dist/**/*.entity{.ts,.js}"],
  migrations: ['./typeorm/migrations/*.js'],
});

exports.datasource = datasource;
