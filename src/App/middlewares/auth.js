import jwt from "jsonwebtoken";
import { proimsify } from "util";

import authConfig from "../../config/auth.js";

export default async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({erro: "token is not provided"});
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = await proimsify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id;

        console.log(decoded);

        return next();
    } catch (error) {
        return res.status().json({error: "Token invalid."})
    }
}