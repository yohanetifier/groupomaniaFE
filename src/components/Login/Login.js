import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useHistory, Route, Redirect } from 'react-router-dom'

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
  height: 20px;
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

export function SecuredRoute({ children, ...rest }) {
  if (authentication.isLoggedIn === true) {
    return <Route {...rest}>{children}</Route>
  } else {
    return <Redirect to="/login"></Redirect>
  }
}

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
          authentication.onAuthentication()
          localStorage.clear()
          localStorage.setItem('userId', result.userId)
          localStorage.setItem('token', result.token)
          history.push(`/home/${result.userId}`)
        }
      })
  }

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit)} method="POST">
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
        <Button type="submit"></Button>
      </Form>
    </MainContainer>
  )
}

export default Login
