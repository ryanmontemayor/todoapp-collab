const { Sequelize } = require("sequelize");

// CREATE CONNECTION TO DATABASE
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
            acquire: 30000
        },
        // this will set the timezone of mysql2 connection to database
        timezone: "+08:00", // Asia/Manila
        logging: false
    }
);

// CONNECTION TO DATABASE SYNCRONIZATION
if (process.argv[2] == "sync") {
    sequelize.sync({ logging: true, alter: true, logging: true }).then(t => {
        process.exit(1);
    });
}

// EXPORT connector
module.exports = sequelize;