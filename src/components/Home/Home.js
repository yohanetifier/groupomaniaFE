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
import CircularProgress from '@material-ui/core/CircularProgress'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

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
    width: 700,
  },
  media: {
    height: '300px',
    paddingTop: '56,25%',
  },
  author: {
    fontWeight: 'bold',
    color: 'black',
    textDecoration: 'none',
  },
  interaction: {
    display: 'flex', 
    alignItems: 'center',
    borderTop: '1px solid grey',
    position: 'relative', 
    right: '3px',
  }, 
  comments: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  },
  favoriteIcon: {
  color: 'red'
  }
}))

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fafafa;
  @media (max-width: 900px) {
    justify-content: center;
  }
`

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  min-width: 280px;
`
const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-top: 20px;
  height: 100%;
  @media (max-width: 900px) {
    display: none;
  }
`
const ContainerUser = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  & > p {
    margin-left: 10px;
  }
`
const ContainerUsersPlatform = styled(Link)`
  display: flex;
  text-decoration: none;
  color: black;
  align-items: center;
  width: 100%;
  & > p {
    margin-left: 10px;
  }
`
const ContainerLeft = styled.div`
  width: 65%;
  height: 500px;
  overflow:scroll;
  scrollbar: none; 
  @media (max-width: 900px) {
    width: 100%;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; 
  overflow: -moz-scrollbars-none; 
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  & input {
    width: 50%;
    border: none; 
    outline: none;
  } 
  & button {
    background-color: white;
    border: none; 
    cursor: pointer; 
    margin-top: 10px; 
    padding: 0px; 
  }
`

/* & div {
  border: 2px solid red; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  & > input {
    width: 50%; 
    border: none; 
    outline: none; 
  } */

/* justify-content: space-between;
  align-items: center;
  border-top: 1px solid grey;
  & > input {
    width: 50%;
    border: none; 
    outline: none;
  } */

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
const ImgAvatar = styled.img`
  width: 100%;
  height: 100%;
`
const LoaderContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Logo = styled.img`
  width: 30%;
  height: 100%;
`
const PostId = styled.input``

