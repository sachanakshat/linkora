const zod = require("zod");

const signup = zod.object({
    email: zod.string(),
    password: zod.string(),
});

const signin = zod.object({
    email: zod.string(),
    password: zod.string(),
});

const login = zod.object({
    email: zod.string(),
    password: zod.string(),
});

module.exports = {
    signupParser: signup,
    loginParser: login,
    signinParser: signin,
};
