const router = require('express').Router();
const { SUPPORT_EMAIL } = require('../utils/config');
const supportsRouter = require('./supports');

router.get('/test-email', (req, res) => {
  console.log(req);
  console.log(res);
  console.log(SUPPORT_EMAIL);
  res.send('Check email route');
});

router.use('/supports', supportsRouter);

module.exports = router;
