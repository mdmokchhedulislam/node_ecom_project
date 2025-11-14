import { DecodeToken } from "../utils/TokenHelper.js";

const AuthVerification = (req, res, next) => {
    let token = req.headers['token'];
    if (!token) {
        token = req.cookies['token'];
    }

    let decoded = DecodeToken(token);

    if (decoded === null) {
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    } else {
        req.headers.email = decoded.email;
        req.headers.user_id = decoded.user_id;
        next();
    }
};

export default AuthVerification;
