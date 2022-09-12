import express from 'express'
import { addEducation, addExperience, createProfile, deleteEducation, deleteExperience, deleteProfile, getAllProfile, getProfile, getProfileByHandle,getProfileByUser } from '../controller/profile.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/profile',auth,getProfile)
router.get('/profile/all',auth,getAllProfile)
router.post('/profile',auth,createProfile)
router.get('/profile/:handle',auth,getProfileByHandle)
router.get('/profile/user/:user_id',auth,getProfileByUser)
router.post('/profile/experience',auth,addExperience)
router.post('/profile/education',auth,addEducation)
router.delete('/profile/experience/:exp_id',auth,deleteExperience)
router.delete('/profile/education/:edu_id',auth,deleteEducation)
router.delete('/profile',auth,deleteProfile)
export default router