'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert("Users", [
      {
        username: "user1",
        password: hashPassword("user1"),
        avatarUrl: "https://zultimate.com/wp-content/uploads/2019/12/default-profile.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "user2",
        password: hashPassword("user2"),
        avatarUrl: "https://zultimate.com/wp-content/uploads/2019/12/default-profile.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "user3",
        password: hashPassword("user3"),
        avatarUrl: "https://zultimate.com/wp-content/uploads/2019/12/default-profile.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true })
  }
};
