const express = require('express');
const router = express.Router();
const {uploadMiddleware} = require('../utils/handleStorage');
const {createFile, getFiles, getFile, deleteFile} = require('../controllers/storage')
const {validatorGetFile} = require('../validators/storage');

//en el single myfile se jala el nombre del campo que se uso en el postman myfile es un nombre de ejemplo
router.post('/', uploadMiddleware.single("myfile"), createFile)
router.get('/', getFiles);
router.get('/:id', validatorGetFile,getFile );
router.delete('/:id', validatorGetFile, deleteFile);





module.exports = router
