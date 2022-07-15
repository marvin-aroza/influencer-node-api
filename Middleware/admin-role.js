const jwttoken = require('jsonwebtoken');

module.exports = {
    adminRole: (req, res, next) => {
        try {
          const token = req.headers.authorization.split(' ')[1];
          result = jwttoken.verify(token, process.env.TOKEN_SECRET);
          if(result.role === 'Admin') {
            next();
          } else {
            result = { 
              message: `Not Authorized.`,
              code: 401,
              data:null
            };
            res.status(401).send(result);
          }
        } catch (err) {
          throw new Error(err);
        }
    }
  };