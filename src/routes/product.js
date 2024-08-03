const express = require('express');
const router = express.Router();
const{uploadMiddleware} = require('../utils/handleStorage');
const { createProduct, getProducts, getOneProduct } = require('../controllers/product');
const {validatorFieldsProduct} = require('../validators/product');
const {resizeImage} = require('../middleware/sharp');

router.post('/',uploadMiddleware.single("myfile"),resizeImage ,validatorFieldsProduct ,createProduct);
router.get('/', getProducts);
router.get('/:id', getOneProduct );
module.exports = router;