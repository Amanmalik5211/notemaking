import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
    console.log(userId, "generatetoken hitted");
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "12h",
    });
    console.log(token, 'generatetoken hitted 2');
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 12 * 60 * 60 * 1000,
    });
    return token;
};
