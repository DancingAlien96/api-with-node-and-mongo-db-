const express = require('express');
const router = express.Router();
const {registerUser, getUsers, getOneUser, deleteUser, updateUser,loginUser, addFavorites, getFavorites} = require('../controllers/users');
const {validatorFieldsUser, validatorGetUser, validatorLoginUser} = require('../validators/Users');
const {authMiddleWare} = require('../middleware/session');
const {uploadMiddleware} = require('../utils/handleStorage');
const {resizeImage}  = require('../middleware/sharp');


router.post('/register', uploadMiddleware.single('myfile'),resizeImage ,validatorFieldsUser,  registerUser);
router.post('/login', validatorLoginUser, loginUser);
router.post('/favorites/:id', addFavorites );
router.get('/favorites/:id', getFavorites);
router.get("/", getUsers);
router.get("/:id", getOneUser);

module.exports = router
