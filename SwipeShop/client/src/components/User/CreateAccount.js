import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function CreateAccount() {
 const [form, setForm] = useState({
   email: "",
   password: "",
   confirm: ""
 });
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

   if(form.password != form.confirm) {
    alert("Passwords don't match");
    return;
   }
   
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };

   newPerson.email = newPerson.email.toLowerCase();
 
   const response = await fetch("http://localhost:5050/CreateAccount", {
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

   if(resp.found === false) {
    alert("Account creation successful");
   } else {
    alert("Account already exists with this email.");
   }
 
   setForm({ email: "", password: "", confirm: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Account</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="email">Email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
           <div className="form-group">
         <label htmlFor="password">Password</label>
         <input
           type="text"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
        <div className="form-group">
        <label htmlFor="confirm password">Confirm Password</label>
         <input
           type="text"
           className="form-control"
           id="confirm password"
           value={form.confirm}
           onChange={(e) => updateForm({ confirm: e.target.value })}
         />
        </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>

     <div className="form-group">
          <label>Already have an account? <b onClick={() => navigate("/login")}>Login</b></label>
      </div>
   </div>
 );
}