const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
	encryptPW: function(pass) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
    },
    checkPW: function(pass, hash) {
        return bcrypt.compareSync(pass, hash);
    }
}
