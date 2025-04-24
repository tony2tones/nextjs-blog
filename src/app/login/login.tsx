'use client'
import { redirect } from "next/navigation";
import { useState } from "react";

type LoginFormProps = {
  email:string;
  password:string;
}

const LoginForm = () => {
  const[loginForm, setLoginForm] = useState<LoginFormProps>({email:'', password: ''})
  const [error,setError] = useState('');

  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault();

    const res = await fetch('api/login', {
      method: "POST",
      body: JSON.stringify(loginForm),
      headers:{'Content-type': 'application/json'},
    });

    if(res.status === 200) {
      redirect('/')
    } else {
      setError('login failed')
    }
    
  }

  function handleInput(e:React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]:value,
    }))
  }

  return (
    <div className="flex h-full justify-center align-middle">
    <form className="flex flex-col gap-y-2"  onSubmit={handleSubmit}>
      <label>Email</label>
      <input 
      type="text"
        name="email" 
        id="email" 
        value={loginForm.email} onChange={handleInput} />
      <label>Password</label>
      <input 
      type="password"
        name="password" 
        id="password" 
        value={loginForm.password} 
        onChange={handleInput} />
      <button type="submit">Login</button>
      {error ?? <p>{error}</p>}
    </form>
    </div>
  )
}

export default LoginForm;