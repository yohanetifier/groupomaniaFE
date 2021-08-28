import logo from '../../assets/logos/icon-left-font-monochrome-white.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router-dom'
import { useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import HomeIcon from '@material-ui/icons/Home'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #102341;
  height: 100px;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    height: 100px;
  }
`

const Logo = styled.img`
  height: 200px;
  width: 20%;
  color: black;
  @media (max-width: 900px) {
    height: 50%;
    width: 20%;
  }
`

const Nav = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  @media (max-width: 900px) {
    width: 85%;
    height: 50%;
    align-items: center;
    margin-right: 20px;
  }
`

const List = styled.li`
  list-style-type: none;
  color: white;
`
const ButtonHomeIcon = styled(HomeIcon)`
  color: white;
`
const ButtonAccountCircleIcon = styled(AccountCircleIcon)`
  color: white;
`
const ButtonAddAPhotoIcon = styled(AddAPhotoIcon)`
  color: white;
`
const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
`
const UpdateProfile = styled(Link)`
text-decoration: none; 
color: black; 
`
const MyAccount = styled.p`
color: white; 
`
const authentication = {
  isLoggedIn: false,
  onAuthentication() {
    this.isLoggedIn = true
  },
  Disconnect() {
    this.isLoggedIn = false
  },
  getLoginStatus() {
    return this.isLoggedIn
  },
}

function Header() {
  const id = useParams()
  const home = 'Accueil'
  const account = 'Mon compte'
  const history = useHistory()
  const MobileResponsiveDesign = useMediaQuery('(max-width: 600px)')
  const [anchorEl, setAnchorEl] = useState(null)
  function handleDisconnect() {
    authentication.Disconnect()
    localStorage.clear()
    history.push('/login')
  }
  const handleClick = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Container>
        <Logo src={logo} />
        <Nav>
          <MenuLink to={`/home/${localStorage.getItem('userId')}`}>
            {MobileResponsiveDesign ? <ButtonHomeIcon /> : 'Accueil'}
          </MenuLink>
          <MenuLink to={`/publication/${localStorage.getItem('userId')}`}>
            {MobileResponsiveDesign ? (
              <ButtonAddAPhotoIcon color="white" />
            ) : (
              'Publication'
            )}
          </MenuLink>
          {/* <MenuLink to={`/profile/${localStorage.getItem('userId')}`}>
              {MobileResponsiveDesign ? (<ButtonAccountCircleIcon/>) : ('Mon compte')}
            </MenuLink> */}
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{MobileResponsiveDesign ? (<ButtonAccountCircleIcon/>) : (<MyAccount>Mon compte</MyAccount>)}</Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose}><UpdateProfile to={`/updateprofile/${localStorage.getItem('userId')}`}>Modifier le profil</UpdateProfile></MenuItem>
              <MenuItem onClick={handleClose}><Button onClick={() => handleDisconnect()}>Deconnexion</Button></MenuItem>
            </Menu>
        </Nav>
      </Container>
    </div>
  )
}

export default Header
