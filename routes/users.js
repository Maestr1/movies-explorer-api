const router = require('express').Router();
const { getUser, patchUser } = require('../controllers/users');
const { validatePatchUser } = require('../middlewares/validatons');

router.get('/me', getUser);
router.patch('/me', validatePatchUser, patchUser);

module.exports = router;
