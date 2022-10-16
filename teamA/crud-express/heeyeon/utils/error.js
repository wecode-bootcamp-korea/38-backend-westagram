const asyncWrap = asyncController => {
    return (req, res, next) => {
        asyncController(req, res, next).catch((error)=>next(error));
    }
}

const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({messgae : err.message})
}

module.exports = {
    asyncWrap,
    globalErrorHandler
}