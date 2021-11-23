'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Games', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            first_player: {
                type: Sequelize.STRING
            },
            second_player: {
                type: Sequelize.STRING
            },
            player_win: {
                type: Sequelize.STRING
            },
            fp_select: {
                type: Sequelize.STRING
            },
            sp_select: {
                type: Sequelize.STRING
            },
            played_at: {
                type: Sequelize.DATE
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
        await queryInterface.dropTable('Games');
    }
};