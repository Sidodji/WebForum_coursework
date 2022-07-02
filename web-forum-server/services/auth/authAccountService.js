const jwt = require('jsonwebtoken');

module.exports = (user) => {
    console.log(user);
    const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 3600 * 24
        }
    )
    return new Object({
        user: {
            id: user.id,
            username: user.username,
            img: user.img,
            role: user.role
        },
        token: token,
        success: true
    });
}
