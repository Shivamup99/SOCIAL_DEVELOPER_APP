import express from 'express'
import { getUser, getUsers, login, register } from '../controller/user.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/register',register)
router.get('/all',getUsers)
router.post('/login',login)
router.get('/:id',auth,getUser)

export default router