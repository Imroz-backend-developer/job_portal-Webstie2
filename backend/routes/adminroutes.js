const express = require('express');
const { getAdminStats } = require('../controller/adminController');
const { isAuthenticate, isadmin } = require('../middelware/auth');

const router = express.Router();

// Route to get admin stats, protected by authentication and admin check
router.get('/admin/stats', isAuthenticate, isadmin, getAdminStats);

module.exports = router;
