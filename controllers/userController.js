const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find({})
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },
  getSingleUser(req, res){
    User.findOne({_id: req.params.userId})
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  createUser(req, res){
    User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  updateUser(req, res){
    User.findOneAndUpdate(
      {_id: req.params.userId}, 
      { $set: req.body}, 
      {runValidators: true, new: true}
      )
      .then((user) =>
      !user 
        ? res.json({message: 'User not found'}) 
        : res.json(user))
      .catch(err => res.status(500).json(err));
  },
  deleteUser(req, res){
    User.findOneAndRemove({_id: req.params.userId})
      .then( (user) => {
        !user ? res.json({message: 'User not found'}) : res.json(user);
      }
    )
      .catch(err => res.status(500).json(err));
  },
  addThought(){

  },
  removeThought(){

  }
};