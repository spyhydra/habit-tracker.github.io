const User = require('../models/user');
const passport = require('passport')
const passportlocal = require('passport-local')
const Habit = require('../models/habit')
// const comments=require('../models/comment')


module.exports.profile = async function (req, res) {

    let user = await User.findById(req.user)


    Habit.find({}).populate('user').exec(function (err, habits, date) {

        return res.render('_habit.ejs', {
            chetan: "habit",

            user: user,
            habits: habits
        })
    })

}

// }
// render the sign up page
module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/userhabit')
    }

    return res.render('signup', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/userhabit')
    }
    return res.render('login')
}


//creating a user
module.exports.createing = async function (req, res) {

    const {
        name,
        email,
        password
    } = req.body;



    try {
        let user = await User.findOne({
            email
        });
        if (!user) {
            user = await User.create({
                name,
                email,
                password
            });
            res.setHeader('Content-Type', 'application/json');
            return res.redirect('/users/login');
        }


        return res.redirect('/users/login')
    } catch (error) {
        console.log('error  signup', error);
    }

}
//creating passport session

module.exports.createSession = function (req, res) {
    return res.redirect('/users/userhabit');

}
//creating logout function 

module.exports.destroySession = function (req, res) {
    req.logout();
    return res.redirect('/')
}



module.exports.practice = function (req, res) {

    Habit.find({
        email: req.params.user

    }, (err, habits) => {
        console.log('this for email', habits);

        console.log('this is habits code 1', habits);

        if (err) console.log(err);
        else {
            var days = [];
            days.push(getD(0)); //this 0 is n in function
            days.push(getD(1));
            days.push(getD(2));
            days.push(getD(3));
            days.push(getD(4));
            days.push(getD(5));
            days.push(getD(6));
            console.log(days);
            res.render('userhabit', {
                habits,
                days
            });
        }
    });

}



//function for date push

function getD(n) {
    let d = new Date();


    d.setDate(d.getDate() + n);

    var newDate = d.toLocaleDateString('pt-br').split('/').reverse().join('-');


    console.log('get day', d.getDay());
    var day;
    switch (d.getDay()) {
        case 0:
            day = 'Sun';
            break;
        case 1:
            day = 'Mon';
            break;
        case 2:
            day = 'Tue';
            break;
        case 3:
            day = 'Wed';
            break;
        case 4:
            day = 'Thu';
            break;
        case 5:
            day = 'Fri';
            break;
        case 6:
            day = 'Sat';
            break;
    }
    return {
        date: newDate,
        day
    };
}

//delete habit controller

module.exports.destroy = function (req, res) {
    Habit.findById(req.params.id, function (err, habit) {
        // if (habit.user == req.user.id) {


        habit.remove()
        console.log('habit remove');

        // } else {
        return res.redirect('back')
        // }

    })
}