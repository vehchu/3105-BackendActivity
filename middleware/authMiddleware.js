// middleware/authMiddleware.js
import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]
    
    if (!token) return res.status(401).json({ message: 'Access denied' })

    try {
        const verified = jwt.verify(token, 'secretkey')
        req.user = verified // Store user info in req.user
        next()
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' })
    }
}

export default authMiddleware
