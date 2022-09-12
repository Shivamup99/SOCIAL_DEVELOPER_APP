import express from 'express'
const PORT = process.env.PORT || 5000
import mongooseConnection from './config/connection.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import user from './routes/user.js' 
import profile from './routes/profile.js'
import posts from './routes/posts.js'
const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

app.use(cors())
mongooseConnection();

app.use('/api/user',user)
app.use('/api/user',profile)
app.use('/api',posts)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})