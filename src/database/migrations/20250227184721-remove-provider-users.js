module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('SELECT column_name FROM information_schema.columns WHERE table_name = \'users\' AND column_name = \'provider\'')
      .then((result) => {
        if (result[0].length > 0) {
          return queryInterface.removeColumn('users', 'provider');
        }
      });
  },

  down (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'provider', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  }
};
