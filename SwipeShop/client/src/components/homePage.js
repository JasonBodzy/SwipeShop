import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
 
export default function HomePage() {

 const [globalUser, setGlobalUser] = useLocalStorage("globalUser", 
    {
        _id: "",
        email: "",
        password: "",
        saved_products: [],
        liked_products: [],
        disliked_products: [],
        statistics: []
    }
 );

 const navigate = useNavigate();
 
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
        <h1>{"Welcome: " + globalUser.email}</h1>

        
   </div>
 );
}