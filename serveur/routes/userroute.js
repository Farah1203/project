const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');

router.post('/', usercontroller.createuser);
router.get('/', usercontroller.obtenerUser);
router.put('/:id', usercontroller.updateUser);
router.get('/:id', usercontroller.getuser);
router.delete('/:id', usercontroller.deleteuser);

module.exports = router;