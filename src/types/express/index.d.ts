import { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            user ?: JwtPayload;  //; kno use holo
        }
    }
}