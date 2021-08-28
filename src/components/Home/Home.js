import Header from '../Header/Header'
import PostCard from '../PostCard/PostCard'
import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { useForm } from 'react-hook-form'
import icon from '../../assets/logos/icon.png'
import client from '../../assets/logos/client.png'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { blue } from '@material-ui/core/colors'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteIcon from '@material-ui/icons/Delete'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import SendIcon from '@material-ui/icons/Send'

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
 
    to {
    transform: rotate(360deg);
    }
`
export const Loader = styled.div`
  padding: 10px;
  border: 6px solid blue;
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  media: {
    height: '300px',
    paddingTop: '56,25%',
  },
  avatar: {
    backgroundColor: blue[500],
  },
}))

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  min-width: 280px;
`

const SecondContainer = styled.div`
  width: 40%;
  border: 1px solid grey;
  box-shadow: 5px 5px 10px 2px grey;
`

const ThirdContainer = styled.div`
  display: flex;
  margin: 5px 0px 5px 20px;
  height: 10%;
`

const FourthContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  height: 15%;
`

const Img = styled.img`
  width: 100%;
  height: 60%;
`

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid grey;
  height: 9%;
`

const InputText = styled.input`
  width: 50%;
  border: none;
  outline: none;
`

const SubmitButton = styled(Button)`
  width: 20%;
`

const Description = styled.div`
  margin-left: 20px;
`
const NoPost = styled.p`
  text-align: center;
`
const NoPostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ButtonComment = styled(Button)`
  margin-left: 10px;
  width: 20%;
`
const PostLink = styled(Link)`
  text-decoration: none;
  color: black;
`
const RemovePost = styled(Button)``
const MenuButton = styled(Button)``
const ImgAvatar = styled.img`
  width: 100%;
  height: 100%;
`

/* const Avatar = styled.img`
  border-radius: 50px;
  width: 50px;
  margin-right: 10px;
  border: 2px solid grey;
