import React from "react"; 
import {Routes,Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";





function App() {

  
    return (
    
        <div className="App">

          
            <Navbar/>
            <Routes>
              <Route path="/" exact element={<Home/>}/>
              
              
              {/* <Route path="/posts" exact element={<Posts/>}/> */}
              
            </Routes>
           
          
          
        </div>)
}
export default App; 