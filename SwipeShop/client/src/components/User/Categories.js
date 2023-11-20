import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import '../../styles/main.css';
import '../../styles/categories.css';

 
export default function Categories() {
 const categories = new Set([]);

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


 function addCategory(category) {
    if (categories.has(category)) {
        categories.delete(category);
    } else {
        categories.add(category);
    }
 }

 async function sendCategories() {
    if (categories.size === 0) {
        alert("Select at least 1 category.");
        return;
    }

    const response = await fetch("http://localhost:5050/login", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: globalUser.email, categories: Array.from(categories)}),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
   
      const resp = await response.json();

      if (resp.found) {
        console.log("success");
      } else {
        console.log("failed");
      }
 }
 
 
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
        <h1>Categories</h1>
        <h2>Select the categories that interest you.</h2>
        <br></br>
        <div>
        <table>
            <tbody>
                <tr>
                    <td>
                        <label class="container" onCli>
                            <input type="checkbox"/>
                            <span class="checkmark select" onClick={() => addCategory("gaming")}>gaming</span>
                        </label>
                    </td>
                    <td>
                        <label class="container">
                            <input type="checkbox"/>
                            <span class="checkmark select" onClick={() => addCategory("fashion")}>fashion</span>
                        </label>
                    </td>
                    <td>
                        <label class="container">
                            <input type="checkbox"/>
                            <span class="checkmark select" onClick={() => addCategory("beauty")}>beauty</span>
                        </label>
                    </td>
                    <td>
                        <label class="container">
                            <input type="checkbox"/>
                            <span class="checkmark select" onClick={() => addCategory("sports")}>sports</span>
                        </label>
                    </td>
                </tr>
                <tr className="shifted">
                    <td>
                        <label class="container">
                            <input type="checkbox"/>
                            <span class="checkmark select" onClick={() => addCategory("art")}>art</span>
                        </label>
                    </td>
                    <td>
                        <label class="container">
                            <input type="checkbox"/>
                            <span class="checkmark select" onClick={() => addCategory("music")}>music</span>
                        </label>
                    </td>
                    <td>
                        <label class="container">
                            <input type="checkbox"/>
                            <span class="checkmark select" onClick={() => addCategory("cooking")}>cooking</span>
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
        <br></br>
        <button onClick={() => sendCategories()}>Submit</button>
   </div>
 );
}