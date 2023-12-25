const router = require('express').Router();

const supportsRouter = require('./supports');

router.get('/test-email', (req, res) => {
  console.log(req);
  console.log(res);
  res.send('Check email route');
});

router.use('/supports', supportsRouter);

module.exports = router;
