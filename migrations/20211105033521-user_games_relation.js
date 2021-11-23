'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('users_games', {
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: "Users",
                    },
                    key: "id",
                },
                allowNull: false,
                primaryKey: true,
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            games_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: "Games",
                    },
                    key: "id",
                },
                allowNull: false,
                primaryKey: true,
                onDelete: 'cascade',
                onUpdate: 'cascade'
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
        await queryInterface.dropTable('users_games');
    }
};