import mongoose from "mongoose";

const Cschema = new mongoose.Schema({
  googleId: String,
  displayName :String,
  email:String,
  image:String,

});

const modle = mongoose.model("googleusers", Cschema);
export default modle;