var express=require('express');
var router=express.Router();

const product_controller=require('../controllers/product.controller');

router.get('/test', product_controller.test);
router.post('/Create',product_controller.product_create);
router.get('/:id',product_controller.product_view);
router.get('/',product_controller.product_list);
router.put('/:id/Update',product_controller.product_update);
router.delete('/:id/delete', product_controller.product_delete);
module.exports=router;