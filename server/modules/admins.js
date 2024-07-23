import mongoose from "mongoose";

const Cschema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, },

  password: { type: String, required: true, },
});

const modle = mongoose.model("admins", Cschema);
export default modle;
