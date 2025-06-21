'use client'

import { useState } from "react"
import {redirect} from 'next/navigation';
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const [formData,setFormData] = useState({name: '', email: '', password: ''})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState("");

  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/register', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'},
    });

    if(res.status === 201) {
      setSuccess("User registered! You can now login.")
      toast('You have successfully registered');
      redirect('/login');
    } else {
      const data = await res.json();
      setError(data.error)
      toast('Registration has failed');
    }
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input 
        type='text' 
        placeholder="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        />
         <input 
        type='email' 
        placeholder="email" 
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        />
        <input 
        type='password' 
        placeholder="password" 
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
        />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
    </form>
  )

}