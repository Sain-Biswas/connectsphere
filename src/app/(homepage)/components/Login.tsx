'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Person from '@/resources/Icons/Person';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';


const loginSchema = z.object({
    userName: z.string({
        required_error: "Username can't be empty."
    }),
    password: z.string({
        required_error: "Password can't be empty."
    }),
});

type loginFormType = z.infer<typeof loginSchema>

const Login = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const loginForm = useForm<loginFormType>({
        resolver: zodResolver(loginSchema),
    })
    function onLoginSubmit(values: loginFormType) {
        setIsUploading(true);
        const email = values.userName;
        const password = values.password;

        signIn('credentials', {
            email,
            password,
            redirect: false
        }).then((callback) => {
            if (callback?.error) {
                toast.error("Credentials Wrong.")
            }

            if (callback?.ok && !callback.error) {
                toast.success("Logged In Successfully.");
                router.push('/home');
            }
        }).finally(() => {
            setIsUploading(false);
        })
    }

    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className='font-mono'>
                <FormField
                    control={loginForm.control}
                    name='userName'
                    render={({ field }) => (
                        <div className='my-2 rounded-xl p-1 w-full bg-card ring-1 flex justify-center items-center'>
                            <FormItem className='px-4 flex-grow'>
                                <FormLabel className='p-0 m-0 h-1 text-sm'>Username</FormLabel>
                                <FormControl className='m-0 p-0'>
                                    <Input className='border-none h-5 shadow-none focus-visible:ring-0' placeholder='Username' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            <Person className='mr-1' />
                        </div>
                    )}
                />
                <FormField
                    control={loginForm.control}
                    name='password'
                    render={({ field }) => (
                        <div className='my-2 rounded-xl p-1 w-full bg-card ring-1 flex justify-center items-center'>
                            <FormItem className='px-4 flex-grow'>
                                <FormLabel className='text-sm'>Password</FormLabel>
                                <FormControl className='m-0 p-0'>
                                    <Input
                                        className='border-none h-5 shadow-none focus-visible:ring-0'
                                        placeholder='Password'
                                        type={(showPassword) ? 'text' : 'password'}
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            <Button
                                size='icon'
                                variant='ghost'
                                onClick={(e: any) => {
                                    e.preventDefault()
                                    setShowPassword(current => !current)
                                }}
                            >
                                {
                                    // (showPassword) ? <EyeOpenIcon /> : <EyeClosedIcon />
                                }
                            </Button>
                        </div>
                    )}
                />
                <Button disabled={isUploading} type='submit' size='lg' className='text-lg font-mono w-full'>Log in</Button>
            </form>
        </Form>
    )
}

export default Login