import Header from '../Header/Header'
import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import Avatar from '@material-ui/core/Avatar'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  height: 100%;
`

const MainContainer = styled.div`
  display: flex;
  width: 60%;
  height: 500px;
  border: 1px solid grey;
  @media (max-width: 900px) {
    flex-direction: column;
    height: 600px;
  }
  @media (max-width: 415px) {
    width: 100%;
    height: 700px;
  }
`

const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid grey;
  width: 30%;
  @media (max-width: 900px) {
    width: 100%;
    height: 20%;
  }
  @media (max-width: 415px) {
    height: 50px;
  }
`

const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  height: 100%;
  @media (max-width: 900px) {
    width: 100%;
  }
  @media (max-width: 415px) {
    width: 100%;
    height: 750px;
  }
`

const ThirdContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 29rem;
  @media (max-width: 415px) {
    height: 620px;
  }
`

const FourthContainer = styled.div`
  display: flex;
  @media (max-width: 415px) {
    flex-direction: column;
    align-items: center;
    height: 40%;
  }
`

const FifthContainer = styled.div`
  @media (max-width: 415px) {
    height: 20%;
    & > h1 {
      font-size: 18px;
      text-align: center;
    }
  }
`

const SixthContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 415px) {
    height: 15%;
  }
`

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
  @media (max-width: 415px) {
    margin-right: 0px;
    width: 80%;
    height: 50%;
  }
`
const StyledTabs = styled(Tabs)``
const StyledTab = styled(Tab)`
  border: 2px solid purple;
`

/* const Label = styled.label`
  width: 10%;
`

const Textarea = styled.textarea`
  width: 70%;
` */

/* const SubmitButton = styled.button`
  width: 40%;
  height: 5%;
  margin-left: 50px;
` */

const SeventhContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 10%;
  @media (max-width: 415px) {
    height: 15%;
  }
`

/* const OldBio = styled.div`
  margin-right: 10px;
`
const Mail = styled.p`
  margin-right: 10px;
` */
const EightContainer = styled.div`
  text-align: center;
`
const NineContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`
const StyledLabel = styled.label`
  font-weight: bold;
  margin-right: 20px;
`
const StyledInput = styled.input`
  width: 90%;
  height: 30px;
  border: 1px solid #dddfe2;
  border-radius: 5px;
  outline-style: none;
`
const Styledh1 = styled.h1`
  text-align: center;
`
const InputContainer = styled.div`
  position: relative;
  & > input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
  & > Button {
    width: 100%;
    opacity: 1;
  }
`

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '100%',
  },
  button: {
    width: '92%',
  },
  buttonMobileDevice: {
    marginTop: '20px',
  },
}))

