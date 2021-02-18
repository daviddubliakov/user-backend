import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: String,
  age: Number,
  lastName: String,
  avatar: String,
});

export default model('Todo', userSchema);
