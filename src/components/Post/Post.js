import Header from '../Header/Header'
import styled from 'styled-components'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {useParams } from 'react-router-dom'

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 50%; 
  height: 100%; 
`

const SubmitButton = styled.input`
  width: 30%;
`

const FirstContainer = styled.div`
display: flex;
width: 50%; 
height: 50%; 
border: 1px solid grey; 
`

const Textarea = styled.textarea`
width: 100%; 
height: 100%; 
`

const Img = styled.img`
  width: 50%; 
`

const SecondContainer = styled.div`

`

function Post() {

  const [ img, setImg ] = useState()
  const [ preview, setPreview ] = useState()
  const { register, formState: {errors}, handleSubmit } = useForm()
  const id = useParams()

  const handleChange = (e) => {
    const files = e.target.files[0]
    setImg(files)
    const img = URL.createObjectURL(files)
    setPreview(img)
  }

  
  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('description', data.description)
    formData.append('avatar', img)
    formData.append('user_id', id.id)
    fetch('http://localhost:3000/api/post/', {
      method:'POST', 
      body: formData, 
    })
    .then(function(res) {
      if (res.ok){
        return res.json()
      }
    })
    .then(result => console.log(data))
  }

  return (
    <div>
      <Header />
      <MainContainer>
        <FirstContainer>
          <Img src={preview} />
          <Form onSubmit={handleSubmit(onSubmit)} method='POST'>
            <input type="file" {...register('avatar')} onChange={(e) => handleChange(e)} ></input>
            <SecondContainer>
              <Textarea type="text" placeholder="description" {...register('description')}></Textarea>
            </SecondContainer>
            <SubmitButton type="submit"></SubmitButton>
          </Form>
        </FirstContainer>
      </MainContainer>
    </div>
  )
}

export default Post
