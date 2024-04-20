"use client"

import * as z from "zod"
import { useForm } from "react-hook-form";
import  {zodResolver} from "@hookform/resolvers/zod"


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
        message:"Server Name is required"
    }),
})




export const InitailModal = () => {

    const [isMounted,setIsMounted] = useState(false) // to open/close the modal
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

    const onSubmit  = async (values:z.infer<typeof formSchema>) =>{
        return console.log(values)
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
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                    control={form.control}
                                    name="imageUrl"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload 
                                                endpoint="serverImage" 
                                                value={field.value}
                                                onChange={field.onChange}
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
 
