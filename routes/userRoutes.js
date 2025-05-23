const express = require('express');
const router = express.Router();
const { createUser, getUserById, getAllUsers, loginUser } = require('../controllers/userController');

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.get('/', getAllUsers);

module.exports = router;
