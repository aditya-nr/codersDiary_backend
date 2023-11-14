import mongoose, { Error } from 'mongoose';
import { VALIDATION_ERROR, UNAUTHORIZED, DB_ERROR, DEBUG_MODE } from '../constant.js';
import CustomError from '../utils/CustomError.js';
import jwt from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError } = jwt;
const ErrorHandler = (err, req, res, next) => {
    let statusCode = 500
    let responce = {
        success: false,
        type: "SERVER_ERROR"
    }

    if (err instanceof Error.ValidationError) {
        statusCode = VALIDATION_ERROR;
        responce.type = "VALIDATION_ERROR";
        let tmp = [];
        for (let key in err.errors) {
            tmp.push({ message: err.errors[key].message, path: err.errors[key].path });
        }
        responce.data = tmp;
    }
    else if (err instanceof Error.DocumentNotFoundError) {
        statusCode = 404;
        responce.type = "DOUCMENT_NOT_FOUND";
        if (DEBUG_MODE) console.log(`ErrorHandler :: \n`, err);
    }
    else if (err instanceof Error.CastError) {
        statusCode = DB_ERROR;
        responce.type = "DB_ERROR";
        responce.message = "Cast Error"
        responce.kind = err.kind;
    }
    else if (err instanceof Error) {
        statusCode = DB_ERROR;
        responce.type = "DB_ERROR";
        if (DEBUG_MODE) console.log(`ErrorHandler :: \n`, err);
    }
    else if (err instanceof TokenExpiredError) {
        statusCode = UNAUTHORIZED;
        responce.type = err.message;
        responce.data = { expiredAt: err.expiredAt };
    }
    else if (err instanceof JsonWebTokenError) {
        statusCode = UNAUTHORIZED;
        responce.type = err.message;
    }
    else if (err instanceof CustomError) {
        statusCode = err.statusCode;
        responce.type = err.type;
        responce.message = err.message;
        if (DEBUG_MODE) console.log(`ErrorHandler :: \n`, err.error);
    }

    if (responce.type == 'SERVER_ERROR') responce.message = "Something went wrong!!";
    res.status(statusCode).json(responce);
}

export default ErrorHandler