function UpdateProfile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const id = useParams()
  const history = useHistory()
  const [userDatas, setUserDatas] = useState({})
  const [answer, setAnswer] = useState(false)
  const [oldPassword, setOldPassword] = useState({})
  const [img, setImg] = useState()
  const [preview, setPreview] = useState('')
  const [url, setUrl] = useState()
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const MobileDesign = useMediaQuery('(max-width: 900px)')
  const handleTab = (event, newValue) => {
    setValue(newValue)
  }

  const reset = useRef(null)
  const handleReset = () => {
    reset.current.value = ''
  }

  const password = useRef(null)
  const Opassword = useRef(null)
  const cpassword = useRef(null)
  const handlePassword = () => {
    password.current.value = ''
    Opassword.current.value=''
    cpassword.current.value=''
  }

  /* Appel pour avoir les données de l'utilisateur actuel */

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/update/` + id.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) =>
      res
        .json()
        .then((userDatas) => {
          setUserDatas(userDatas)
        })
        .catch((error) => console.log(error))
    )
  }, [id, userDatas])

  /* Fonction pour changer la bio ou son avatar */

  const onSubmit = (data) => {
    const formData = new FormData()
    if (img) {
      formData.append('avatar', img)
    }

    if (data.bio) {
      formData.append('bio', data.bio)
    }

    /* formData.append('bio', data.bio) */
    /* img ? (formData.append('avatar', img)) */
    /* formData.append('avatar', img) */
    fetch('http://localhost:3000/api/auth/modify/' + id.id, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(function (res) {
        if (res.ok) {
          return res.json()
        }
      })
      .then((result) => {
        handleReset()
      })
  }

  /* Fonction pour enregistrer l'image ou faire un preview */
  function handleChange(e) {
    const files = e.target.files[0]
    setImg(files)
    const preview = URL.createObjectURL(files)
    setPreview(preview)
  }

  /* Fonction pour obtenir l'ancien mot de passe */
  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/getPassword/` + id.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) =>
      res
        .json()
        .then((password) => setOldPassword(password))
        .catch((error) => console.log(error))
    )
  }, [id])

  /* Fonction pour changer le mot de passe  */

  const changePassword = (data) => {
    if (data.password !== data.confirmpassword) {
      console.log('password not confirmed')
    } else {
      fetch('http://localhost:3000/api/auth/changepassword/' + id.id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then(function (res) {
          if (res.ok) {
            return res.json()
          }
        })
        .then((result) => {
          handlePassword()
        })
    }
  }

  /* Fonction pour supprimer le profil */

  if (answer) {
    fetch('http://localhost:3000/api/auth/deleteprofile/' + id.id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
    history.push('/')
  }

  return (
    <div>
      <Header />
      <Container>
        <MainContainer>
          {MobileDesign ? (
            <SecondContainer>
              <Tabs variant="fullWidth" value={value} onChange={handleTab}>
                <Tab icon={<AccountCircleIcon />} {...a11yProps(0)} />
                <Tab icon={<VpnKeyIcon />} {...a11yProps(1)} />
                <Tab icon={<DeleteIcon />} {...a11yProps(2)} />
              </Tabs>
            </SecondContainer>
          ) : (
            <SecondContainer>
              <Tabs
                className={classes.tabs}
                orientation="vertical"
                value={value}
                onChange={handleTab}
              >
                <Tab label="Modifier profil" {...a11yProps(0)} />
                <Tab label="Changer mot de passe" {...a11yProps(1)} />
                <Tab label="Supprimer profil" {...a11yProps(2)} />
              </Tabs>
            </SecondContainer>
          )}
          {/* <SecondContainer>
        <Tabs orientation="vertical" value={value} onChange={handleTab}>
        <Tab label="Modifier le profil" {...a11yProps(0)} />
        <Tab label="Changer le mot de passe" {...a11yProps(1)} />
        <Tab label="Supprimer mon compte" {...a11yProps(2)} />
        </Tabs>
          
        </SecondContainer> */}
          <StyledTabPanel value={value} index={0}>
            <ThirdContainer onSubmit={handleSubmit(onSubmit)}>
              <FourthContainer>
                <Img src={preview ? preview : userDatas.avatar} />
                {/* <Img src={preview ? preview : userDatas.prenom.charAt(0).toUpperCase()} /> */}
                <FifthContainer>
                  <h1>
                    {userDatas.prenom} {userDatas.nom}
                  </h1>
                  <InputContainer>
                    <Button variant="contained" color="primary">
                      Selectionner une image
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      {...register('avatar')}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </InputContainer>
                </FifthContainer>
              </FourthContainer>
              <SixthContainer>
                <StyledLabel>Mail: </StyledLabel>
                <StyledInput value={userDatas.email} disabled></StyledInput>
              </SixthContainer>
              <SeventhContainer>
                <StyledLabel>Ancienne bio: </StyledLabel>
                <StyledInput value={userDatas.bio} disabled></StyledInput>
                {/* <p>{userDatas.bio}</p> */}
              </SeventhContainer>
              <SixthContainer>
                <StyledLabel> Nouvelle bio</StyledLabel>
                <StyledInput
                  type="text"
                  {...register('bio')}
                  ref={reset}
                ></StyledInput>
                {/* <Textarea type="text" {...register('bio')}></Textarea> */}
              </SixthContainer>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
                /* onClick={handleReset} */
              >
                Envoyer
              </Button>
            </ThirdContainer>
          </StyledTabPanel>
          <StyledTabPanel value={value} index={1}>
            <ThirdContainer onSubmit={handleSubmit(changePassword)}>
              <h1>Changer le mot de passe</h1>
              <div>
                <StyledLabel>Ancien mot de passe</StyledLabel>
                <StyledInput
                  type="password"
                  {...register('oldpassword')}
                  ref={Opassword}
                ></StyledInput>
              </div>
              <div>
                <StyledLabel>Nouveau mot de passe</StyledLabel>
                <StyledInput
                  type="password"
                  {...register('password')}
                  ref={password}
                ></StyledInput>
              </div>
              <div>
                <StyledLabel>Confirmer mot de passe</StyledLabel>
                <StyledInput
                  type="password"
                  {...register('confirmpassword')}
                  ref={cpassword}
                ></StyledInput>
              </div>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
              >
                Envoyer
              </Button>
            </ThirdContainer>
          </StyledTabPanel>
          <StyledTabPanel value={value} index={2}>
            <ThirdContainer onSubmit={handleSubmit(changePassword)}>
              <EightContainer>
                <h1>Suppression du compte</h1>
                <h2>Êtes vous sur de vouloir supprimer votre compte?</h2>
                <p>(Cette action est irréversible)</p>
              </EightContainer>
              <NineContainer>
                <Button onClick={() => setAnswer(true)}>oui</Button>
                <Button onClick={() => history.push('/home/' + id.id)}>
                  non
                </Button>
              </NineContainer>
            </ThirdContainer>
          </StyledTabPanel>
          {/* <FourthContainer>
            <Img src={preview ? preview : userDatas.avatar} />
            <FifthContainer>
              <h1>
                {userDatas.prenom} {userDatas.nom}
              </h1>
              <input
                type="file"
                accept="image/*"
                {...register('avatar')}
                onChange={(e) => handleChange(e)}
              ></input>
            </FifthContainer>
          </FourthContainer> 
          <SixthContainer>
            <Mail>Mail: </Mail>
            <p>{userDatas.email}</p>
          </SixthContainer>
          <SeventhContainer>
            <OldBio>Ancienne bio: </OldBio>
            <p>{userDatas.bio}</p>
          </SeventhContainer>
          <SixthContainer>
            <Label>bio</Label>
            <Textarea type="text" {...register('bio')}></Textarea>
          </SixthContainer>
          <SubmitButton type="submit">Envoyer</SubmitButton> */}
        </MainContainer>
      </Container>
    </div>
  )
}

export default UpdateProfile

{
  /* <Link>Modifier le profil</Link>
          <Link to={`/changepassword/${id.id}`}>changer le mot de passe</Link>
          <Link to={`/deleteprofile/${id.id}`}>Supprimer mon compte</Link> */
}
