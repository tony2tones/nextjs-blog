'use client'

import { useActionState, useState } from "react"
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
} from "@/components/ui/card"
import { register } from "@/lib/action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [formData,setFormData] = useState({name: '', email: '', password: ''})
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(register, undefined);

  if(state?.success) {
    toast('You have successfully registered');
    router.push('/');
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
    <Card className="w-3xl max-w-md bg-slate-950 text-slate-100">
      <CardHeader className="text-center">
        <div className="flex flex-col items-start gap-2 ">
          <h1>Register</h1>
          <p>When signing up you wil be able to create a post</p>
          <p>and comment on other posts.</p>
          <p>We will never share your data with anyone.</p>
          <p>We will never spam you.</p>
          <p>We will never sell your data.</p>
      </div>
  </CardHeader>
    <form action={formAction} className="flex flex-col gap-2 px-3">
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
        <button type="submit" disabled={isPending}>{isPending ? 'loading' : 'Register'}</button>
        {!state?.success && <p>{state?.message}</p>}
        {state?.success && <p>{state.message}</p>}
    </form>
    </Card> 
    </div>
  )
}