import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const CreatePost = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axios.post("http://localhost:3000/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate('/feed');
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }



  return (
    <section className='create-post-section'>
        <h1>Create post</h1>


        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" name="image" accept='image/*'/>
            <input type="text" name="caption" placeholder='Enter Caption' required/>
            <button type='submit'> Submit </button>

        </form>

    </section>
  )
}
