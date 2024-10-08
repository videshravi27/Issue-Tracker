'use client';

import { Button, TextField } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

interface IssueForm {
    title: string;
    description: string;
}

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()

    return (
        <form className='space-y-3 max-w-xl'
            onSubmit={handleSubmit(async (data) => {
                try {
                    console.log("Data being submitted:", data);
                    await axios.post('/api/issues', data)
                    router.push('/issues');
                } catch (error) {
                    console.error("Error submitting the issue:", error);
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
    )
}

export default NewIssuePage