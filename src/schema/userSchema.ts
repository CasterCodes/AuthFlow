import {object, string, ref} from "yup";


const userSignupSchema  = object({
  body:object({
      name:string().required('Name is required'),
      password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
      passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Passwords must match"
    ),
     email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  })
});


const userLoginSchema = object({
    body:object({
          email:string().email('Email must be valuid').required('User email is required'),
          password: string()
          .required("Password is required")
          .min(6, "Password is too short - should be 6 chars minimum.")
          .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    })
})


export {userSignupSchema, userLoginSchema}

