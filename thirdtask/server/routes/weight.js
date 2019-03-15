const router = require('express').Router();
const weightController = require('../controllers/weightController.js');

router.get('/', weightController.getAllWeightItems);
router.get('/:weightId', weightController.getOneWeightItem);
router.post('/', weightController.createNewWeightItem);
router.patch('/:weightId', weightController.updateWeightItem);
router.delete('/:weightId', weightController.deleteOneWeightItem);

module.exports = router;