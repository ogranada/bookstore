import SequelizeModule from 'sequelize';

const DataTypes = SequelizeModule.DataTypes;

export function createModel(sequelize) {
  return sequelize.define('Book', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
  });
}
