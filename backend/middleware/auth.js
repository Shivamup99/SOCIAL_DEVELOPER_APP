import jwt from 'jsonwebtoken'

const auth =(req,res,next)=>{
       const authHeader = req.headers.token
        if(authHeader){
            const token = authHeader.split(" ")[1];
            jwt.verify(token , process.env.ACCESS_TOKEN_SECRETS , (err,user)=>{
                if(err) return res.status(403).json({message:'token is not valid'});
                req.user=user;
                next();
            })
        } else{
            return res.status(401).json({message:'you are not authenticated'})
        }
    }

export default auth