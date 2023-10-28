import jwt from "jsonwebtoken";

let sign = () => {
  let fName = "hanzala";
  let age = 21;
  let payload = { fName, age };
  let privKey = "ALI";

//   jwt.sign(payload,key,expiresIn)

  let signToken = jwt.sign(payload, privKey, { expiresIn: "1m" });
  console.log(signToken);
};
sign();
