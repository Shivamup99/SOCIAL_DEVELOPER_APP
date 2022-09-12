import Profile from '../modals/profile.js'
import Users from '../modals/user.js'

// get current user profile
export const getProfile =async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar','email'])
        if(!profile) return res.status(400).json('there is no profile')
        res.status(200).json(profile)   
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getAllProfile =async(req,res)=>{
    try {
        const profile = await Profile.find().populate('user',['name','avatar','email'])
        if(!profile) return res.status(400).json('there is no profile')
        res.status(200).json(profile)   
    } catch (error) {
        res.status(500).json(error)
    }
}

// router profile get by handle

export const getProfileByHandle = (req,res)=>{
     Profile.findOne({handle:req.params.handle}).populate('user',['name','email','avatar'])
     .then(profile=>{
        if(!profile){
            res.status(400).json('There is no profile')
        }
        res.status(200).json(profile)
     }).catch(err=>res.status(500).json(err))
}

export const getProfileByUser =(req,res)=>{
    Profile.findOne({user:req.params.user_id}).populate('user',['name','email','avatar'])
    .then(profile=>{
       if(!profile){
           res.status(400).json('There is no profile')
       }
       res.status(200).json(profile)
    }).catch(err=>res.status(500).json(err))
}

//create profile need to some bug handle

export const createProfile = (req,res)=>{
    const profileFields = {};
    profileFields.user = req.user.id
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills
    }

    profileFields.social ={};
    if(req.body.github) profileFields.social.github = req.body.github;
    if(req.body.linkdin) profileFields.social.linkdin = req.body.linkdin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;


    Profile.findOne({user:req.user.id}).then(profile=>{
        if(profile){
            // then update profile
            Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
            .then(profile=>res.status(200).json(profile))
        } else{
            // create the profile
            Profile.findOne({handle:profileFields.handle}).then(profile=>{
                if(profile){
                    return res.status(400).json('That handle allready exist')
                }
                new Profile(profileFields).save().then(profile=>res.status(200).json(profile))
            })
        }
    }).catch(err=>res.status(500).json(err))

    // const oldProfile = await Profile.findOne({user:req.user.id})
    // if(oldProfile){
    //     //update
    //     try {
    //       const profile =  await Profile.findOneAndUpdate(
    //             {user:req.user.id},
    //             {$set:profileFields},
    //             {new:true}
    //         )
    //         res.status(200).json(profile)
    //     } catch (error) {
    //         res.status(500).json(error)
    //     }
      
    // }
    // else{
    //     try {
    //         const newProfile = await Profile.findOne({handle:profileFields.handle})
    //         if(newProfile){
    //            return res.status(400).json('The handle is exists')
    //         }
    
    //        const profile = new Profile(profileFields).save()
    //        res.status(201).json(profile)
    //     } catch (error) {
    //         res.status(500).json(error) 
    //     }
      
    // }
}

export const addExperience = async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id})
        if(profile){
            const newExp = {
                title:req.body.title,
                company:req.body.company,
                location:req.body.location,
                from:req.body.from,
                to:req.body.to,
                current:req.body.current,
                description:req.body.description,
            }
            profile.experience.unshift(newExp)
            const newPro= await profile.save()
            res.status(200).json(newPro)
        }   
    } catch (error) {
        res.status(500).json(error)
    }
}

export const addEducation = async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id})
        if(profile){
            const newEdu = {
                school:req.body.school,
                degree:req.body.degree,
                fieldofStudy:req.body.fieldofStudy,
                from:req.body.from,
                to:req.body.to,
                current:req.body.current,
                description:req.body.description,
            }
            profile.education.unshift(newEdu)
            const newPro= await profile.save()
            res.status(200).json(newPro)
        }   
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete experience from profile

export const deleteExperience = async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id})
        if(profile){
            const removeIndex = profile.experience.map(item=>item.id)
            .indexOf(req.params.exp_id)
            profile.experience.splice(removeIndex,1);
            const newPro = await profile.save()
            res.status(200).json(newPro)
        }   
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete education from profile

export const deleteEducation = async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id})
        if(profile){
            const removeIndex = profile.education.map(item=>item.id)
            .indexOf(req.params.edu_id)
            profile.education.splice(removeIndex,1);
            const newPro = await profile.save()
            res.status(200).json(newPro)
        }   
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete profile and current user

export const deleteProfile = async(req,res)=>{
    try {
        const profile = await Profile.findOneAndRemove({user:req.user.id})
        if(profile){
            await Users.findOneAndRemove({_id:req.user.id})
            res.status(200).json({success:true})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}