'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { valid } from '@/app/valid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof valid>;

interface Props {
    issue?: Issue
}

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(valid)
    })
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            if (issue)
                await axios.patch('/api/issues/' + issue.id, data);
            else
                await axios.post('/api/issues', data)
            router.push('/issues');
            router.refresh()
        } catch (error) {
            setSubmitting(false);
            setError('An error occurred while submitting the form')
        }
    })

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
                onSubmit={onSubmit}>
                <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register('title')}>
                </TextField.Root>
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
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
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit'}{' '}
                    {isSubmitting && <Spinner />}
                </Button>
            </form >
        </div>
    )
}

export default IssueForm