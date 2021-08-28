import logo from '../../assets/logos/icon-left-font-monochrome-white.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.nav`
  display: flex;
  align-items: center; 
  background-color: #102341; 
  height: 150px; 
`

const Logo = styled.img`
  height: 200px;
  width: 300px;
  color: black;
`

const Menu = styled.ul`
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  @media (max-width: 375px){
    display: none;
  }
`

const List = styled.li`
  list-style-type: none; 
  color: white; 
`

function HeaderConnectionPage() {
  const signIn = "S'inscrire"
  const logIn = 'Se connecter'
  return (
      <div>
    <Container>
      <Logo src={logo} />,
      
    </Container>
    
    </div>
  )
}

export default HeaderConnectionPage
