import Users from '../modals/user.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from 'gravatar'
import { validateUserInput } from '../validation/user.js';

export const register = async (req, res) => {
    // const {isValid,errors} = validateUserInput(req.body)
  
    // if(!isValid){
    //     return res.status(400).json(errors)
    // }
    const avatar = gravatar.url(req.body.email,{
        s:'200',
        r:'pg',
        d:'mm'
    })
    const user = await Users.findOne({ email:req.body.email });
    if (user)
      return res.status(400).json({ message: "This email is allready exists" });
    if (req.body.password.length < 6)
      return res
        .status(401)
        .json({ message: "Password length more than 6 char" });
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
    try {
      const newUser = new Users({
        name:req.body.name,
        email:req.body.email,
        password: hashPassword,
        avatar
      });
      await newUser.save();
      const accessToken = jwt.sign(
        { id: newUser._id ,name:newUser.name, email:newUser.email,avatar:newUser.avatar},
        process.env.ACCESS_TOKEN_SECRETS,
        { expiresIn: "1d" }
      );
      res.status(201).json({ users: newUser,accessToken});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ message: "user does not exist" });
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Inncorect Password" });
      const accessToken = jwt.sign(
        { id: user._id ,name:user.name, email:user.email,avatar:user.avatar},
        process.env.ACCESS_TOKEN_SECRETS,
        { expiresIn: "1d" }
      );
    //   const refreshToken = jwt.sign(
    //     { id: user._id },
    //     process.env.REFRESH_TOKEN_SECRETS,
    //     { expiresIn: "7d" }
    //   );
    //   res.cookie("refreshtoken", refreshToken, {
    //     httpOnly: true,
    //     path: "/user/refresh_token",
    //   });
      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };





  export const getUsers = async (req, res) => {
    try {
      const user = await (await Users.find().select("-password")).reverse();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getUser = async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ message: "user not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };