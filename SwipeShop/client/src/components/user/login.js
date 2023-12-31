import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import "../../styles/main.css";
import "../../styles/login.css";
 
export default function Login() {

 const [form, setForm] = useState({
   email: "",
   password: ""
 });

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

 window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   const response = await fetch("http://localhost:5050/login", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   const resp = await response.json();

   if (resp.found) {
    setGlobalUser({email: resp.email, password: resp.password, _id: resp._id});
    navigate('/homePage')
   } else {
    alert("invalid credentials.");
    setForm({ email: "", password: "" });
    return;
    //TODO: display error message
   }

 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div className="login-wrap">
      <table>
        <tbody>
          <tr>
            <td className="left-align left-side">
              <div className="left-side">
                <h1>Swipe<b>Shop</b></h1>
                <h1 className="arrow">→</h1>
              </div>
            </td>
            <td className="center-data left-align">
              <h1>Login</h1>
              <br className="form-trail"></br>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <p htmlFor="email">Username</p>
                  <input
                    type="text"
                    className="form-control form-input"
                    id="email"
                    value={form.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <p htmlFor="password">Password</p>
                  <input
                    type="password"
                    className="form-control form-input"
                    id="password"
                    value={form.password}
                    onChange={(e) => updateForm({ password: e.target.value })}
                  />
                </div>
                <br className="form-trail"></br>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Login"
                    className="button login-btn"
                  />
                </div>
              </form>
              <p className="spread">Don't have an account? <b className="hover" onClick={() => navigate("/")}>Create one</b></p>
            </td>
          </tr>
        </tbody>
      </table>
   </div>
 );
}