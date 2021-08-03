import Header from '../Header/Header'
import logo from '../../assets/logos/icon.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


const Img = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
`

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

const FirstContainer = styled.div`
`

const SecondContainer = styled.div`
  margin-left: 100px;
  width: 40%;
`

const ThirdContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30%; 
`

const TitleHone = styled.div``

const UpdateProfile = styled(Link)`
  text-decoration: none;
  color: black;
`

const Settings = styled(Link)`
  text-decoration: none;
  color: black;
`

const NumbersOfPost = styled.p`
text-align: center; 
`
const Bio = styled.p`
height: 30%;
`

function Profil() {

  const id = useParams()
  const [userDatas, setUserDatas] = useState({})
  
  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/update/` + id.id)
    .then((res) => res.json()
    .then(( userDatas) => setUserDatas(userDatas))
    .catch(error => console.log(error))
    )
  }, [id])

  
  return (
    <div>
      <Header />
      <MainContainer>
        <FirstContainer>
          <Img src={logo} />
        </FirstContainer>
        <SecondContainer>
          <ThirdContainer>
            <TitleHone>Firstname and name</TitleHone>
            <UpdateProfile to={`/updateprofile/${id.id}`}>
              Modifier le profil
            </UpdateProfile>
            <Settings to="/settings">Settings</Settings>
          </ThirdContainer>
          <NumbersOfPost>Nombre de publications</NumbersOfPost>
          <Bio>Bio</Bio>
        </SecondContainer>
      </MainContainer>
    </div>
  )
}

export default Profil
