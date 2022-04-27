const { Thought, User } = require("../models")

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then(thoughts => res.json(thoughts))
      .catch(err => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then(thought => res.json(thought))
      .catch(err => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        !user
          ? res.json({ message: "User not found" })
          : res.json(user);
      })
      .catch(err => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.json({ message: "Thought not found" })
          : res.json(thought)
      )
      .catch(err => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then(
        (thought) => {
          return User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: thought._id } },
            { new: true }
          )
        }
      )
      .then((user) =>
        !user
          ? res.json({ message: "User not found" })
          : res.json(user)
      )
      .catch(err => res.status(500).json(err));
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => {
        !thought
          ? res.json({ message: "Thought not found" })
          : res.json(thought);
      })
      .catch(err => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        !thought
          ? res.json({ message: "Thought not found" })
          : res.json(thought);
      })
      .catch(err => res.status(500).json(err));
  }
}