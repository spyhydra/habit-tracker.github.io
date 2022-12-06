const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost/habit_tracker');

const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error in binding'));
db.once('open',function(){
    console.log('sucessfully connected to Database')
})