const Habit = require('../models/habit');



module.exports.create = function (req, res) {
  const {
    content
  } = req.body;
  const user = req.user._id;

  Habit.findOne({
    content: content,
    user: req.user._id
  }).then(habit => {

    // console.log('this is content ',content);
    // console.log('this is user',user);


    let dates = [],
      tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
    dates.push({
      date: localISOTime,
      complete: 'none'
    });
    const newHabit = new Habit({
      content,
      dates,
      user
    });

    //---------Save Habit----------//
    newHabit
      .save()
      .then(habit => {

        res.redirect('back');
      })
      .catch(err => console.log(err));

  })
}


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

//this function use for get a date and push in database

module.exports.dashboard = function (req, res) {

  Habit.find({
    email: req.query.user
  }, (err, habits) => {

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
      res.render('dashboard', {
        habits,
        user,
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



//this function use for updating status 

module.exports.update = (req, res) => {
  var d = req.query.date;

  var id = req.query.id;


  Habit.findById(id, (err, habit) => {
    if (err) {
      console.log(err);
    } else {



      let dates = habit.dates;
      let found = false;
      dates.find(function (item, index) {
        if (item.date === d) {
          if (item.complete === 'yes') {

            item.complete = 'no';
          } else if (item.complete === 'no') {
            item.complete = 'none'
          } else if (item.complete === 'none') {
            item.complete = 'yes'
          }
          found = true;
        }
      })
      if (!found) {
        dates.push({
          date: d,
          complete: 'yes'
        })
      }
      habit.dates = dates;
      habit.save()
        .then(habit => {
          res.redirect('back')
        })
        .catch(err => console.log(err));
    }
  })


}

module.exports.updatecal = (req, res) => {
  var d = req.query.date;

  var id = req.query.id;
  console.log('enter one');

  Habit.findById(id, (err, habit) => {
    if (err) {
      console.log(err);
    } else {
      console.log('enter two');


      let dates = habit.dates;
      let found = false;
      dates.find(function (item, index) {
        if (item.date === d) {
          if (item.complete === 'yes') {

            item.complete = 'no';
          } else if (item.complete === 'no') {
            item.complete = 'none'
          } else if (item.complete === 'none') {
            item.complete = 'yes'
          }
          found = true;
        }
      })
      if (!found) {
        dates.push({
          date: d,
          complete: 'yes'
        })
      }
      habit.dates = dates;
      habit.save()
        .then(habit => {
          res.redirect('back')
        })
        .catch(err => console.log(err));
    }
  })


}