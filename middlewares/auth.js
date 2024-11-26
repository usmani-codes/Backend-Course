import jwt from 'jsonwebtoken'

export const AUTH = async (req, res, next) => {
    const secretKey = process.env.JWT_SECRET
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ success: false, msg: "Unauthorized !! no token provided" })
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(400).json({ success: false, msg: "invalid token.." })
        } else {
            req.user = decoded
            console.log(decoded)
            next()
        }
    })


}