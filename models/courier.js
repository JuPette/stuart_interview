'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const courier = sequelize.define('courier', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    is_currently_racing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    } // Next steps is create a Races tables and an association with this model in order to have the correct details on the current race of the courier
  }, {});
  courier.associate = function(models) {
    courier.hasOne (models.vehicle)
  };
  return courier;
};