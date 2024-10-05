import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next){
    const token = req.headers['authorization']?.split(' ')[1]
    
    if (!token) return res.status(401).json({ message: 'Access denied' })

    try {
        const verified = jwt.verify(token, 'secretkey')
        req.user = verified 
        next()
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' })
    }
}

