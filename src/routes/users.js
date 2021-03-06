import { Router } from 'express';
import User from '../models/User';
import { oneOf, check, body, validationResult } from 'express-validator';

const router = Router();

router.get('/', async (req, res) => {
  User.find({}, (err, users) => {
    res.send(users);
  });
})

router.post(
  '/create',
  body('firstName').notEmpty().isAlpha(),
  body('lastName').notEmpty().isAlpha(),
  body('age').notEmpty().isNumeric(),
  oneOf([
    check('avatar').isEmpty(),
    check('avatar').isURL(),
  ]),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newUserObj = new User(req.body);

    newUserObj.save(err => {
      if (err) return res.status(500).send(err);
      return res.status(200).send({ message: 'User successfully created!' });
    });
  })


router.delete('/delete', (req, res) => {
  User.deleteOne(
    { _id: req.body._id }
  ).then(() => res.status(200).send({ message: 'User is successfully deleted!' }));
})

router.get('/user/:_id', (req, res) => {
  User.findOne({ _id: req.params._id }, (err, user) => {
    res.send(user);
  });
})

router.put('/user/:_id',
  body('firstName').notEmpty().isAlpha(),
  body('lastName').notEmpty().isAlpha(),
  body('age').notEmpty().isNumeric(),
  oneOf([
    check('avatar').isEmpty(),
    check('avatar').isURL(),
  ]),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.findOneAndUpdate({
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
