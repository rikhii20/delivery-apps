'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Deliveryman, {
        as: 'deliveryman',
        foreignKey: 'deliveryman_id'
      });
    }
  }
  Task.init(
    {
      deliveryman_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      location: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Task'
    }
  );
  return Task;
};
