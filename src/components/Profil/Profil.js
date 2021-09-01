import Header from '../Header/Header'
import logo from '../../assets/logos/icon.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'

const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  @media(max-width: 600px){
    flex-direction: column;
    align-items: center;
    justify-content: center; 
  }
`

const FirstContainer = styled.div`
@media(max-width: 600px){
  height: 10%; 
  width: 50%;
  & > img {
    width: 100%; 
    height: 100%; 

  }
}
`

const SecondContainer = styled.div`
  margin-left: 100px;
  width: 40%;
  
`

const ThirdContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30%;
  & > h1 {
    margin-right: 20px;
  }
`
const Bio = styled.h2`
  height: 30%;
`
const FourthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 20px;
  flex-wrap: wrap;
  position: relative;
  @media(max-width: 600px){
    justify-content: center; 
  }
`
const PostContainer = styled.div`
width: 30%;
position: relative; 
display: flex; 
flex-direction: column;
justify-content: center; 
align-items: center; 
min-width: 280px;
margin-right: 20px;
margin-top: 20px;
height 300px; 
box-shadow: 2px 2px 2px 2px grey;
min-width: 280px;

& > div {
  display: flex; 
  height: 20%; 
  justify-content: space-around;
  width: 100%; 
  display: none; 
}
&:hover > div {
  display: flex; 
  height: 20%; 
  justify-content: space-around;
  width: 100%; 
  
}
& a {
width: 100%; 
height: 100%; 
display: flex; 
justify-content: center; 
align-items: center; 
color: black; 
text-decoration: none;
}
& > img{
  width: 100%; 
  height: 100%; 
}
& button {
  & + div {
    display: flex; 
    justify-content: center; 
    align-items: center; 
  }
}
`

function Profil() {
  const id = useParams()
  const [userDatas, setUserDatas] = useState([])
  const [userPost, setUserPost] = useState([])
  const [deletePost, setDeletePost] = useState()
  const [counterForPost, setCounterForPost] = useState()
  const [counterAction, setCounterAction] = useState([])
  const userOnline = JSON.parse(localStorage.getItem('userId'))
  const history = useHistory()

  useEffect(() => {
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
  }, [id])

  useEffect(() => {
    fetch(`http://localhost:3000/api/post/users/` + id.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((userPost) => setUserPost(userPost))
      .catch((error) => console.log(error))
  })

  const handleClick = () => {
    fetch(`http://localhost:3000/api/post/delete/` + deletePost, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/post/action/post/` + counterForPost, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((result) => setCounterAction([result]))
      .catch((error) => console.log(error))
  }, [counterForPost])

  
  return (
    <div>
      <Header />
      <div>
        <MainContainer>
          <FirstContainer>
            <Img src={userDatas.avatar} />
          </FirstContainer>
          <SecondContainer>
            <ThirdContainer>
              <h1>
                {userDatas.prenom} {userDatas.nom}
              </h1>
              {userOnline === parseInt(id.id)  && <Button
                variant="contained"
                color="primary"
                href={`/updateprofile/${id.id}`}
              >
                Modifier le profil
              </Button>}
              
            </ThirdContainer>
            <Bio>{userDatas.bio}</Bio>
          </SecondContainer>
        </MainContainer>
        <FourthContainer>
          {userPost.map((post) => (
            <PostContainer
              to={`/post/${post.id}`}
              onMouseEnter={() => setCounterForPost(post.id)}
              
            >
              {post.imageUrl ? (<Link to={`/post/${post.id}`} ><img src={post.imageUrl} /></Link>) : (<Link to={`/post/${post.id}`}><p>{post.description}</p></Link>) }
              
              <div>
              {post.user_id === userOnline && (
                <Button
                  onFocus={() => setDeletePost(post.id)}
                  onClick={() => handleClick()}
                >
                  Supprimer
                </Button>
              )}
              <div>
                <ChatBubbleIcon />
                {counterAction.map((counter) => (
                  <p>{counter.count}</p>
                ))}
                </div>
              </div>
            </PostContainer>
          ))}
        </FourthContainer>
      </div>
    </div>
  )
}

export default Profil
