const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/tasks', authMiddleware, taskRoutes);

module.exports = app;
