import { USER_ALREADY_EXIST, USER_NOT_EXIST, UNAUTHORIZED } from '../constant.js';

class CustomError extends Error {
    constructor(statusCode, type, message, error) {
        super();
        this.statusCode = statusCode || 500;
        this.type = type || "SERVER_ERROR";
        this.message = message || "Something went wrong !!";
        this.error = error || null;
    }

    static userAlreadyExist() {
        return new CustomError(USER_ALREADY_EXIST, "USER_ALREADY_EXIST", "use a differnt user name");
    }

    static userNotExist() {
        let statusCode = USER_NOT_EXIST;
        let type = "USER_NOT_EXIST";
        let message = "user is not registered in this app";
        return new CustomError(statusCode, type, message);
    }

    static passwordNotMatched() {
        return new CustomError(UNAUTHORIZED, 'WRONG_CREDENTIAL', "password not matched");
    }

    static createError(statusCode, type, message) {
        return new CustomError(statusCode, type, message);
    }
}

export default CustomError;