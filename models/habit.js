const mongoose=require('mongoose');
const User=require('./user')

const habitSchema=new mongoose.Schema({

    content:{
        type:String,
        required:true
    },
   
    dates: [{
        date: String,
        complete: String
    }],
    
    user:{
      
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'

    }

},{timestamps:true})


const Habit= mongoose.model('Habit',habitSchema);
module.exports=Habit;