` */
const LoaderContainer = styled.div`
width: 100%; 
height: 400px; 
display: flex; 
justify-content: center;
align-items:center; 
`
const Logo = styled.img`
width: 50%; 
height: 100%;
`
const PostId = styled.input``

function Home() {
  const classes = useStyles()
  const history = useHistory()
  const id = useParams()
  const [userDatas, setUserDatas] = useState({})
  const [posts, setPost] = useState([])
  const [postIdArray, setPostIdArray] = useState([])
  const [postId, setPostId] = useState('')
  const [actions, setActions] = useState([])
  const [deletePost, setDeletePost] = useState()
  const [comments, setComments] = useState('')
  const [isLoading, setLoading] = useState(false)
  const textInput = useRef(null)
  const resetTextInput = () => {
    console.log(textInput)
  }
  const MobileDesign = useMediaQuery('(max-width: 600px)')
  const newPublication = () => {
    history.push(`/publication/${id.id}`)
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }
 

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:3000/api/auth/update/` + id.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) =>
      res
        .json()
        .then((userDatas) => setUserDatas(userDatas))
        .catch((error) => console.log(error))
    )
    setLoading(false)
  }, [id])

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/api/post/', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((res) => setPost(res))
    setLoading(false)
  }, [posts])

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:3000/api/post/action/interaction`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((result) => setActions(result))
    setLoading(false)
  }, [actions])

  
  const handleClick = () => {
    setLoading(true)
    fetch(`http://localhost:3000/api/post/delete/` + deletePost, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
    setLoading(false)
  }
  
  

  const onSubmit = (data) => {
    setLoading(true)
    data.user_id = id.id
    data.comments = comments
    data.post_id = postId
    fetch(`http://localhost:3000/api/post/action`, {
      method: 'POST',
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
        
      })
    setLoading(false)
  }

 
  return (
    <div>
      <Header />
      {/* {isLoading ? (<Loader />) : null} */}
      {posts.length === 0 ? (
        <LoaderContainer><Logo src={icon} /></LoaderContainer>
        
        /* <NoPostContainer>
          <NoPost>Commencer à intéragir avec la communauté</NoPost>
          <Button
            color="primary"
            variant="contained"
            onClick={() => newPublication()}
          >
            Créer une nouvelle publication
          </Button>
        </NoPostContainer> */
      ) : (
        posts.map((post) => (
          <MainContainer key={post.id}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>
                    {post.user.avatar && <ImgAvatar src={post.user.avatar} />}
                  </Avatar>
                }
                action={
                  <div>
                    {}
                    {userDatas.admin && (
                      <Button
                        onFocus={() => setDeletePost(post.id)}
                        onClick={() => handleClick(post.id)}
                      >
                        {MobileDesign ? (
                          <DeleteIcon color="primary" />
                        ) : (
                          'Supprimer'
                        )}
                      </Button>
                    )}

                    {actions.map((action) =>
                      action.post_id === post.id &&
                      !postIdArray.includes(post.id)
                        ? postIdArray.push(post.id)
                        : null
                    )}
                    {postIdArray.includes(post.id) && (
                      <Link
                        variant="contained"
                        color="primary"
                        to={`/post/${post.id}`}
                      >
                        <MoreVertIcon color="primary"></MoreVertIcon>
                      </Link>
                    )}
                    {/*  <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={closeMenu}
                    >
                      <MenuItem onClose={closeMenu}></MenuItem>
                      {userDatas.admin && (
                        <MenuItem onClose={closeMenu}>
                          <RemovePost
                            onFocus={() => setDeletePost(post.id)}
                            onClick={() => handleClick(post.id)}
                          >
                            Supprimer
                          </RemovePost>
                        </MenuItem>
                      )}
                    </Menu> */}
                  </div>
                }
                title={`${post.user.prenom} ${post.user.nom}`}
                subheader=""
              />
              {post.imageUrl && (
                <CardMedia className={classes.media} image={post.imageUrl} />
              )}

              <CardContent>
                <Typography variant="body2" color="textprimary" component="p">
                  {post.user.prenom} {post.user.nom} {post.description}
                </Typography>
                <Form onSubmit={handleSubmit(onSubmit)} className="frm">
                  <p>😃</p>
                  <InputText
                    onChange={(e) => setComments(e.target.value)}
                    onFocus={(e) => setPostId(post.id)}
                    placeholder="Ajouter un commentaire..."
                    onBlur={(e) => 
                      console.log(e.target.value)
                    }
                    required
                  ></InputText>

                  <SubmitButton type="submit" >
                    {MobileDesign ? <SendIcon color="primary" /> : 'Publier'}
                  </SubmitButton>
                </Form>
              </CardContent>
            </Card>

            {/* <SecondContainer>
              <ThirdContainer>
                <Avatar src={post.user.avatar ? post.user.avatar : client} />
                <p>
                  {post.user.prenom} {post.user.nom}
                </p>
                {userDatas.admin && (
                  <button
                    onFocus={() => setDeletePost(post.id)}
                    onClick={() => handleClick(post.id)}
                  >
                    Supprimer
                  </button>
                )}
              </ThirdContainer>
              {post.imageUrl && <Img src={post.imageUrl} />}
              {/* <Img src={post.imageUrl} /> 
              <FourthContainer>
                <p>
                  {post.user.prenom} {post.user.nom}{' '}
                </p>
                <Description>{post.description}</Description>
              </FourthContainer>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <p>😃</p>
                <InputText
                  onChange={(e) => setComments(e.target.value)}
                  onFocus={(e) => setPostId(post.id)}
                  placeholder="Ajouter un commentaire..."
                  required
                ></InputText>

                <input type="submit" />
                {actions.map((action) =>
                  action.post_id === post.id && !postIdArray.includes(post.id)
                    ? postIdArray.push(post.id)
                    : null
                )}
                {postIdArray.includes(post.id) && (
                  <Link to={`/post/${post.id}`}>Voir les commentaires</Link>
                )}
              </Form>
            </SecondContainer> */}
          </MainContainer>
        ))
      )}
    </div>
  )
}

export default Home
