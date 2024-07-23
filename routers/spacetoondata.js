import express from "express";

import multer from "multer";
import path from "path";
import carddata from "../modules/spctoondata.js";

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb ,) {
      const ext = path.extname(file.originalname);
      let folder = "";
      if (ext === ".jpg" || ext === ".png") {
        folder = "imgs";
      } else if (ext === ".MP3" || ext === ".mp4") {
        folder = "audio";
      }
      cb(null, `./public/${folder}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  
  const multipleupload = upload.fields([{ name: "image" }, { name: "audio" }]);
  router.get("/", (req, res) => {
    const card = carddata.find().then((data) => res.json(data));

  });
  router.post("/creatcard", multipleupload, async (req, res) => {
        try{ 
       
        const {title ,program} = req.body;
        const image =req.files.image[0].originalname  ;
        const audio =req.files.audio[0].originalname ;
  if (!title || !program ) {
        return res.status(401).json({ error: "all fealds must be filled" });

      } 
     const tit = await carddata.findOne({title})
     if (tit ) {
      return res.status(401).json({ error: "card alredy exist" });

    } 
    const img = await carddata.findOne({imgname :image })
    if (img ) {
     return res.status(401).json({ error: "card alredy exist" });

   } 
   const aud = await carddata.findOne({audsrc :audio})
   if (aud ) {
    return res.status(401).json({ error: "card alredy exist" });

  } 
  const newcard = new carddata({
      title: title,
      checked: program,
      imgname:image ,
      audsrc:audio ,
    }); 
  
    await newcard.save();
    res.status(200).json(newcard);
    }catch(err){
      console.log(err)
      res.status(401).send("data doesnt send") 
    }
    
  });
  
  router.get("/spacetoon", async (req, res) => {
    await carddata.find({ checked: "spacetoon" }).then((da) => {
      res.json(da);
    });
  });
  router.get("/spacepower", async (req, res) => {
    await carddata.find({ checked: "spacepower" }).then((da) => {
      res.json(da);
    });
  });
  router.delete("/dleteitem/:id",async(req,res)=>{
    try{
const {id} = req.params
    await carddata.findByIdAndDelete(id)
    res.status(200).json({message :"card deleted successfuly"})
  }catch(err){
 console.log(err)
 res.status(401).json({message :"card does not delete "})

    }
   
  })
  router.get("/api/items/:id",async(req,res)=>{
    try{
const {id} = req.params
   const card = await carddata.findById(id)
    res.status(200).json(card)
    }catch(err){
 console.log(err)
 res.status(401).json({message: "data dosnt send"})
    }
   
  })
export default router;