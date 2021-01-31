const { DataTypes, Sequelize } = require('sequelize');

class Postgres {
  constructor() {
    this.connection = null;
    this.User = null;

    this.initialize();
  }

  async initialize() {
    await this.connect();
    await this.defineUserModel();
  }

  async connect() {
    this.connection = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER,
      process.env.POSTGRES_PASSWORD, {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        dialect: 'postgres',
        logging: false,
      });
  }

  async defineUserModel() {
    this.User = this.connection.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user: {
        type: DataTypes.STRING(16),
        required: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(64),
        required: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(16),
        required: true,
        defaultValue: 'ativo',
      },
      password: {
        type: DataTypes.STRING(64),
        required: true,
        allowNull: false,
      },
    }, { timestamps: false });

    await this.connection.sync();
  }
}

module.exports = Postgres;
