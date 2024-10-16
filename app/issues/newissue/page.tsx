'use client';

import { Button, Callout, TextField, Text } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { valid } from '@/app/valid';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof valid>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(valid)
    })
    const [error, setError] = useState('')

    return (
        <div className='max-w-xl'>
            {error && (
                <Callout.Root color='red' className='mb-2'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            )}
            <form className='space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push('/issues');
                    } catch (error) {
                        setError('An error occurred while submitting the form')
                    }
                })}>
                <TextField.Root placeholder="Title" {...register('title')}>
                </TextField.Root>
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => <SimpleMDE
                        placeholder="Enter your issue..."
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                    />}
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button >Submit</Button>
            </form >
        </div>
    )
}

export default NewIssuePage