function Home() {
  const classes = useStyles()
  const history = useHistory()
  const id = useParams()
  const [userDatas, setUserDatas] = useState({})
  const [users, setUsers] = useState([])
  const realUsers = users ? users.filter((user) => user.id != id.id) : null
  const [posts, setPost] = useState([])
  const [postIdArray, setPostIdArray] = useState([])
  const [postId, setPostId] = useState('')
  const [actions, setActions] = useState([])
  const [deletePost, setDeletePost] = useState()
  const [comments, setComments] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [like, setLike ] = useState(false)
  const [allLike, setAllLike] = useState([])
  const textInput = useRef(null)
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
    fetch(`http://localhost:3000/api/auth/users/`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) =>
      res
        .json()
        .then((users) => setUsers(users))
        .catch((error) => console.log(error))
    )
  }, [])

  /* Appel pour les données de l'utilisateur par rapport à son identifiant */

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
  }, [])

  /* Appel pour avoir tous les posts  */

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
  }, [])

  /* Appel pour avoir tous les commentaires */

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
  }, [])

  /* Appel pour supprimer un post quand on appuie sur le bouton supprimer */
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
  /* Selection de l'input pour faire un reset */
  
  const inputText = document.querySelectorAll('input')

  /* Appel pour stocker la création du commentaire dans la bdd */

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
        inputText.forEach((input) => (input.value = ''))
      })
    setLoading(false)
  }

  

  const getLike = () => {
    if (like){
      setLike(false)
      const data = {}; 
      data.like = 0
      data.userId = localStorage.getItem('userId')
      fetch(`http://localhost:3000/api/post/like/${postId}`, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json', 
          Accept: 'application/json',
          Authorization: 'Bearer' + localStorage.getItem('token'),
        }, 
      }).then((function(res){
        if(res.ok){
          return res.json()
        }
      })
      ).then(result => console.log(result))
      .catch(error => console.log(error))
    }else {
      setLike(true)
      const data = {}; 
      data.like = 1
      data.userId = localStorage.getItem('userId')
      fetch(`http://localhost:3000/api/post/like/${postId}`, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json', 
          Accept: 'application/json', 
          Authorization: 'Bearer' + localStorage.getItem('token'),
        }, 
      }).then((function(res){
        if(res.ok){
          return res.json()
        }
      })
      ).then(result => console.log(result))
      .catch(error => console.log(error))
    }
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/post/like/bypost`, {
      headers: { 
        'Content-Type': "application/json", 
        Accept: "application/json", 
      },
    }).then((res) => res.json())
    .then((result) => setAllLike(result))
  }, [allLike])


  return (
    <div>
      <Header />
      {/* {isLoading ? (<Loader />) : null} */}
      {posts.length === 0 ? (
        <LoaderContainer>
          <Logo src={icon} />
        </LoaderContainer>
      ) : (
        <Container>
          <ContainerLeft>
            {posts.map((post) => (
              <MainContainer key={post.id}>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar >
                        {post.user.avatar && (
                          <ImgAvatar src={post.user.avatar} />
                        )}
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
                      </div>
                    }
                    title={
                      <Link
                        to={`/profile/${post.user_id}`}
                        className={classes.author}
                      >
                        {post.user.prenom} {post.user.nom}
                      </Link>
                    }
                    subheader=""
                  />
                  {post.imageUrl && (
                    <CardMedia
                      className={classes.media}
                      image={post.imageUrl}
                    />
                  )}

                  <CardContent >
                    <Typography
                      variant="body2"
                      color="textprimary"
                      component="p"
                    >
                      <span className={classes.author}>
                        {post.user.prenom} {post.user.nom}
                      </span>{' '}
                      {post.description}
                    </Typography>
                    
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <div className={classes.interaction}>
                        <button onClick={getLike} onFocus={() => setPostId(post.id)}>
                          { allLike.length === 0 ? (<FavoriteBorderIcon color="primary"/>) : (allLike.map((like) => (
                           like.user_id === JSON.parse(localStorage.getItem('userId')) ? (<FavoriteIcon color="primary" />) : (<FavoriteBorderIcon color="primary"/>)
                          )))}
                          {/* {allLike.map((like) => (
                           like.user_id === JSON.parse(localStorage.getItem('userId')) ? (<FavoriteIcon color="primary" />) : (<FavoriteBorderIcon color="primary"/>)
                          ))} */}
                          </button>
                        <span>{post.likes}</span>
                    </div>
                    <div className={classes.comments}>
                      <p>😃</p>
                      <input
                        id={postId}
                        onChange={(e) => setComments(e.target.value)}
                        onFocus={(e) => setPostId(post.id)}
                        placeholder="Ajouter un commentaire..."
                        required
                      ></input>

                      <SubmitButton
                        type="submit"
                      >
                        {MobileDesign ? (
                          <SendIcon color="primary" />
                        ) : (
                          'Publier'
                        )}
                      </SubmitButton>
                      </div>
                    </Form>
                  </CardContent>
                </Card>
              </MainContainer>
            ))}
          </ContainerLeft>
          <ContainerRight>
            <ContainerUser>
              <Avatar src={userDatas.avatar} />
              <p>
                {userDatas.prenom} {userDatas.nom}
              </p>
            </ContainerUser>
            {users.length >= 2 && <h2>Suggestions pour vous</h2>}
            {realUsers.map((user) => (
              <ContainerUsersPlatform to={`/profile/${user.id}`}>
                <Avatar src={user.avatar} />
                <p>
                  {user.prenom} {user.nom}
                </p>
              </ContainerUsersPlatform>
            ))}
          </ContainerRight>
        </Container>
      )}
    </div>
  )
}

export default Home
