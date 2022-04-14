const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const bcrypt = require('bcrypt');

dotenv.config();

const refreshTokenList = {}

const userLogin = async (req, res, next) => {
   const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if(user) {
        const validPassword = await bcrypt.compare(req.body.password, user.hashedPassword);
        if (validPassword) {
            const token = createAccessToken(user._id, user.email, user.isAdmin);
            req.token = token;
            const refreshToken = createRefreshToken(user._id, user.email, user.isAdmin);
            req.refreshToken = refreshToken;
            req.content = {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            }

            refreshTokenList[refreshToken] = {
                status: 'loggedIn',
                token: token,
                refreshToken: refreshToken
            }
            return next();
        } else {
            res.status(400).json({error:' Invalid Username or Password'});
            return;
        }
    } else {
        res.status(400).json({error:' Invalid username or password'});
        return;
    }
}


function createAccessToken(userId, email, level) {
    return jwt.sign(
      {id: userId, email: email, isAdmin: level },
      process.env.SECRET_TOKEN,
      {
        expiresIn: '4440m',
      }
    );
  }
  
  function createRefreshToken(userId, email, level) {
    return jwt.sign(
      {id: userId, email: email, isAdmin: level },
      process.env.SECRET_RTOKEN,
      {
        expiresIn: '4450m',
      }
    );
  }

  const verifyToken = (req, res, next) => {
    
    //const authHeader = req.headers['authorization'];
    const authHeader = req.headers['x-access-token'];	
    
  
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token)
    if (!token) {
      res.status(403).send({message: 'A token is required for authentication'});
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      req.decoded = decoded;

    } catch (error) {
      res.status(401).send({message: 'Invalid token'})
      return;
      
    }
   next();
  }

  const tokenRefresh = (req, res, next) => {
    const myData = req.body;
    if (myData.refreshToken &&  myData.refreshToken in refreshTokenList) {
      const decoded = jwt.verify(
        myData.refreshToken,
        process.env.SECRET_RTOKEN
      )

      const token = createAccessToken(decoded._id, decoded.email, decoded.isAdmin);
      const refreshToken = createRefreshToken(decoded._id, decoded.email, decoded.isAdmin);
      req.content = {
        id: decoded._id,
        email: decoded.email,
        isAdmin: decoded.level
      }
      req.token = token;
      req.refreshToken = refreshToken;

      refreshTokenList[refreshToken] = {
        status: 'loggedIn',
        token: token,
        refreshToken: refreshToken
      }

    } 
    next();
  }
module.exports = { userLogin , verifyToken, tokenRefresh }