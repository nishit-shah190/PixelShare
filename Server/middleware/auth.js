import jwt from 'jsonwebtoken'

const auth = async(req,res,next) => {

    try {
        
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let DecodedData;
    
        if(token && isCustomAuth){
            DecodedData = jwt.verify(token, 'test');
            req.userId = DecodedData?.id;
    
        }
        else{
    
            DecodedData=jwt.decode(token)
            req.userId = DecodedData?.sub;
        }
        next()
    } catch (error) {
        console.log(error);
    }

}

export default auth