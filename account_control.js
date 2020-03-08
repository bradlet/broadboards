const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptPW = function(pass) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
}
