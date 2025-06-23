'use client'

import { useState } from "react"
import {redirect} from 'next/navigation';
import { Input } from "@/components/ui/input";
import toast from 'react-hot-toast';
import {
  Card,
  CardHeader,
} from "@/components/ui/card"

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
    <div className="flex h-full justify-center align-middle">
    <Card className="w-full max-w-sm bg-slate-950 text-slate-100">
      <CardHeader className="text-center">
      <h1>Register</h1>
  </CardHeader>
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-3">
      <label htmlFor="name" >Name</label>
      <Input 
      className="bg-slate-900"
        type='text' 
        placeholder="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        />
      <label htmlFor="email" >Email</label>
         <Input 
        type='email' 
        placeholder="email" 
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        />
        <label htmlFor="password">Password</label>
        <Input 
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
    </Card> 
    </div>
  )

}