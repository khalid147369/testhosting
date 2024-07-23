import mongoose from "mongoose";

const Cschema = new mongoose.Schema({
  // nalo:{type : String}
  imgname: { type: String },

  user_id: { type: String },
  title: { type: String },

  audsrc: { type: String },
});

const modl = mongoose.model("favorites", Cschema);
export default modl;
