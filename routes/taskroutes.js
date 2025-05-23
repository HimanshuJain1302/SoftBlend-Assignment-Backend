const express = require('express');
const router = express.Router();
const {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

router.post('/', createTask);
router.get('/:id', getTaskById);
router.get('/', getAllTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
