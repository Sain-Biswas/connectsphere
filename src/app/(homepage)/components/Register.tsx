'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover } from '@/components/ui/popover';
import { RadioGroup } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { CalendarIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { RadioGroupItem } from '@radix-ui/react-radio-group';
import axios from 'axios';
import { format } from 'date-fns';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Email from '@/resources/Icons/Email';
import Gender from '@/resources/Icons/Gender';
import Person from '@/resources/Icons/Person';


const registerSchema = z.object({
    firstName: z.string({
        required_error: 'First Name is Required.'
    }),
    userName: z.string({
        required_error: 'Username is Required.'
    }),
    lastName: z.string({
        required_error: 'Last Name is Required.'
    }),
    password: z.string().min(6, {
        message: 'Password must be between 6 to 20 characters.'
    }).max(20, {
        message: 'Password must be between 6 to 20 characters.'
    }),
    dateOfBirth: z.date({
        required_error: 'Date of Birth is required.'
    }),
    gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Select an option to proceed.'
    })
});

type registerFormType = z.infer<typeof registerSchema>

const Register = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const registerForm = useForm<registerFormType>({
        resolver: zodResolver(registerSchema),
    })
    async function onRegisterSubmit(values: registerFormType) {
        setIsUploading(true);
        await axios.post('/api/register', {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.userName,
            password: values.password,
            gender: values.gender,
            dateOfBirth: values.dateOfBirth,
        })
            .then((res) => toast.success('Account created Successfully.'))
            .catch((err) => toast.error("Server Error."))
            .finally(() => setIsUploading(false))
    }

    return (
        <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className='w-full'>
                <div className='grid grid-cols-2 my-2 gap-2'>
                    <FormField
                        control={registerForm.control}
                        name='firstName'
                        render={({ field }) => (
                            <div className='rounded-xl p-1 w-full dark:bg-card ring-1 flex justify-center items-center'>
                                <FormItem className='px-4 flex-grow'>
                                    <FormLabel className='p-0 m-0 h-1 text-xs'>First Name</FormLabel>
                                    <FormControl className='m-0 p-0'>
                                        <Input className='border-none h-5 shadow-none focus-visible:ring-0' placeholder='First Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                <Person className='mr-1' />
                            </div>
                        )}
                    />
                    <FormField
                        control={registerForm.control}
                        name='lastName'
                        render={({ field }) => (
                            <div className='rounded-xl p-1 w-full dark:bg-card ring-1 flex justify-center items-center'>
                                <FormItem className='px-4 flex-grow'>
                                    <FormLabel className='p-0 m-0 h-1 text-xs'>Last Name</FormLabel>
                                    <FormControl className='m-0 p-0'>
                                        <Input className='border-none h-5 shadow-none focus-visible:ring-0' placeholder='Last Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                <Person className='mr-1' />
                            </div>
                        )}
                    />
                </div>
                <FormField
                    control={registerForm.control}
                    name='userName'
                    render={({ field }) => (
                        <div className='rounded-xl p-1 w-full dark:bg-card ring-1 flex justify-center items-center'>
                            <FormItem className='px-4 flex-grow'>
                                <FormLabel className='p-0 m-0 h-1 text-xs'>Username</FormLabel>
                                <FormControl className='m-0 p-0'>
                                    <Input className='border-none h-5 shadow-none focus-visible:ring-0' placeholder='Username' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            <Email className='mr-1' />
                        </div>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name='password'
                    render={({ field }) => (
                        <div className='my-2 rounded-xl p-1 w-full dark:bg-card ring-1 flex justify-center items-center'>
                            <FormItem className='px-4 flex-grow'>
                                <FormLabel className='text-xs'>Password</FormLabel>
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
                                onClick={() => setShowPassword(current => !current)}
                            >
                                {
                                    (showPassword) ? <EyeOpenIcon /> : <EyeClosedIcon />
                                }
                            </Button>
                        </div>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name='dateOfBirth'
                    render={({ field }) => (
                        <FormItem className='dark:bg-card ring-1 px-4 py-1 rounded-xl'>
                            <FormLabel className='text-xs'>Date of Birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant='ghost'
                                            className={cn('w-full bg-transparent hover:bg-transparent text-black dark:text-white pl-4 text-left flex justify-between font-semibold')}
                                        >
                                            {
                                                field.value ? (
                                                    format(field.value, 'PPP')) : (<span>Choose your date of birth</span>)
                                            }
                                            <CalendarIcon className='' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className='' align='start'>
                                    <Calendar
                                        mode='single'
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date > new Date()}
                                        className='rounded-xl border border-slate-600 dark:border-darkmode-400'
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name='gender'
                    render={({ field }) => (
                        <FormItem className='dark:bg-card ring-1 rounded-xl my-2 p-1'>
                            <FormLabel className='flex gap-3 items-center'>
                                <p className='pl-4 text-sm'>Gender</p>
                                <Gender className='' />
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex justify-around p-1"
                                >
                                    <FormItem className={cn('py-1 px-3 rounded-lg', (field.value === 'male') && 'bg-primary')}>
                                        <FormControl>
                                            <RadioGroupItem value="male" />
                                        </FormControl>
                                        <FormLabel className="font-mono">
                                            Male
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className={cn('py-1 px-3 rounded-lg', (field.value === 'female') && 'bg-primary')}>
                                        <FormControl>
                                            <RadioGroupItem value="female" />
                                        </FormControl>
                                        <FormLabel className="font-mono">
                                            Female
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className={cn('py-1 px-3 rounded-lg', (field.value === 'other') && 'bg-primary')}>
                                        <FormControl>
                                            <RadioGroupItem value="other" />
                                        </FormControl>
                                        <FormLabel className="font-mono">Others</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isUploading} type='submit' size='lg' className='text-lg font-mono w-full'>Register</Button>
            </form>
        </Form>
    )
}

export default Register