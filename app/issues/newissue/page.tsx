'use client';

import { Button, Callout, TextField } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useState } from 'react';

interface IssueForm {
    title: string;
    description: string;
}

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()
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
                <Button >Submit</Button>
            </form >
        </div>
    )
}

export default NewIssuePage