const { default: rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
})


//app.use(limiter);

module.exports = limiter;