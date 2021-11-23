'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Biodatas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            name: {
                type: Sequelize.STRING
            },
            birth_date: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            ph_number: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Biodatas');
    }
};