import React from 'react';
import {FaSearch} from "react-icons/fa"; 
import "./Home.css";
import TalkBG from "../../assests/group_talk.jpg";






function Home() {
  return (
  <>
  <div className='splash'>
    <img style={{backgroundImage: `url(${TalkBG})`}}></img>
    <div className="bg-overlay"></div>

      <div className="splash-text">
        <p>SHARE A THOUGHT.RECEIVE A THOUGHT.</p>
        <p></p>
        <form className="form">
            <div>
              <input type="text" placeholder="Search Let's Talk Forums"></input>
            </div>
            <div>
              <button><FaSearch className="icon"/></button>
            </div>
        </form>
    </div>
    </div>
    </>
  )
 }
export default Home;