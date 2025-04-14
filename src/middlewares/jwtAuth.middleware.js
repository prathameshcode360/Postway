import jwt from "jsonwebtoken";

export default function jwtAuth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ msg: "Unauthorized User" });
  }
  try {
    const payload = jwt.verify(token, "Vm+39ofliO?OoQJ");
    // console.log("PayLoad:", payload);
    req.user = payload;
  } catch (error) {
    console.log("Error in JWT", error);
    return res.status(401).send({ msg: "Invalid Token" });
  }
  next();
}
