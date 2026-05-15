const jwt = require("jsonwebtoken");
const config = require("config");
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = async function (req:{header:any, user:any}, res: { status: (arg0: number, ) => { (): any; new(): any; json: { (arg0: { user?: any; msg: string;  }): void; new(): any; }; }; }, next: () => void) {
  // Get token from header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }

  // Verify token
  try {
    await jwt.verify(token, JWT_SECRET, (error: any, decoded: { user: any; }) => {

      if (error) {
        res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user; // decoded.user  equals user's id
        next();
      }
    });
  } catch (err) {
    console.error("Middleware error");
    res.status(500).json({ msg: "Server Error" });
  }
};