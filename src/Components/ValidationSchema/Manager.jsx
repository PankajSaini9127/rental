import * as Yup from 'yup';

const agreementSchema = Yup.object({
     leeseName: Yup.string().min(4).required("Please Enter Leese Name"),
     state: Yup.string().min(3).required("Please Enter State"),
     city: Yup.string().min(3).required("Please Enter City"),
     location: Yup.string().min(4).required("Please Enter Location"),
     pincode: Yup.number().min(6).required("Please Enter PinCode"),
     address: Yup.string().min(25).required("Please Enter Address"),
     aadharNo: Yup.number().min(12).required("Please Enter Aadhar Number"),
     panNo: Yup.string().min(6).required("Please Enter Pan Number"),
     gstNo: Yup.string().min(12).required("Please Enter GST Number"),
     mobileNo: Yup.number().min(10).required("Please Enter Mobile Number"),
     alternateMobile: Yup.number().min(10).required("Please Enter Alternate Mobile Number"),
     email: Yup.string().email().required("Please Enter Alternate Mobile Number"),
     lockInYear: Yup.string().required("Please Lock In Year"),
     noticePeriod: Yup.number().required("Please Enter Notice Period"),
     deposite: Yup.number().required("Please Enter Deposite Amount"),
     monthlyRent: Yup.number().required("Please Enter Monthly Amount"),
     yearlyIncrement: Yup.string().required("Please Select Yearly Increment Type"),
     bankName: Yup.string().min(5).required("Please Enter Bank Name"),
     benificiaryName: Yup.string().min(3).required("Please Enter Benificiary Name"),
     accountNo: Yup.number().min(10).required("Please Enter Account Number"),
     ifscCode: Yup.string().min(6).required("Please Enter Bank IFSC"),
})


export {agreementSchema}