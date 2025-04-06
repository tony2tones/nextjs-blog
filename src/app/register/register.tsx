'use client'

import { useState } from "react"

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
    } else {
      const data = await res.json();
      setError(data.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input 
        type='text' 
        placeholder="name" 
        value={formData.name}
        onChange={(e) => setFormData({...formData, name:e.target.value})}
        required
        />
         <input 
        type='email' 
        placeholder="email" 
        value={formData.email}
        onChange={(e) => setFormData({...formData, name:e.target.value})}
        required
        />
        <input 
        type='email' 
        placeholder="email" 
        value={formData.email}
        onChange={(e) => setFormData({...formData, name:e.target.value})}
        required
        />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
    </form>
  )

}