import React, { useState } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; 
import { useAuth } from "../../service/AuthContextProvider";

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const {login, updateUser} = useAuth();
  
  
    const handleLogin = async (e) => {
      e.preventDefault();
      const requestObject = {
        username: username,
        password: password,
      };
  
      try {
        const response = await fetch("http://localhost:8080/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestObject),
        });
  
        if (response.ok) {
          const data = await response.json();
          updateUser(data);
          login(data);
          navigate("/dashboard");
        } else {
          setSuccessMessage("");
  
          
          setErrorMessage("Login failed. Please check your information.");
        }
      } catch (error) {
        setSuccessMessage("");
        setErrorMessage("An error occurred. Please try again later.");
      }
    };

    return (
        <>
        <div>
        <div className='l-wrapper'>
       <h1>Login</h1>
       <form>
         <input type="text" placeholder='Username'onChange={(e)=> setUsername(e.target.value)}/>
         <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
       </form>
       <button className='l-btn' onClick={(e)=> handleLogin(e)}>Login</button>
       <Link to="/register">
       <div className='member'>Not a member? Register Now</div>
       </Link>
     </div>
       
     </div>

     </>
    )
}

    export default Login; 