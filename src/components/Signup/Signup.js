import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useHistory, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import logo from '../../assets/logos/icon-left-font-monochrome-black.png'

const Img = styled.img`
  height: 100px;
  text-align: center;
`
const ContainerLogo = styled.div`
display: flex; 
justify-content: center;
`

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 610px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30%;
  height: 100%;
  box-shadow: 3px 3px 3px 3px grey;
  border-radius: 10px;
  min-width: 300px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`
const Input = styled.input`
  width: 90%;
  height: 30px;
  margin-left: 20px;
  border: 1px solid #dddfe2;
  border-radius: 5px;
  outline-style: none;
`
const ButtonSubmit = styled(Button)`
  width: 90%;
`
const FirstContainer = styled.div`
  border-bottom: 1px solid grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -50px;
`
const Title = styled.h1``
const Sentence = styled.p`
  margin-top: -10px;
  color: #a4a8ad;
`
const AlreadyHaveAccount = styled(Link)`
  text-decoration: none;
  color: #1877f2;
  text-align: center;
`
const SecondContainer = styled.div`
  display: flex;
  justify-content: center;
`
const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`

const authentication = {
  isLoggedIn: false,
  onAuthentication() {
    this.isLoggedIn = true
  },
  getLoginStatus() {
    return this.isLoggedIn
  },
}

function Signup() {
  const history = useHistory()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => {
    fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
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
        if (result) {
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
                authentication.onAuthentication()
                localStorage.setItem('userId', result.userId)
                localStorage.setItem('token', result.token)
                history.push(`/updateprofile/${result.userId}`)
              }
            })
        }
      })
  }

  /* const password = document.getElementById('password').value
    const confirmpassword = document.getElementById('confirmpassword').value
    const match = password === confirmpassword */

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ContainerLogo>
          <Img src={logo} />
        </ContainerLogo>
        <FirstContainer>
          <Title>Créer un compte</Title>
          <Sentence>C'est rapide et facile</Sentence>
        </FirstContainer>
        <Container>
          <Label>Nom: </Label>
          <Input
            type="text"
            {...register('nom', {
              required: true,
              pattern: /^[a-zA-Z]{3,20}$/,
            })}
          ></Input>
        </Container>
        <Container>
          <Label>Prénom: </Label>
          <Input
            type="text"
            {...register('prenom', {
              required: true,
              pattern: /^[a-zA-Z]{3,20}$/,
            })}
          ></Input>
        </Container>
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
            id="password"
            type="password"
            {...register('password', {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            })}
          ></Input>
        </Container>
        <Container>
          <Label>Confirmer le mot de passe: </Label>
          <Input
            id="confirmpassword"
            type="password"
            {...register('confirmpassword', { required: true })}
          ></Input>
          {/* {!match && <span>Password not matched</span>} */}
        </Container>
        <ContainerButton>
          <ButtonSubmit type="submit" variant="contained" color="primary" >
            S'inscrire
          </ButtonSubmit>
        </ContainerButton>
        <SecondContainer>
          <AlreadyHaveAccount to="/login">
            Vous avez déjà un compte?
          </AlreadyHaveAccount>
        </SecondContainer>
      </Form>
    </MainContainer>
  )
}

export default Signup
