"use client"

import * as z from "zod"
import { useForm } from "react-hook-form";
import  {zodResolver} from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation";


import{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle

} from "@/components/ui/dialog"

import{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
}from '@/components/ui/form'

import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button"
import { useEffect, useState } from "react";
import { FileUpload } from "@/components/file-upload";



// form validation picked by resolve in the useForm 
const formSchema = z.object({
    name:z.string().min(1,{
        message:"Server Name is required"
    }),
    imageUrl:z.string().min(1,{
        message:"Add a Profile Picture"
    }),
})




export const InitailModal = () => {

    const [isMounted,setIsMounted] = useState(false) // to open/close the modal

    const router = useRouter()

    const form = useForm({
        resolver:zodResolver(formSchema),  // this will resolve the issue and display the message (err)
        defaultValues:{
            name:"",
            imageUrl:"",
        }
    });


useEffect(()=>{
    setIsMounted(true)
},[])


    const isLoading = form.formState.isSubmitting; // this will return a boolean if the form is submitting 



    const onSubmit  = async (values:z.infer<typeof formSchema>) => {
        
       try{

        axios.post('/api/servers',values)  // onClick this will navigate to the page
         form.reset()
         router.refresh()
         window.location.reload();

       }
       catch(e)
       {
        console.log("error : " + e)
       }
    }

    if(!isMounted)
    {
        return null;
    }

    return ( <div>
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6 ">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize your Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                    Give Your server a personality with name
                    </DialogDescription>
                    </DialogHeader>

                    {/* there the Form start  I have to learn shadcn*/} 
                    {/* add props of a html form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                    control={form.control}
                                    name="imageUrl"  // this tell what passes as field
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload 
                                                endpoint="serverImage"  // img for server
                                                value={field.value}        // url of the image 
                                                onChange={field.onChange}   // onChange
                                                />
                                            </FormControl>
                                  
                                        </FormItem> 
                                        )}
                                     />
                            </div>
                            
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel className="uppercase test-xs font-bold text-zinc-500 dark:text-secondary/70">Server Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} 
                                                    className="bg-zinc-300/50 border-0 
                                                    focus-visible:ring-0 text-black
                                                    focus-visible:ring-offset-0"
                                                    placeholder="Enter Server Name"
                                                    {...field} />
                                                       

                                   
                                        </FormControl>

                                        {/* this is the validation in shadcn form */}
                                        <FormMessage /> 
                                    </FormItem>
                                 

                                )}

                            />

                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading} variant={"primary"}>Create</Button>
                        </DialogFooter>
                        </form>
                    </Form>
            </DialogContent>
        </Dialog>
    </div> );
}
 
