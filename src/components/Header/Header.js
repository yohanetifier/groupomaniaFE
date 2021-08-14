import logo from '../../assets/logos/icon-left-font-monochrome-white.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

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

function Header() {

  const id = useParams()
  const home = 'Accueil'
  const account = 'Mon compte'
 

  return (
    <div>
      <Container>
        <Logo src={logo} />
        <Menu>
          <Link to={`/publication/${localStorage.getItem('userId')}`}>
          Publication 
          </Link>
          <Link to={`/home/${localStorage.getItem('userId')}`}>
            <List>{home}</List>
          </Link>
          <Link to={`/profile/${localStorage.getItem('userId')}`}>
            <List>{account}</List>
          </Link>
        </Menu>
      </Container>
    </div>
  )
}

export default Header
