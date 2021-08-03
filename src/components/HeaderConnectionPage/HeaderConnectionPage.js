import logo from '../../assets/logos/icon-left-font-monochrome-white.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #102341; 
`

const Logo = styled.img`
  height: 200px;
  width: 300px;
  color: black;
`

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 20%;
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
      <Menu>
        <Link to="/"><List>{signIn}</List></Link>
        <Link to="/login"><List>{logIn}</List></Link>
      </Menu>
    </Container>
    
    </div>
  )
}

export default HeaderConnectionPage
