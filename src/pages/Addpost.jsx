import React from 'react'
import Container from '../components/Container'
import Postform  from '../components/post-form/Postform'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <Postform />
        </Container>
    </div>
  )
}

export default AddPost