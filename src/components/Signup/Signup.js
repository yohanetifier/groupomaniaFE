import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30%;
  height: 100%;
  box-shadow: 3px 3px 3px 3px grey;
  margin-top: 20px;
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
  margin-left: 20px;
`
const Button = styled.input`
  width: 92%;
  margin-left: 20px;
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
          localStorage.clear()
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
        <Container>
          <Label>Nom: </Label>
          <Input
            type="text"
            {...register('nom', {
              required: true,
              pattern: /^[a-zA-Z]{3,20}$/,
            })}
          ></Input>
          {errors.nom ? (
            <span> Les données ne sont pas valides</span>
          ) : (
            <span> Les données sont valides </span>
          )}
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
        <Button type="submit" value="s'enregistrer"></Button>
      </Form>
    </MainContainer>
  )
}

export default Signup
