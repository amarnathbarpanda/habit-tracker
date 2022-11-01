const User = require("../model/User");
const bcrypt = require('bcrypt');

// show sign up page
module.exports.signUpPage = (req, res) =>
    res.render('signup', {
        title: 'SignUp Page'
    });

// show sign in page
module.exports.signInPage = (req, res) =>
    res.render('signin', {
        title: 'SignIn Page'
    });

// signing in a user(storing user info on db and setting user id in cookies)
module.exports.signIn = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.redirect('/signin');
        }

        const isPasswordMatching = bcrypt.compare(req.body.password, user.password);

        if(!isPasswordMatching){
            return res.status(400).json({message: 'Invalid password'});
        }
        res.cookie('user_id', user._id);
        return res.redirect('/home');

    } catch (err) {
        return res.status(500).json({ error: err, message: "Internal Server Error!!" });
    }
}

// signing up a user
module.exports.signUp = async (req, res) => {

    try{
        // checking whether the user already exists 
        const user = await User.findOne({email: req.body.email});
        
        
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }

        // if user does't exist then create user
        // console.log(req.body)
        


        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            habits: []
        });
        
        if(!newUser){
            return res.status(400).json({ message: 'Error in User creation!' });
        }

        
        return res.redirect('/signin');

    }catch(err){
        return res.status(500).json({ error: err, message: 'Internal server error!' });
    }

}
// logging out a user( remove user_id from cookies)
module.exports.logOut = (req, res) =>{
     res.clearCookie("user_id");
     return res.redirect('/signin');
}