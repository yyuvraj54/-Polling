const express = require('express');
const router = express.Router();
const Candidates = require("./../models/candidates");
const User = require("./../models/user");
const {jwtAuthMiddleware,genrateToken} = require("./../jwt")


const checkAdminRole = async(userId) =>{
    try{
        const user = await User.findById(userId)
        if(user.role === 'admin'){
            return true
        }
        
    }
    catch(err){
        return false
    }
}


router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
    if(! await checkAdminRole(req.user.id)){
        return res.status(403).json({message:'user has not admin role'});
    }
      const data = req.body;
      const newCandidate = new Candidates(data);


      const response = await newCandidate.save();
      console.log('data saved');

      // sending the token with response
      res.status(200).json({ response: response  });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error', message: err });
    }
});


router.put('/:candidateID', async (req, res) => {
    try {

        if(!checkAdminRole(req.user.id)){
            return res.status(403).json({message:"user has not admin role "})
        }
    
      const candidateID = req.params.candidateID
      const updateCandidateID = req.body
      const response = await Candidates.findByIdAndUpdate(candidateID,updateCandidateID,{
        name:true,
        runValidators:true
      })

      if(!response){
        return res.status(403).json({error:"Candidate not found"})
      }
      
      res.status(200).json({message:"Candidate data Updated"})
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error', message: err });
    }
});

router.delete('/:candidateID', async (req, res) => {
    try {

        if(!checkAdminRole(req.user.id)){
            return res.status(403).json({message:"user has not admin role "})
        }
    
      const candidateID = req.params.candidateID
      const response = await Candidates.findByIdAndDelete(candidateID,{
        name:true,
        runValidators:true
      })

      if(!response){
        return res.status(403).json({error:"Candidate not found"})
      }
      
      res.status(200).json({message:"Candidate Deleted"})
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error', message: err });
    }
});


router.post('/vote/:candidateID', jwtAuthMiddleware ,async(req,res)=>{
    try{
        const candidateId = req.params.candidateID
        const userId = req.user.id

        const candidate = await Candidates.findById(candidateId)
        if(!candidate){
            return res.status(403).json({error:"Candidate not found"})
        }
        const  user = await User.findById(userId)
        if(!user){
            return res.status(403).json({error:"user not found"})
        }

        if(user.isVoted){
            return res.status(403).json({error:"You have already voted"})
        }
        if(user.role === 'admin'){
            return res.status(403).json({error:"Admin not allowed to vote"})
        }
        // update candidate data
        candidate.votes.push({user:userId})
        candidate.voteCount++
        await candidate.save()

        //update user document
        user.isVoted = true
        await user.save()
        res.status(200).json({message:"Vote Recorded Sucessfully"})

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error', message: err });  
    }
})

//get all user
router.get('/vote/count', async (req, res) => {
    try {

      const candidate = await Candidates.find().sort({voteCount:'desc'});
    
      //Mapping the candidate to only return their name and voteCount
         const voteRecord = candidate.map((data)=>{
            return {
                party:data.party,
                count:data.voteCount
            }
         });

      res.status(200).json({ response: voteRecord });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error', message: err });
    }
});


//get all user
router.get('/candidate', async (req, res) => {
    try {

      const records = await Candidates.find();
      const candidateInfo = records.map((data)=>{
        return {
            party:data.party,
            name:data.name
        }
     });

      res.status(200).json({ response: candidateInfo });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error', message: err });
    }
});
module.exports = router;