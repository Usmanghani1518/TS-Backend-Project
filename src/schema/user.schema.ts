import {TypeOf,  object,string} from "zod";


export const createUserSchema = object({
    body:object({
        name:string({required_error:"Name is required"}),
        password:string({required_error:"Password is required"}).min(6,"Password is to short - must be 6 char min"),
        passwordConfirmation:string({required_error:"Password confirmation is required "}),
        email:string({required_error:"Email is required "}).email("email is not valid")
        
    }).refine((data)=>data.password === data.passwordConfirmation ,{
        message:"password do not match ",
        path:["passwordConfirmation"]
    })
})

export type CreateUserInput = Omit< TypeOf< typeof createUserSchema>,"body.passwordConfirmation" >