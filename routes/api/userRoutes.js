const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addThought,
  removeThought
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:id/thoughts
router.route('/:userId/thoughts').post(addThought);

// /api/users/:id/thoughts/:thoughtId
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

module.exports = router;
