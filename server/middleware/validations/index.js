import {body,validationResult} from "express-validator";

const registerValidations = () =>{
    return[
        body("email","Enter vaid email").isEmail().isLength({max:50}),
        body("firstName","first name must be 3-30 chars long").isLength({max:30,min:3}),
        body("password", "password must contain at least 7 characters").isLength({min: 7}),
        body("phone", "Phone number must contain at least 10 characters").isMobilePhone().isLength({min: 10}),
        body("password2").custom((value,{req})=>{
            if(value!=req.body.password){
                throw new Error("Passwords do not match.");
            }
            return true;
        })
    ];
};


const loginValidations =()=>{
    return[
        body("email","enter valid email.").isEmail(),
        body("password", "Password must contain at least 7 characters").isLength({min: 7})
    ]
};

const errorMiddleWare = (req,res,next) =>{
    const errors = validationResult(req);
    if(errors.isEmpty==false){
        return res.status(400).json({errors: errors.array() });
    }
    next();
};

export {registerValidations,loginValidations,errorMiddleWare};