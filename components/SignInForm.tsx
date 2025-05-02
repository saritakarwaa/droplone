"use client"
import { useForm } from "react-hook-form"
import { useSignIn } from "@clerk/nextjs"
import { signInSchema } from "@/schemas/signInSchema"
import {z} from "zod"
import { useRouter } from "next/router"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"


export default function SignInForm(){
    const router=useRouter()
    const {signIn,isLoaded,setActive}=useSignIn()
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [authError,setAuthError]=useState<string | null>(null)
    const {
        register,
        handleSubmit
    }=useForm({
        resolver:zodResolver(signInSchema),
        defaultValues:{
            identifier:"",
            password:""
        }
    })
    const onSubmit=async (data:z.infer<typeof signInSchema>)=>{
        if(!isLoaded) return
        setIsSubmitting(true)
        setAuthError(null)
        try{
            const result=await signIn.create({
                identifier:data.identifier,
                password:data.password
            })
            if(result.status==="complete"){
                await setActive({session:result.createdSessionId})
            }
            else{
                setAuthError("Sign in error")
            }
        }
        catch(error:any){
            setAuthError(
                error.errors?.[0].message || "An error has occured while signing in"
            )
        }
        finally{
            setIsSubmitting(false)
        }
    }
    return(
        <h1>Return a sign in form</h1>
    )
}