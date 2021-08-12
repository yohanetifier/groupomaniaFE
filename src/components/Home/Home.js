import Header from '../Header/Header'
import PostCard from '../PostCard/PostCard'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  
`

const SecondContainer = styled.div`
  width: 40%;
  height: 600px;
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
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid grey;
  height: 9%;
`

const InputText = styled.input`
  width: 70%;
  border: none;
`

const SubmitButton = styled.input`
  border: none;
  background-color: white;
  cursor: pointer;
`

const Description = styled.div`
  margin-left: 20px;
`

const Avatar = styled.img`
border-radius: 50px;
width: 50px; 
margin-right: 10px;
border: 2px solid grey; 
`

const PostId = styled.input``

function Home() {
  const id = useParams()
  const [userDatas, setUserDatas] = useState({})
  const [posts, setPost] = useState([])
  const [postId, setPostId] = useState('')
  const [comments, setComments] = useState('')
  const [isLoading, setLoading] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/update/` + id.id).then((res) =>
      res
        .json()
        .then((userDatas) => setUserDatas(userDatas))
        .catch((error) => console.log(error))
    )
  }, [id])

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/api/post/')
      .then((res) => res.json())
      .then((res) => setPost(res))
    setLoading(false)
  }, [])


  const onSubmit = (data) => {
    data.user_id = id.id
    data.comments = comments
    data.id = postId
    fetch(`http://localhost:3000/api/post/action`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (res) {
        if (res.ok) {
          return res.json()
        }
      })
      .then((result) => console.log(data))
  }
  
  return (
    <div>
      <Header />,
      {isLoading ? (
        <p>Loading</p>
      ) : (
        posts.map((post) => (
          <MainContainer key={post.id}>
            <SecondContainer>
              <ThirdContainer>
                <Avatar src={post.user.avatar} />
                <p>{post.user.prenom} {post.user.nom}</p>
              </ThirdContainer>
              <Img src={post.imageUrl} />
              <FourthContainer>
                <p>{post.user.prenom} {post.user.nom} </p>
                <Description>{post.description}</Description>
              </FourthContainer>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <p>😃</p>
                <InputText onChange={(e) => setComments(e.target.value)} onBlur={(e) => setPostId(post.id)} placeholder="Ajouter un commentaire..."></InputText>
                <input type="submit" />
                <Link to={`/post/${post.id}`}>Voir les commentaires</Link>
              </Form>
            </SecondContainer>
          </MainContainer>
        ))
      )}
    </div>
  )
}

export default Home
