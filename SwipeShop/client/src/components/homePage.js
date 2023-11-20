import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import '../styles/main.css';
 
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

 if (!globalUser || globalUser.email === "") {
  navigate("/");
 } 
 
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
        <h1>{"Welcome: " + globalUser.email}</h1>
        <h1>Swipe<b>Shop</b></h1>
        <h1>Title</h1>
        <h2>Subtitle</h2>
        <p>Body text</p>
        <button>Button</button>

        <label class="container">
          <input type="checkbox"/>
          <span class="checkmark select">select</span>
        </label>



        
   </div>
 );
}