const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('first_view')
});

module.exports = router;