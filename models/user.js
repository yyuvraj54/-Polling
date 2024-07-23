const mongoose  = require("mongoose")

// For hashing the password (to avoid storing password in text format)
const bcrypt  = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    role:{
        type:String,
        enum:['admin','voter'],
        default:'voter'
    },
    mobile:{
        type:String,
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
    isVoted:{
        type:Boolean,
        default:false
    }

});

// ye pahele run hoga then schema
userSchema.pre('save',async function(next){
    const person = this;
    // Hash the pasword only if it as been modified (or is new)
    if(!person.isModified('password')) return next();
    try{
        // genrate some salt
        const salt = await bcrypt.genSalt(10); // salt add kiya h passwod mai (jitna jda number utha achha hash but take time as big number)
        
        // hash the password
        const hashedPassword  = await bcrypt.hash(person.password,salt);

        //Overrride the plain text password with hashed one
        person.password = hashedPassword

        next();     
    }catch(err){
        return next(err);

    }
    
})
userSchema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;