const express = require('express');
const { User, Biodata, Game } = require('../models');

const credential = {
    username: "adminBinar",
    password: "binar12345"
};

const adminLoginPage = (req, res) => {

    res.render('login', {
        title: "Login",
        message: req.flash('message')
    });
}

const adminLoginController = (req, res) => {
    let { username, password } = req.body;
    if (username === credential.username && password === credential.password) {
        req.session.username = username;
        console.log(req.session.username);

        res.status(201).redirect("/dashboard");
    } else {
        req.flash('message', 'Login Failed');
        res.redirect("/");
    }

}

const mainDashboard = async(req, res) => {
    console.log(req.session.username);

    const totalUsers = await User.count({ col: 'id' });
    const totalGames = await Game.count({ col: 'id' });
    res.render('main-dashboard', {
        title: "Dashboard",
        totalUsers,
        totalGames
    });
}

const addUserPage = (req, res) => {

    res.render('add-user', {
        title: " Add User",
        message: req.flash('message')
    });

}

const adminAddUserController = async(req, res) => {
    const cekUser = await User.findAll({ where: { username: req.body.username } })
    console.log(cekUser);
    if (cekUser.length > 0) {
        req.flash('message', `Username ${req.body.username} already exists `);
        res.redirect('/addUser')
    } else {
        await User.create({
            username: req.body.username,
            password: req.body.password
        });

        res.status(201).redirect('/users');
    }
}


const getAllUsers = async(req, res) => {
    const users = await User.findAll({
        include: Biodata,
    })
    console.log(users)
    res.render('list-user', {
        title: "List User",
        users
    });
}
const getAllBiodatas = async(req, res) => {
    const biodatas = await Biodata.findAll({
        include: User
    })
    console.log(biodatas)
    res.render('biodata-list', {
        title: "List Biodata",
        biodatas
    });
}

// const getAllGame = async(req, res) => {
//     const games = await Game.findAll()
//     console.log(games)
//     res.render('game-list', {
//         title: "List Game",
//         games
//     });
// }
const getAllGame = async(req, res) => {
    const games = await Game.findAll({
        include: User
    })
    console.log(games)
    res.render('game-list', {
        title: "List Game",
        games
    });
}


const deleteUserData = async(req, res) => {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) return res.send('Not found!');

    await user.destroy();
    res.status(201).redirect('/users');

}
const deleteBiodataUser = async(req, res) => {
    const biodata = await Biodata.findByPk(Number(req.params.id));

    if (!biodata) return res.send('Not found!');

    await biodata.destroy();
    res.status(201).redirect('/biodatas');

}

const updateUserPage = async(req, res) => {
    const biodata = await Biodata.liOne({
        include: User,
        where: {
            id: req.params.id
        }

    })

    console.log(biodata)
    res.render('update-biodatas', { title: "Update Biodata", biodata });

}
const updateBiodatas = async(req, res) => {
    let { name, birth_date, email, ph_number, address } = req.body;

    const biodata = await Biodata.update({
        name,
        birth_date,
        email,
        ph_number,
        address
    }, {
        where: {
            id: req.params.id
        }
    });

    res.redirect('/biodatas')
}

const addBiodataPage = async(req, res) => {
    const user = await User.findOne({
        include: Biodata,
        where: {
            id: req.params.id
        }

    })

    console.log(user)
    res.render('create-biodatas', {
        title: "Create Biodata",
        user
    });

}


const addBiodataController = async(req, res) => {
    let { name, birth_date, email, ph_number, address } = req.body;

    const user = await User.findByPk(req.params.id);
    const biodata = await Biodata.create({
        name,
        birth_date,
        email,
        ph_number,
        address,
    });
    console.log(await biodata.setUser(user));
    res.status(201).redirect('/biodatas');
}


const logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

const errorController = (req, res) => {
    res.status(404).render('./error/404', {
        title: "Page not found"
    });
};

module.exports = {
    adminLoginPage,
    adminLoginController,
    mainDashboard,
    addUserPage,
    adminAddUserController,
    getAllUsers,
    deleteUserData,
    getAllBiodatas,
    deleteBiodataUser,
    // updateBiodataPage,
    updateBiodatas,
    addBiodataPage,
    addBiodataController,
    logoutUser,
    getAllGame,
    errorController,
    updateUserPage
}