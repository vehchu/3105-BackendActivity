import express from "express"
import userRoute from "./routes/user.js"
import rateLimiter from "./middleware/rateLimiter.js"
import loggingMiddleware from "./middleware/loggingMiddleware.js"

const app = express()

app.use(express.json())

//Middleware
app.use(rateLimiter)
app.use(loggingMiddleware)
app.use('/', userRoute)

//Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})