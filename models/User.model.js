const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    
  username: {
    type: String,
    unique: true
  },
  password: {
      type: String
  },
  role: {
    type: String,
    enum: ['GUEST', 'ADMIN'],
    default: 'GUEST'
  },
}, 
{
  timestamps: true
})

const User = model("User", userSchema);

module.exports = User;