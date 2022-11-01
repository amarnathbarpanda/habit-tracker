const User = require("../model/User");
const Habit = require("../model/Habit");
const moment = require('moment');

module.exports.home = async (req, res) => {
    // getting the user id from the cookies, if user id is present in the cookies then show home page
    if (req.cookies.user_id) {
        try {
            const user = await User.findById(req.cookies.user_id)
            .populate('habits');

            return res.render('home', {
                title: 'Home Page',
                user: user,
            })
        } catch (error) {
            console.log(error)
        }
    }
    // if the user id is not there then redirect user to the sign in page 
    else {
        return res.render('signin', {
            title: 'SignIn Page'
        });
    }

}

module.exports.habit = async (req, res) => {
    // if user id is present in the cookies then show the details, otherwise redirect user to signin
    if (req.cookies.user_id) {
        try {
            // creating a days array to show actual date in the details page
            const days = [
                moment().subtract(0, 'days').format("MMM Do"),
                moment().subtract(1, 'days').format("MMM Do"),
                moment().subtract(2, 'days').format("MMM Do"),
                moment().subtract(3, 'days').format("MMM Do"),
                moment().subtract(4, 'days').format("MMM Do"),
                moment().subtract(5, 'days').format("MMM Do"),
                moment().subtract(6, 'days').format("MMM Do")
            ];
            // creating a weekdays array to show actual week days in the details page

            const weekdays = [
                moment().subtract(0, 'days').format('llll').split(',')[0],
                moment().subtract(1, 'days').format('llll').split(',')[0],
                moment().subtract(2, 'days').format('llll').split(',')[0],
                moment().subtract(3, 'days').format('llll').split(',')[0],
                moment().subtract(4, 'days').format('llll').split(',')[0],
                moment().subtract(5, 'days').format('llll').split(',')[0],
                moment().subtract(6, 'days').format('llll').split(',')[0]
            ]

            // getting the user from the db by user_id
            const user = await User.findById(req.cookies.user_id)
            .populate('habits');
            const habits = user.habits;
             
            // console.log(habits);
            return res.render('details', {
                title: "Details",
                user: user,
                data: {
                    days: days,
                    habits: habits,
                    weekdays: weekdays
                },
            }) 
        }
        catch (err) {
            console.log(err);
        }
    } else {
        return res.render('signin', {
            title: 'SignIn Page'
        });
    }
}

// creating a habit
module.exports.createHabit = async (req, res) => {
    try {
        // 
        const habit = await Habit.create({
            name: req.body.name,
            dates: [
                {
                    status: "none"
                },
                {
                    status: "none"
                },
                {
                    status: "none"
                },
                {
                    status: "none"
                },
                {
                    status: "none"
                },
                {
                    status: "none"
                },
                {
                    status: "none"
                },
            ], 
            user: req.cookies.user_id
        });

        if(!habit) return res.status(400).json({message: "habit creation failed"});
        if(habit){
            const user = await User.findById(req.cookies.user_id);
            user.habits.push(habit);
            user.save();
        }
        return res.redirect('back');
        // return res.status(200).json({message: "habit created successfully!", habit: habit});
    } catch (error) {
        console.log(error);
    }
}

// update today's habits status 
module.exports.updateHabitStatus = async (req, res) =>{
    // getting habit id and day on which the habit status to be updated
    const habit_id = req.query.id; 
    const day = req.query.day;
    

    try {
        // getting a habit by id
        const new_habit = await Habit.findById(habit_id);

        // iterating through the dates of a habit and where date 
        //passed as query is qual to day of a habit then update the status
        
        for(let date in new_habit.dates){
            if(date === day){
                if (new_habit.dates[day].status === 'done') {
                    new_habit.dates[day].status = 'not-done';
                    new_habit.progress--;
                } else if (new_habit.dates[day].status === 'not-done') {
                    new_habit.dates[day].status = 'none';
                } else {
                    new_habit.progress++;
                    new_habit.dates[day].status = 'done';
                }
            }
        }
        
        // updating the newly updated habit

        const habit = await Habit.findByIdAndUpdate(habit_id, new_habit);
    
        if(!habit) return res.status(400).json({message: "Status updation failed"});

        return res.redirect('back');
        
    } catch (error) {
        console.log(error);
    }
    
}

// delete a habit
module.exports.deleteHabit = async (req, res) =>{
    // getting habit_id as query
    const habit_id = req.query.id;

    try {
        // delete a habit by id
        const deletedHabit = await Habit.findByIdAndDelete(habit_id);

        if(!deletedHabit) return res.status(400).json({message: "Error in deleting the habit"});

        return res.redirect('back');
    } catch (error) {
        console.log(error)
    }
}