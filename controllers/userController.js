import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import Joi from 'joi'

// Registration 
export const register = async (req, res) => {
    const registerSchema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(3).required(),
        email: Joi.string().email({ 
            minDomainSegments: 2, 
            tlds: { allow: ['com'] } 
        }).required()
    })

    // Validate input
    const { error, value } = registerSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    if (userModel.findUserByUsername(value.username)) {
        return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = userModel.createUser({
        username: value.username,
        password: value.password,
        email: value.email
    })
    
    return res.json({
        msg: 'Successfully Registered!',
        data: newUser,
    })
}

// Login controller
export const login = async (req, res) => {
    // Joi schema for login
    const loginSchema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().required(),
    })

    // Validate input
    const { error, value } = loginSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    const user = userModel.findUserByUsername(value.username)
    if (!user) return res.status(400).json({ message: 'User not found' })

    // Check if the entered password matches the stored password
    if (user.password !== value.password) return res.status(400).json({ message: 'Invalid password' })

    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' })
    res.json({ token })
}

// Profile controller
export const profile = (req, res) => {
    const users = userModel.getAllUsers()    

    res.json(users)
}
