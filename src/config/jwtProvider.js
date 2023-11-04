const jwt=require("jsonwebtoken")

const SECRET_KEY="FDSADGTGFGBCBGJJGHJUYDGFFGDGDGFSDGHGHFDFGGGGFHFHFHF"

const generateToken=(userId)=>{
    
    const token=jwt.sign({userId},SECRET_KEY,{expiresIn:"48h"})
    // console.log(userId);
    return token;
}


const getUserIdFromToken=(token)=>{
    const decodedToken=jwt.verify(token,SECRET_KEY)
    console.log(token);
    console.log(SECRET_KEY);
    console.log(decodedToken);
    return decodedToken.userId;
}

module.exports={generateToken,getUserIdFromToken};