'use client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Label } from '@/components/ui/label';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Image from 'next/image';
import React, { FormEvent, SyntheticEvent, useState } from 'react'
import { toast } from 'sonner';
import { promise } from 'zod';

const Page = () => {
    const [imageFile, setImageFile] = useState<any>([]);
    const [imageURL, setImageURL] = useState<string[]>([]);
    const [description, setPostText] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);

    function imageChange(e: any) {
        e.preventDefault();
        setImageURL(Array.from(e.target.files).map((image: any) => URL.createObjectURL(image)))
        setImageFile(Array.from(e.target.files));
    }

    async function UploadPost() {
        setIsUploading(true);
        try {
            const media = await Promise.all(imageFile.map((image: any) => {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("upload_preset", "tpu3rl2k");

                return axios.post("https://api.cloudinary.com/v1_1/dxviiza2m/image/upload", formData)
                    .then((res: AxiosResponse) => res.data.secure_url)
                    .catch((err) => toast.error("Can't upload image", {
                        description: <p>{err.toString()}</p>,
                    }))
            }));

            await axios.post('/api/post', { media, description })
                .then((response: AxiosResponse) => toast.success("Post created successfully"))
                .catch((error: AxiosError) => toast.error("Post creation Failed"))
                .finally(() => setIsUploading(false));

            setPostText('');
            setImageFile([]);
            setImageURL([]);
        } catch (error: any) {
            toast.error("Can't create a post");
            setIsUploading(false);
        }

    }

    return (
        <div className='p-2 flex flex-col md:flex-row gap-3 justify-center items-center min-h-[calc(100vh-4.5rem)]'>
            <Card className='w-96'>
                <CardHeader>
                    <CardTitle>
                        New Post
                    </CardTitle>
                </CardHeader>
                {(imageURL.length > 0) && <CardContent className='w-full flex justify-center'>
                    <Carousel className="w-64">
                        <CarouselContent>
                            {imageURL.map((image: any, index: number) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <AspectRatio ratio={16 / 9} className="bg-muted">
                                            <Image
                                                src={image}
                                                alt="Photo by Drew Beamer"
                                                fill
                                                className="rounded-md object-cover"
                                            />
                                        </AspectRatio>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </CardContent>}
                <CardFooter className=' flex-col gap-6'>
                    <Label htmlFor='images' className='p-2 rounded-md bg-accent mx-auto'>Upload Images</Label>
                    <input type="file" disabled={isUploading} id="images" name="fimages" onChange={imageChange} multiple accept="image/*,video/*" className='hidden' />
                    <textarea disabled={isUploading} value={description} className='bg-accent rounded-md ring-2 w-full p-2' placeholder='Enter Post description.....' autoComplete='off' onInput={(event: FormEvent<HTMLTextAreaElement>) => setPostText(event.currentTarget.value)} />
                </CardFooter>
                <CardFooter className='flex-row-reverse'>
                    <Button className='' onClick={UploadPost} disabled={isUploading}>
                        {
                            isUploading && <div className='h-5 w-5 border-t-2 animate-spin px-2 border-white rounded-full'></div>
                        }
                        Create Post
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page