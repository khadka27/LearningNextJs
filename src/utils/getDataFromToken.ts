
// import jwt from "jsonwebtoken";
// import { NextRequest } from "next/server";

// export const getDataFromToken = (request:NextRequest) => {
//   try {
//     const token = request.cookies.get("token")?.value || "";
//     const deCode:any = jwt.verify(token, process.env.TOKEN_SECRET!);
//     return deCode.userId;
//   } catch (error:any) {
//     throw new Error(error.message);

//   }
// };


import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

export const getDataFromToken=(request:NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value||"";
        const decodedToken:any =Jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id
        
    } catch (error:any ) {
        throw new Error(error.message)
        
    }

}