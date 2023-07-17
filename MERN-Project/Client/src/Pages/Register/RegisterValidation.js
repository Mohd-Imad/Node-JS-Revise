const validation = (values) => {
    let errors = {}

    //name
    if (!values.fname) {
        errors.fname = "First name is required"
    }
    else if (values.fname.length < 5) {
        errors.fname = "Name should be atleast of 5 characters"
    }

    //mobile
    if (!values.mobile) {
        errors.mobile = "Mobile number is required"
    }
    else if (values.mobile.length < 10 || values.mobile.length > 10) {
        errors.mobile = "Invalid mobile number"
    }

    //email
    if (!values.email) {
        errors.email = "Email ID is required"
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = "Invalid Email ID"
    }
  
    //password
    if (!values.password) {
        errors.password = "Password is required"
    }
    else if (values.password.length < 6 || values.password.length > 15) {
        errors.password = "Password must be of min 6 and max 15 characters"
    }
    else if (!/(?=.*?[A-Z])/.test(values.password)) {
        errors.password = "Password must have atleast 1 uppercase letter"
    }
    else if (!/(?=.*?[a-z])/.test(values.password)) {
        errors.password = "Password must have atleast 1 lowercase letter"
    }
    else if (!/(?=.*?[0-9])/.test(values.password)) {
        errors.password = "Password must have atleast 1 number"
    }

    //Confirm Password 
    if (!values.re_password) {
        errors.re_password = "Re enter password to confirm"
    }
    else if (values.re_password !== values.password) {
        errors.re_password = "Password does not match"
    }

    //checkbox
    if(!values.checkbox){
        errors.checkbox = "Accept terms to register"
    }

    return errors
}

export default validation