const router = require('express').Router();
const { sendMessages } = require('../controllers/supports');
const { validateMessage } = require('../middlewares/validation');

router.post('/', validateMessage, sendMessages);

module.exports = router;
