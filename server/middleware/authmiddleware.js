import jwt from "jsonwebtoken";
import Users from "../modules/users.js";
// import SECRET from "../config.js";
const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("authorization token required");
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = await jwt.verify(token,process.env.SECRET); 

    req.user = await Users.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    res.status(404).json("unauthenticted");
    console.log(err);
  }
};
export default auth;
