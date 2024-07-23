import mongoose from "mongoose";

const Cschema = new mongoose.Schema({
  title:{type : String , unique :true , required :true},
  imgname:{type : String , unique :true ,required :true},
  checked:{type :String },
 audsrc:{type : String ,unique :true,required :true},
})

const modl = mongoose.model("cards", Cschema)
export default modl
// module.exports = modl
