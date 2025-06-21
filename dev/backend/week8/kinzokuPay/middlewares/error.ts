function throwError(message, status = 400) {
    const err = new Error(message);
    err.status = status;
    throw err;
}

module.exports = throwError;
