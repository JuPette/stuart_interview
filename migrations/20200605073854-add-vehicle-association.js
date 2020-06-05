'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'vehicles', // name of Source model
      'courierId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'couriers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'vehicles',
        'courierId'
    )
  }
};
