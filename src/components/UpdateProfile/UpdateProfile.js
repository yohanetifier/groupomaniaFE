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

function UpdateProfile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const id = useParams()
  const [userDatas, setUserDatas] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/update/` + id.id).then((res) =>
      res
        .json()
        .then((userDatas) => setUserDatas(userDatas))
        .catch((error) => console.log(error))
    )
  }, [id])



  const onSubmit = (data) => {
    fetch('http://localhost:3000/api/auth/modify/' + id.id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (res) {
        if (res.ok) {
          return res.json()
        }
      })
      .then((result) => {
        console.log(data)
      })
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
            <Img src="" />
            <FifthContainer>
              <h1>
                {userDatas.prenom} {userDatas.nom}
              </h1>
              <input type="file" ></input>
            </FifthContainer>
          </FourthContainer>
          <SixthContainer>
            <p>Mail: </p>
            <p>{userDatas.email}</p>
          </SixthContainer>
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
