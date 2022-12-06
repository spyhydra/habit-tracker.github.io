module.exports.home = function (req, res) {

    return res.render('login', {
        title: "Habit Tracker"
    });
}

// module.exports.actionName = function(req, res){}