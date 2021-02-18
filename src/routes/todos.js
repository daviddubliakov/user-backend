import { Router } from 'express';
import Todo from '../models/Todo';

const router = Router();

router.get('/', async (req, res) => {
  Todo.find({}, (err, users) => {
    res.send(users);
  });
})

router.post('/create', async (req, res) => {
  const newTodoObj = new Todo(req.body);
  newTodoObj.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newTodoObj);
  });
})

export default router;
