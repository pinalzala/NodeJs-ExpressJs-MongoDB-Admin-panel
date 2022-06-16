const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = authorize;

function authorize() {

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        async (req, res, next) => {
            const account = await db.account.findById(req.user.id);
            //console.log(account);
            if (!account) {
                // account no longer exists or role not authorized
                return res.status(401).json({ status:'error',message: 'Unauthorized' });
            }
            next();
        }
    ];
}