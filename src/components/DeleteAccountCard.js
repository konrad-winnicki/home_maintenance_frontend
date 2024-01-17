import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png"

export function DeletedAccountCard() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(()=>{navigate('/login')}, 3000)
    return ()=>{clearTimeout(timeoutId)}
  },[navigate]);

  return (


    <div className="row justify-content-center"
    >
        <img src={logo} alt="Logo" 
         style={{ width: '70%', height: '50%', objectFit: 'cover', marginTop:'35%', marginBottom: '10%'}}
        /> 
        <div className="row justify-content-center"
          style={{ backgroundColor: "black", alignItems: 'center', color: "red", fontSize: '30px', fontWeight: 'bold', width: '70%'}}
          >ACCOUNT DELETED </div>
        
      </div>
      
    
  );
}
