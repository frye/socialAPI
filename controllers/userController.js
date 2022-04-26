const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find({})
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.json({ message: 'User not found' })
          : res.json(user))
      .catch(err => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.json({ message: 'User not found' });
          console.log('User not found');
          return;
        }
        // Clean up friends arrays and remove this users id.
        console.log('User found, deleting...');
        User.updateMany(
          { friends: { $all: [ req.params.userId ] } },
          { $pull: { friends: req.params.userId } }
        )
          .then(() => {
            console.log('Friends updated');
            // Let's remove all the user's thoughts
            return Thought.deleteMany({ username: user.username })
              .then(() => {
                console.log('Thoughts deleted');
                res.json({ message: 'User deleted' });
              })
              .catch(err => res.status(500).json({ message: `Error clearing friends lists: ${err}` }));
          })
          .catch(err => res.status(500).json(err));
      })
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.json({ message: 'User not found' })
          : res.json(user))
      .catch(err => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true })
      .then((user) =>
        !user
          ? res.json({ message: 'User not found' })
          : res.json(user)
      )
      .catch(err => res.status(500).json(err));
  }
};