'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const vehicle = sequelize.define('vehicle', {
    max_capacity: DataTypes.INTEGER,
    current_capacity_remaining: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});
  vehicle.associate = function(models) {
    // associations can be defined here
    vehicle.belongsTo(models.courier, {
      foreignKey: 'courierId',
      onDelete: 'CASCADE'
    })
  };

  vehicle.prototype.update_capacity = async function({ capacity } = { }) {

    if (isNaN(capacity / 1)) return;

    let new_capacity = this.current_capacity_remaining + capacity;
    if (new_capacity <= 0) new_capacity = 0;
    if (new_capacity >= this.max_capacity) new_capacity = this.max_capacity

    await this.update ({
      current_capacity_remaining: new_capacity
    })

    return this;
  }

  return vehicle;
};