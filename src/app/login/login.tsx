'use client'
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';
import {
  Card,
  CardHeader,
} from "@/components/ui/card"

type LoginFormProps = {
  email:string;
  password:string;
}

const LoginForm = () => {
  const[loginForm, setLoginForm] = useState<LoginFormProps>({email:'', password: ''})

  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault();

    const res = await fetch('api/login', {
      method: "POST",
      body: JSON.stringify(loginForm),
      headers:{'Content-type': 'application/json'},
    });

    if(res.status === 200) {
      toast('You have successfully logged in');
      redirect('/')
    } else {
      toast('Login failed');
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
      <Card className="w-full max-w-sm bg-slate-950 text-slate-100">
  <CardHeader className="text-center">
      <h1>Login</h1>
  </CardHeader>
    <form className="flex flex-col gap-y-2 px-3"  onSubmit={handleSubmit}>
      <label>Email</label>
      <Input 
      type="text"
        name="email" 
        placeholder="email"
        id="email" 
        value={loginForm.email} onChange={handleInput} />
      <label>Password</label>
      <Input 
      type="password"
        name="password" 
        placeholder="password"
        id="password" 
        value={loginForm.password} 
        onChange={handleInput} />
      <button type="submit">Login</button>
    </form>
      </Card>
    </div>
  )
}

export default LoginForm;