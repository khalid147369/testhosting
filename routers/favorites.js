import express from "express";
import fav from "../modules/fav.js";
import rauth from "../middleware/authmiddleware.js";
import multer from "multer";
import path from "path";
const router = express.Router();
// const auth = (())=>{

// }
router.use(rauth);


router.post("/favorites",  async (req, res) => {
    try{
       const user_id = req.user._id;
        const {name}= req.body;

        const tit = await fav.findOne({ title: name ,user_id });

        if (tit) {
          return res.status(401).json({message :" card alredy exist"})
        }
  const newcard = new fav({
  
    title: req.body.name,
    user_id, 
    imgname: req.body.image,
    audsrc: req.body.audio,
  });

  await newcard.save();
  res.status(200).json({message :"song safed successfuly"})
  
    }catch(err){
      res.status(401).json({message :" ops somthing wrong !!"})
   console.log(err)
    }
 
});

router.get("/chousedfav", async (req, res) => {
  try {
    const userid = req.user._id;
    const chousedcard = await fav.find({ user_id: userid  });
    res.json(chousedcard);
    // if (chousedcard.title) {
    //     return res.status(401).json({ error: "song alredy safed" });
        
    // }
  } catch (err) {
    res.status(401).send("not ok");
    console.log(err);
  } 
});
router.delete("/deletecard/:id",async(req, res )=>{
const {id} = req.params
try{
await fav.findByIdAndDelete(id)
res.status(200).json({message :"song has been deleted"})
}catch(err){
  console.log(err)
  res.status(401).json({message :"song does not deleted"})
} 


})
router.get("/api/itemsfav/:id",async(req,res)=>{
  try{
const {id} = req.params
 const card = await fav.findById(id)
  res.status(200).json(card)
  }catch(err){
console.log(err)
res.status(401).json({message: "data dosnt send"})
  }
 
})
export default router;
