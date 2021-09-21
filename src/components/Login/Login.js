import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useHistory, Route, Redirect, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import logo from '../../assets/logos/icon-left-font-monochrome-black.png'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 610px;
`
const Img = styled.img`
  height: 100px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30%;
  height: 100%;
  box-shadow: 3px 3px 3px 3px grey;
  margin-top: 20px;
  border-radius: 10px;
  min-width: 300px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Label = styled.label`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`
const Input = styled.input`
  width: 90%;
  height: 30px;
  border: 1px solid #dddfe2;
  border-radius: 5px;
  outline-style: none;
  &:invalid{
    border: 2px solid red; 
  }
`

const ButtonSubmit = styled(Button)`
  width: 90%;
`

const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`

const Logo = styled.img`
  margin-top: 20px;
  height: 100%;
  width: 50%;
`
const AlertInfo = styled(Alert)`
  display: flex;
  justify-content: center;
  width: 80%;
`

const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h1`
  width: 100%;
  text-align: center;
`
const ThirdContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const FourthContainer = styled.div`
  border-top: 1px solid grey;
  height: 2px;
  width: 40%;
`
const ContainerOr = styled.p`
  width: 10%;
  text-align: center;
`

function Login() {
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const onSubmit = (data) => {
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (res) {
        if (res.ok) {
          return res.json()
        }
      })
      .then((result) => {
        if (result) {
          
          localStorage.setItem('userId', result.userId)
          localStorage.setItem('token', result.token)
          history.push(`/home/${result.userId}`)
        }
      })
  }

  return (
    <MainContainer>
      <Img src={logo} />
      <Form onSubmit={handleSubmit(onSubmit)} method="POST">
        <SecondContainer>
          <Title>Se connecter à Groupomania</Title>
          <AlertInfo severity="info">
            Vous devez vous connectez pour continuer
          </AlertInfo>
        </SecondContainer>
        <Container>
          <Label>Mail: </Label>
          <Input
            type="text"
            {...register('mail', {
              required: true,
              pattern: /^([\w-.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/i,
            })}
          ></Input>
        </Container>
        <Container>
          <Label>Mot de passe: </Label>
          <Input
            type="password"
            {...register('password', {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
              required: true,
            })}
          ></Input>
        </Container>
        <ContainerButton>
          <ButtonSubmit type="submit" color="primary" variant="contained" >
            Se connecter
          </ButtonSubmit>
        </ContainerButton>
        <ThirdContainer>
          <FourthContainer></FourthContainer>
          <ContainerOr>Ou</ContainerOr>
          <FourthContainer></FourthContainer>
        </ThirdContainer>
        <ContainerButton>
          <ButtonSubmit href="/" color="green" variant="contained">
            Créer un compte
          </ButtonSubmit>
        </ContainerButton>
      </Form>
    </MainContainer>
  )
}

export default Login
