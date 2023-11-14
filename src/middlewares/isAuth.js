import JwtServices from "../utils/jwtServices.js";

const isAuth = (req, res, next) => {
    let { token } = req.body;
    try {
        let data = JwtServices.verify(token);
        req.body.uid = data.uid;
        req.body.sid = data.sid;
    } catch (error) {
        return next(error);
    }
    next();
}

export default isAuth