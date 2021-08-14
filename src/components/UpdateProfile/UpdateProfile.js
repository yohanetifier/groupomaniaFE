import Header from '../Header/Header'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 500px;
  border: 1px solid grey;
`

const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid grey;
  width: 20%;
`

const ThirdContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 40%;
`

const FourthContainer = styled.div`
  display: flex;
`

const FifthContainer = styled.div``

const SixthContainer = styled.div`
  display: flex;
`

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`

const Label = styled.label`
  width: 10%;
`

const Textarea = styled.textarea`
  width: 70%;
`

const SubmitButton = styled.button`
  width: 40%;
  height: 5%;
  margin-left: 50px;
`

const SeventhContainer = styled.div`
display: flex; 
align-items: center; 
`

const OldBio = styled.div`
margin-right: 10px;
`
const Mail = styled.p`
margin-right: 10px; 
`

function UpdateProfile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const id = useParams()
  const [userDatas, setUserDatas] = useState({})
  const [img, setImg] = useState()
  const [preview, setPreview] = useState('')
  const [url, setUrl] = useState()

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/update/` + id.id).then((res) =>
      res
        .json()
        .then((userDatas) => {
          setUserDatas(userDatas)
        })
        .catch((error) => console.log(error))
    )
  }, [id.id])

  const onSubmit = (data) => {
    const formData = new FormData()
    if (img){
      formData.append('avatar', img)
    }

    if(data.bio){
      formData.append('bio', data.bio)
    }


    /* formData.append('bio', data.bio) */
    /* img ? (formData.append('avatar', img)) */
    /* formData.append('avatar', img) */
    fetch('http://localhost:3000/api/auth/modify/' + id.id, {
      method: 'PUT',
      body: formData,
    })
      .then(function (res) {
        if (res.ok) {
          return res.json()
        }
      })
      .then((result) => {
        console.log(result)
      })
  }

  function handleChange(e) {
    const files = e.target.files[0]
    setImg(files)
    const preview = URL.createObjectURL(files)
    setPreview(preview)
  }

  return (
    <div>
      <Header />
      <MainContainer>
        <SecondContainer>
          <Link>Modifier le profil</Link>
          <Link to={`/changepassword/${id.id}`}>changer le mot de passe</Link>
          <Link to={`/deleteprofile/${id.id}`}>Supprimer mon compte</Link>
        </SecondContainer>
        <ThirdContainer onSubmit={handleSubmit(onSubmit)}>
          <FourthContainer>
            <Img src={preview ? (preview) : (userDatas.avatar)} />
            <FifthContainer>
              <h1>
                {userDatas.prenom} {userDatas.nom}
              </h1>
              <input
                type="file"
                accept="image/*"
                {...register('avatar')}
                onChange={(e) => handleChange(e)}
              ></input>
            </FifthContainer>
          </FourthContainer>
          <SixthContainer>
            <Mail>Mail: </Mail>
            <p>{userDatas.email}</p>
          </SixthContainer>
          <SeventhContainer>
          <OldBio>Ancienne bio: </OldBio>
          <p>{userDatas.bio}</p>
          </SeventhContainer>
          <SixthContainer>
            <Label>bio</Label>
            <Textarea type="text" {...register('bio')}></Textarea>
          </SixthContainer>
          <SubmitButton type="submit">Envoyer</SubmitButton>
        </ThirdContainer>
      </MainContainer>
    </div>
  )
}

export default UpdateProfile
