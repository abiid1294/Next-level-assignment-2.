import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string []) => {         // auth cannot be a async function. why?
return (req: Request, res: Response, next: NextFunction) => {
          const token = req.headers.authorization;
          if(!token)
            return res.status(404).json({success: false, message: "unauthorized"});

          const decoded = jwt.verify(token , config.secret as string) as JwtPayload;   
          console.log(decoded);
          req.user = decoded as JwtPayload; // very important line

          if(roles.length && !roles.includes(decoded.role))
            return res.status(404).json({success: false, message: "Unauthorized"});

          next();

     }
}

export default auth;