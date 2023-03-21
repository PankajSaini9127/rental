import * as Yup from 'yup';


const AddUserSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please Enter Your Name"),
    email: Yup.string().email().required("Please Enter Your Email Address"),
    password: Yup.string().min(6).required("Please Enter Password"),
    role: Yup.array().required("Please Select Role"),
    supervisor: Yup.string().required("Please Select Supervisor Name"),
    mobile: Yup.string().min(10).max(12).required("Please Enter Your Mobile Number")
})

export {AddUserSchema}