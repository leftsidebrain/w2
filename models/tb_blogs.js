'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_blogs.init({
    title: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    content: DataTypes.TEXT,
    nodejs: DataTypes.BOOLEAN,
    reactjs: DataTypes.BOOLEAN,
    nextjs: DataTypes.BOOLEAN,
    typescript: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    durasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_blogs',
  });
  return tb_blogs;
};