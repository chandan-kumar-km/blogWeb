import React, { useState, useEffect } from 'react'
import Container from '../components/Container'
import PostCard from '../components/Postcard'
import service from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts().then((post) => {
            if (post) {
                setPosts(post.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.length == 0 && (
                            <h1 className='text-center'>upload post to Display</h1>
                        )
                    }
                    {
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPosts