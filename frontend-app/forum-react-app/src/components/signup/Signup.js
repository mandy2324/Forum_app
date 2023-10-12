import React from "react"; 
import "./Signup.css";
import { useState } from "react"; 
import { Link } from "react-router-dom";


function Signup() {


    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleSubmit = async () => {
    
        const requestObject = 
        {
            "username": username, 
            "password": password 
        }
    
        if(!username || !password){
            setSuccessMessage(""); 
            setErrorMessage("Sign up failed. Please check username or password.");
            return; 
        }
        try {
            const response = await fetch("http://localhost:8080/user", {
                method: "POST", 
                headers: {
                    "Content-type": "application/json", 
                },
                body: JSON.stringify(requestObject),
            }); 
            if(response.ok) {
                setSuccessMessage("Sign up was a success. You can now log in.")
                setErrorMessage("");
            } else {
                setSuccessMessage(""); 
                setErrorMessage("Unable to process request. Please check your information")
            }
    
        } catch(error){
            setSuccessMessage("");
            setErrorMessage("An error has occured. Please try again later.")
        }
    }
    
  return (
    <div className='r-wrapper'>
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
        {/* <input type="text" placeholder='Name'/> */}
        <input type="text" placeholder='Password'onChange={(e) => setPassword(e.target.value)}/>
        {/* <input type="text" placeholder='Re-enter Password'/> */}
      </form>
      <button className='r-btn' onClick={handleSubmit}>Sign Up</button>
      <Link to="/login">
        <div className='member'>Already have an account? Login Now</div>
      </Link>
      
    </div>
  )
}

export default Signup;