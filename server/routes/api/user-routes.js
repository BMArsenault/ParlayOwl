const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveBar,
  deleteBar,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveBar);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/businesses/:barId').delete(authMiddleware, deleteBar);

module.exports = router;