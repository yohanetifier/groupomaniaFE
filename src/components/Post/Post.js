import Header from '../Header/Header'
import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {useParams } from 'react-router-dom'
import {makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader' 
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import  Typography  from '@material-ui/core/Typography'
import {blue } from '@material-ui/core/colors'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
/* import MoreVertIcon from '@material-ui/icons/MoreVert' */

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  }, 
  media: {
    height: '300px',
    paddingTop: '56,25%', 
  }, 
  avatar: {
    backgroundColor: blue[500]
  }
}))

const MainContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 500px;
  @media (max-width: 900px){
    flex-direction: column-reverse; 
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%; 
  height: 100%; 
`

const SubmitButton = styled(Button)`
  width: 30%;
  cursor: pointer; 
`

const FirstContainer = styled.div`
display: flex;
width: 30%; 
min-width: 280px; 
height: 35%; 
border: 1px solid #dddfe2;
border-radius: 10px; 
box-shadow: 2px 2px 2px 2px grey; 
@media(max-width: 900px){
  margin: 20px 0px 20px 0px; 
}
`

const Textarea = styled.textarea`
border-radius: 5px; 
width: 100%; 
height: 100%; 
outline: none; 
border: 1px solid #dddfe2;
`

const Img = styled.img`
  width: 50%; 
`

const SecondContainer = styled.div`
`
const Input = styled.input`
position: absolute; 
  width: 100%;
  height: 100%; 
  top: 0; 
  left: 0; 
  opacity: 0; 
  cursor: pointer; 
`
const ThirdContainer = styled.div`
position: relative; 
& > Button{
  width: 100%; 
  opacity: 1; 
}
`
const ImgAvatar = styled.img`
width: 100%;
height: 100%; 
`

/* const AddImage = styled.button`
  display: inline-block;
  background: #303F9F;
  color: white;
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  opacity: 1; 
  white-space: nowrap;
  -webkit-user-select: none;
  font-weight: 300;
  font-size: 10pt;
  width: 100%; 
  cursor: pointer;
` */

function Post() {

  const classes = useStyles()
  const [description, setDescription ] = useState('')
  const [userDatas, setUserDatas] = useState({})
  const [ img, setImg ] = useState()
  const [ preview, setPreview ] = useState()
  const { register, formState: {errors}, handleSubmit } = useForm()
  const resetInput = useRef('')
  const resetFile = useRef('')
  const id = useParams()

  const handleResetInput = () => {
    resetInput.current.value = ''
    resetFile.current.value = ''
    setPreview('')
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/update/` + id.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) =>
      res
        .json()
        .then((userDatas) => setUserDatas(userDatas))
        .catch((error) => console.log(error))
    )
  }, [id])

  const handleChange = (e) => {
    const files = e.target.files[0]
    setImg(files)
    const img = URL.createObjectURL(files)
    setPreview(img)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }
  
  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('description', data.description)
    formData.append('avatar', img)
    formData.append('user_id', id.id)
    fetch('http://localhost:3000/api/post/', {
      method:'POST', 
      body: formData, 
      headers: { 
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(function(res) {
      if (res.ok){
        return res.json()
      }
    })
    .then(result => handleResetInput())
  }

  return (
    <div>
      <Header />
      
      <MainContainer>
      <Card className={classes.root}>
          <CardHeader
          avatar = {
            <Avatar className = {classes.avatar}>
              {/* {userDatas.prenom ? userDatas.prenom.slice(0,1).toUpperCase() : userDatas.prenom} */}
              {/* {preview ? (<Img src={preview}/>) : (userDatas.avatar)} */}
              {userDatas.avatar && <ImgAvatar src={userDatas.avatar}/>}
              
              
            </Avatar>
          }
          title={`${userDatas.prenom} ${userDatas.nom}`}
        subheader={Date()}
        />
        {preview && <CardMedia className = {classes.media}
        image={preview}
        />}
        
        <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {userDatas.prenom} {userDatas.nom} {description ? description : 'description'}
        </Typography>
        </CardContent>
           </Card>
        
        <FirstContainer>
          {/* <Img src={preview} /> */}
          <Form onSubmit={handleSubmit(onSubmit)} method='POST'>
            <ThirdContainer>
            <Button variant="contained" color="primary">Selectionner une image</Button>
            <Input type="file" {...register('avatar')} onChange={(e) => handleChange(e)} ref={resetFile} ></Input>
            </ThirdContainer>
            <SecondContainer>
              <Textarea  type="text" placeholder="description" {...register('description')} onChange={(e) => handleDescriptionChange(e)} ref={resetInput} ></Textarea>
            </SecondContainer>
            <SubmitButton type="submit" color="primary" variant="contained"> Publier</SubmitButton>
          </Form>
        </FirstContainer>
      </MainContainer>
    </div>
  )
}

export default Post
