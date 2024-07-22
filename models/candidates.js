const mongoose  = require("mongoose")
const candodateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    party:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    address:{
        type:String,
    },
    aadharCardNumber:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    votes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
            votedAt:{
                type:Date,
                default:Data.now()
            }
        }
    ],
    voteCount:{
        type:Number,
        default: 0
      }
    
});


const Candodate = mongoose.model('Candodate', candodateSchema);
module.exports = Candodate;