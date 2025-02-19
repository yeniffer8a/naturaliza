import jwt from "jsonwebtoken";

export async function purchaseToken(req, res, next) {
  if (!req.rawHeaders.includes("Authorization")) {
    next();
  } else {
    const accessToken = req.header('Authorization').split(" ");
    const token = jwt.verify(accessToken[1],process.env.JWT_SECRET)
    req.userId = token.id.toString();
    next()
  }
}
