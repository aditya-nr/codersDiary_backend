import jwt from "jsonwebtoken";


class JwtServices {
    static issueToken(payload) {
        try {
            return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES })
        } catch (error) {
            throw error
        }
    }
    static verify(token) {
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            throw err
        }
    }
}

export default JwtServices;