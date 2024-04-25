'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deliveryman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Deliveryman.belongsTo(models.Supervisi, {
        as: 'supervisor',
        foreignKey: 'supervisi_id'
      });
      Deliveryman.hasMany(models.Task, {
        as: 'tasks',
        foreignKey: 'deliveryman_id'
      });
    }
  }
  Deliveryman.init(
    {
      name: DataTypes.STRING,
      nik: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.STRING,
      last_location: DataTypes.STRING,
      supervisi_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Deliveryman'
    }
  );
  return Deliveryman;
};
