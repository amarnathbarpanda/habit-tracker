const express = require('express');
const { home, habit, createHabit, updateHabitStatus, deleteHabit } = require('../controller/habit_controller');
const router = express.Router();

console.log('Router loaded');

router.get('/home', home);
router.get('/details', habit);
router.post('/createHabit', createHabit);
router.get('/updateStatus', updateHabitStatus);
router.get('/delete', deleteHabit);



module.exports = router;