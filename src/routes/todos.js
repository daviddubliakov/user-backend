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
    return res.status(200).send({ message: 'User successfully created!' });
  });
})


router.delete('/delete', (req, res) => {
  Todo.deleteOne(
    { _id: req.body._id }
  ).then(() => res.status(200).send({ message: 'User is successfully deleted!' }));
})

router.get('/user/:_id', (req, res) => {
  Todo.findOne({ _id: req.params._id }, (err, user) => {
    res.send(user);
  });
})

router.put('/user/:_id', (req, res) => {
  Todo.findOneAndUpdate({
    _id: req.body._id
  },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      avatar: req.body.avatar,
    })
    .then(() => {
      res.status(200).send({ message: 'User is successfully updated!' });
    })
    .catch(error => console.error(error))
})

export default router;
