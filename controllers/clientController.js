const express = require('express');
const { User, Biodata, Game, sequelize } = require('../models');


//CRUD User Resource
const addUserController = async(req, res) => {
    let { username, password } = req.body;
    const cekUser = await User.findAll({ where: { username: username } })
    if (cekUser.length > 0) {
        res.status(401).json({
            status: "FAIL",
            message: "Username already exists"
        })
    } else {
        const user = await User.create({
            username,
            password
        });

        res.status(201).json({
            status: "OK",
            data: user
        });
    }
}

const deleteUserController = async(req, res) => {
    let { id } = req.params;
    await User.destroy({
        where: {
            id
        }
    });

    res.status(201).json({
        status: "OK",
        message: `ID ${id} deletes`
    });
}

const updateUserController = async(req, res) => {
    let { username, password } = req.body;
    const { id } = req.params;
    await User.update({
        username,
        password
    }, {
        where: { id }
    });

    res.status(201).json({
        status: "OK",
        data: `Id ${id} with username ${username} updated`
    });

}

const readAllUserController = async(req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
}

const readUserIdController = async(req, res) => {
    const user = await User.findByPk(Number(req.params.id));
    console.log(user);

    if (!user) return res.json({ message: "Not Found!" });

    res.status(200).json(user);
}


//CRUD Biodatas Resource
const addBiodatasController = async(req, res) => {
    let { name, birth_date, email, ph_number, address, user_id } = req.body;
    const user = await User.findByPk(user_id);

    const checkId = await Biodata.findAll({ where: { user_id: user_id } });
    if (checkId.length > 0) {
        res.status(401).json({
            status: "Fail",
            message: `user ID "${user_id}" already has biodata`
        })

    } else {

        const biodata = await Biodata.create({
            name,
            birth_date,
            email,
            ph_number,
            address,
            user_id
        });

        // console.log(user);
        // console.log(biodata);

        console.log(await biodata.setUser(user));

        res.status(201).json({
            status: "OK",
            data: biodata
        });
    }
}


const updateBiodataController = async(req, res) => {
    let { name, birth_date, email, ph_number, address } = req.body;
    const { id } = req.params;
    await Biodata.update({
        name,
        birth_date,
        email,
        ph_number,
        address


    }, { where: { id } });
    res.status(201).json({
        status: "OK",
        data: { name, birth_date, email, ph_number, address }
    });
}

const deleteBiodatasController = async(req, res) => {
    let { id } = req.params;
    const biodata = await Biodata.findByPk(Number(id));

    if (!biodata) return res.send("Not Found!");
    await Biodata.destroy({
        where: { id }
    });
    res.status(201).json({
        status: "OK",
        message: "Biodata Deleted"
    });
};

const readBiodatasController = async(req, res) => {
    const biodatas = await Biodata.findAll();
    res.status(200).json(biodatas);
}

const readIdBiodataController = async(req, res) => {
    const biodata = await Biodata.findByPk(Number(req.params.id));
    console.log(biodata);

    if (!biodata) return res.json({ message: "Not Found!" });

    res.status(200).json(biodata);
}


//CRUD Games Resource

const gamesAddController = async(req, res) => {
    const { first_player, second_player, player_win, fp_select, sp_select, played_at, user_id } = req.body;
    const user = await User.findByPk(user_id);

    if (!user) return res.send('User ID Not found!');

    const game = await Game.create({
        first_player,
        second_player,
        player_win,
        fp_select,
        sp_select,
        played_at,
        user_id
    });

    console.log(await game.addUser(user));

    res.status(201).json({
        status: "OK",
        data: game
    })
}

const deleteGameController = async(req, res) => {
    const { id } = req.params
    await Game.destroy({
        where: {
            id
        }
    });

    res.status(201).json({
        status: "OK",
        message: `Data id ${id} deleted`
    });
}

const updateGameController = async(req, res) => {
    const game = await Game.findByPk(Number(req.params.id));
    const { first_player, second_player, player_win, fp_select, sp_select, played_at } = req.body;

    if (!game) return res.status(401).json({
        status: "Failed",
        message: "Games data not found!"
    })

    const new_game = await game.update({
        first_player,
        second_player,
        player_win,
        fp_select,
        sp_select,
        played_at
    })

    res.status(201).json({
        status: "OK",
        data: new_game
    })


}

const readGamesController = async(req, res) => {
    const games = await Game.findAll();
    res.status(200).json(games);
}

const readIdGamesController = async(req, res) => {
    const games = await Game.findByPk(Number(req.params.id));
    console.log(games);

    if (!games) return res.json({ message: "Not Found!" });

    res.status(200).json(games);
}

const userGamesController = async(req, res) => {

    const user = await User.findByPk(req.body.user_id);
    const game = await Game.findByPk(req.body.games_id);

    const user_game = await user.addGame(game);
    res.status(201).json({
        status: "OK",
        data: user_game
    })
}


module.exports = {
    addUserController,
    deleteUserController,
    updateUserController,
    readAllUserController,
    readUserIdController,
    gamesAddController,
    deleteGameController,
    addBiodatasController,
    updateBiodataController,
    deleteBiodatasController,
    readBiodatasController,
    readIdBiodataController,
    updateGameController,
    readGamesController,
    readIdGamesController,
    userGamesController
};