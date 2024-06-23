const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const router = express.Router();


const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};


router.use(authMiddleware);


router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req.user;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
});


router.get('/', async (req, res) => {
  const { userId } = req.user;
  try {
    const tasks = await prisma.task.findMany({ where: { userId } });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching tasks' });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const task = await prisma.task.findFirst({ where: { id: Number(id), userId } });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error fetching task' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const { userId } = req.user;
  try {
    const task = await prisma.task.updateMany({
      where: { id: Number(id), userId },
      data: { title, description, status },
    });
    if (task.count > 0) {
      res.json({ message: 'Task updated successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error updating task' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const task = await prisma.task.deleteMany({ where: { id: Number(id), userId } });
    if (task.count > 0) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error deleting task' });
  }
});

module.exports = router;