import Header from '../Header/Header'
import styled from 'styled-components'
import { useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

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
text-align: center; 
`

const FifthContainer = styled.div`
width: 100%; 
display: flex; 
justify-content: space-around;
`

const Button = styled.button`
cursor: pointer;
width: 150px; 
height: 50px; 
border-radius: 5px; 
background-color: white; 
box-shadow: 2px 2px 2px 2px grey; 
transition: transform 200ms;
&:hover{
    transform: translateY(5px);
}
`

function DeleteProfile() {
    const history = useHistory()
    const [answer, setAnswer ] = useState(false)
    const id = useParams()

        if(answer){
            fetch('http://localhost:3000/api/auth/deleteprofile/'+ id.id, {
                method: 'DELETE'
            })
            .then((res) => res.json())
            .then((result) => console.log(result))
            history.push('/')
        }



  return (
    <div>
      <Header />
      <MainContainer>
        <SecondContainer>
          <Link to={`/profile/${id.id}`}>Modifier le profil</Link>
          <Link to={`/changepassword/${id.id}`}>changer le mot de passe</Link>
          <Link>Supprimer mon compte</Link>
        </SecondContainer>
        <ThirdContainer>
          <FourthContainer>
            <h1>Suppression du compte</h1>
            <h2>Êtes vous sur de vouloir supprimer votre compte?</h2>
            <p>(Cette action est irréversible)</p>
          </FourthContainer>
          <FifthContainer>
            <Button onClick={() => setAnswer(true)}>oui</Button>
            <Button onClick={() => history.push('/home/'+id.id)}>non</Button>
          </FifthContainer>
        </ThirdContainer>
      </MainContainer>
    </div>
  )
}

export default DeleteProfile
