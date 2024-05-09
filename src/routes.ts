import { Express,Request,Response } from "express";
import {userController} from "./controller/user.controller"
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
function routes(app:Express) {
    app.get("/checkApp",(req:Request,res:Response)=>
        res.sendStatus(200)
    )

    app.post("/get/user",validate(createUserSchema),userController)
}


export default routes;