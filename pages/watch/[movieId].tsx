import React from 'react'
import { useRouter } from 'next/router'
import useMovie from '@/hooks/useMovie'
import Head from 'next/head'

import {AiOutlineArrowLeft} from 'react-icons/ai'


const Watch = () => {

    const router = useRouter()
    const { movieId } = router.query
    const { data } = useMovie(movieId as string)

    return (
        <>
        <Head>
            <title>Netflix | Watching {data?.title}</title>
        </Head>
            <div className='h-screen w-screen bg-black'>
                <nav className='
                        z-10

                        fixed
                        w-full
                        p-4
                        flex
                        items-center
                        gap-8
                        bg-black
                        bg-opacity-70
                        '>
                        <AiOutlineArrowLeft onClick={() => router.push('/')} className='text-white  cursor-pointer' size={40} />
                        <p className='text-white text-xl md:text-3xl font-bold'>
                            <span className='font-light'>
                                Watching:
                            </span>
                            {data?.title}
                        </p>
                </nav>
                <video 
                autoPlay
                controls
                className='h-full w-full'
                src={data?.videoUrl}
                />
            </div>
        </>
    )
}

export default Watch