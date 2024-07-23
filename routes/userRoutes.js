const express = require('express');
const router = express.Router();
const User = require("./../models/user");
const {jwtAuthMiddleware,genrateToken} = require("./../jwt")

router.post('/signup', async (req, res) => {
    try {
      const data = req.body;
      const newUser = new User(data);
      const response = await newUser.save();
      console.log('data saved');


      const payload ={
        id: response.id,
      }

      //getting the token that need to be send after signup
      const token = genrateToken(payload);

      // sending the token with response
      res.status(200).json({ response: response , token: token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error', message: err });
    }
  });



router.post('/login',async(req,res)=>{
    try{
      const {aadharCardNumber,password} = req.body;
      const user = await User.findOne({aadharCardNumber:aadharCardNumber})
  
      const isPasswordMatch =await user.comparePassword(password);
      if(!user || !isPasswordMatch){
        return res.status(401).json({error:'Invalid username or password'})
      }
  
      //genrate token
      const payload = {
        id : user.id,
      }
      const token = genrateToken(payload)
  
      res.status(200).json({token:token})
    }
    catch(err){
      console.log(err)
      res.status(401).json({error:'Internal Server Error'})
    }
  })

// Get the user Profile data
router.get('/Person', jwtAuthMiddleware, async(req,res)=>{
    try{
        console.log(req.user)
        const userId = req.user.id;
        
        const user = await ser.findById(userId)
        res.status(200).json({user})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
})


//get all user
router.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
    
      const records = await User.find();
      res.status(200).json({ response: records });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error', message: err });
    }
});

router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
    
      const userId = req.user
      const {currentPassword, newPassword} = req.body;
      const user = await User.findById(userId);

    if(!user || !(await user.comparePassword(currentPassword))){
        return res.status(401).json({error:'Invalid username or password'})
    }
    user.password = newPassword
    await user.save()

      console.log('password updated')

      res.status(200).json({message:"Password Updated"})
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error', message: err });
    }
});



module.exports = router;