import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../redux/admin/adminLoginSlice";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const {  loading, error } = useSelector(
    (state) => state.admin
  );

  const handleSubmit =(e)=>{
    e.preventDefault()
    dispatch(adminLogin({email,password})).then(()=>{
      navigate('/admin/dashboard')
    })  
  }
  

  return (
    <div className="p-3 mt-36 max-w-lg mx-auto bg-stone-200">
    <h1 className="text-3xl text-center font-semibold my-7">Admin Login</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        id="email"  
        className="bg-slate-100 p-3 rounded-lg"
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input
        type="password"   
        placeholder="Password"
        id="password"
        className="bg-slate-100 p-3 rounded-lg"
         onChange={(e)=>setPassword(e.target.value)}
      />
      <button  
        className="bg-slate-700 mt-3 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        type="submit"
        disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
      </button>
      
    </form>
   
    <p className="text-red-700 mt-5">
      {error ? error.message || "Something went wrong!" : ""}
    </p>
  </div>
  );
};
export default AdminLogin;
