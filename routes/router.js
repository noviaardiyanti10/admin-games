const express = require('express');
const router = express.Router();

const {
    checkLogin,
    isLogin
} = require('../middleware/checkLogin')

const {
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
} = require('../controllers/clientController');


const {
    adminLoginPage,
    adminLoginController,
    mainDashboard,
    addUserPage,
    adminAddUserController,
    getAllUsers,
    deleteUserData,
    getAllBiodatas,
    deleteBiodataUser,
    updateBiodatas,
    addBiodataPage,
    addBiodataController,
    logoutUser,
    getAllGame,
    errorController,
    updateUserPage
} = require('../controllers/adminController');

//CLIENT ROUTES
router.post('/api/v1/addUsers', addUserController);
router.delete('/api/v1/deleteUsers/:id', deleteUserController);
router.put('/api/v1/updateUsers/:id', updateUserController);
router.get('/api/v1/getAllUsers', readAllUserController);
router.get('/api/v1/getUser/:id', readUserIdController);

router.post('/api/v1/addGames', gamesAddController);
router.delete('/api/v1/delGames/:id', deleteGameController);
router.put('/api/v1/updateGames/:id', updateGameController);
router.get('/api/v1/getAllGames', readGamesController);
router.get('/api/v1/getGame/:id', readIdGamesController);
router.put('/api/v1/usersGame/', userGamesController);

router.post('/api/v1/addBiodatas/', addBiodatasController);
router.put('/api/v1/updateBiodatas/:id', updateBiodataController);
router.delete('/api/v1/deleteBiodatas/:id', deleteBiodatasController);
router.get('/api/v1/getAllBiodatas', readBiodatasController);
router.get('/api/v1/getBiodatas/:id', readIdBiodataController);


//ADMIN ROUTES
router.get('/', isLogin, adminLoginPage);
router.get('/logout', checkLogin, logoutUser);
router.post('/login', isLogin, adminLoginController);

router.get('/dashboard', checkLogin, mainDashboard);
router.get('/addUser', checkLogin, addUserPage);
router.post('/addUser', checkLogin, adminAddUserController);
router.get('/users', checkLogin, getAllUsers);
router.get('/users/:id/delete', deleteUserData);

router.get('/games', checkLogin, getAllGame);

router.get('/biodatas', checkLogin, getAllBiodatas);
router.get('/biodata/:id/delete', deleteBiodataUser);
// router.get('/biodata/:id/update', updateBiodataPage);
router.get('/biodata/:id/update', checkLogin, updateUserPage);
router.post('/biodatas/:id/update', checkLogin, updateBiodatas);
router.get('/addBiodatas/:id', checkLogin, addBiodataPage);
router.post('/addBiodatas/:id', checkLogin, addBiodataController);

router.use('*', errorController)


module.exports = router;