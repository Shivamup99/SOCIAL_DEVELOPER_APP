import validator from "validator";
import { isEmpty } from "./isEmpty.js";

export const validateUserInput=(data)=>{
   let errors={}
   data.name = !isEmpty(data.name) ? data.name : '';
   data.email = !isEmpty(data.email) ? data.email : '';
   data.password = !isEmpty(data.password) ? data.password : '';
   data.password2 = !isEmpty(data.password2) ? data.password2 : '';
   
   if(!validator.isLength(data.name,{min:2,max:30}))
   {
    errors.name = "name should be within 2 to 30 character"
   }
   if(validator.isEmpty(data.name)){
    errors.name="name is required"
   }
   if(validator.isEmpty(data.email)){
    errors.email="email is required"
   }
   if(!validator.isEmail(data.email)){
    errors.email="invalid email"
   }
   if(validator.isEmpty(data.password)){
    errors.password="password is required"
   }
   if(!validator.isLength(data.password,{min:6,max:30}))
   {
    errors.password = "password should be within 6 to 30 character"
   }

   if(validator.isEmpty(data.password2)){
    errors.password2="confirm password is required"
   }

   if(!validator.equals(data.password2,data.password))
   {
    errors.password2 = "password must match"
   }



   return {
    errors,
    isValid:isEmpty(errors)
   }
}