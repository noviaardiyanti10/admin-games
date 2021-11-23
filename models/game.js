'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        static associate(models) {
            this.belongsToMany(models.User, { through: 'users_games', foreignKey: 'games_id' })
        }
    };
    Game.init({
        first_player: DataTypes.STRING,
        second_player: DataTypes.STRING,
        player_win: DataTypes.STRING,
        fp_select: DataTypes.STRING,
        sp_select: DataTypes.STRING,
        played_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Game',
    });
    return Game;
};