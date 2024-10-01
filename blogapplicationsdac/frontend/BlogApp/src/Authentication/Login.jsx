import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
function Login() {

    const [userData, setuserData] = useState(
        {
            email:"",
            password:""
        }
    )

    const handleChange =(e)=>{
        const {name, value} = e.target;
        setuserData((prev)=>({
            ...prev,
            [name]:value
        }))
        console.log(userData)
    }

    const navigate = useNavigate();

    const handleSubmit =async (e)=>{
      e.preventDefault();
      try {
        const res = await fetch('http://localhost:5000/api/auth/login',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(userData), 
          }
        )

        if (res.ok) {
          const data = await res.json();
          toast.success('you have logged in', {
            position: "top-right",
            autoClose: 3000,
          });
          console.log(data); // Check the received data (like token or user info)
          navigate('/'); // Redirect to dashboard or any other page
        }
        if(res.status == 404){
          alert("user not found");
        }

        if(res.status == 401){
          toast.warn('check your password', {
            position: "top-right",
            autoClose: 3000,
          });
        }


      } catch (error) {
        console.error(error);
      }
    }
  return (
    <div className="h-screen bg-slate-900 flex items-center justify-center text-white">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
