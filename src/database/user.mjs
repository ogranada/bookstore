import SequelizeModule from 'sequelize';

const DataTypes = SequelizeModule.DataTypes;

export function createModel(sequelize) {
  return sequelize.define('User', {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    email: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });
}
