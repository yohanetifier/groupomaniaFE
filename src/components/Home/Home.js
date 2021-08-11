import Header from '../Header/Header'
import PostCard from '../PostCard/PostCard'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

const SecondContainer = styled.div`
  width: 40%;
  height: 500px;
  border: 1px solid grey;
`

const ThirdContainer = styled.div`
  display: flex;
  margin-left: 20px; 
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
  height: 65%;
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
  user-select: none; 
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

function Home() {
  const id = useParams()
  const [userDatas, setUserDatas] = useState({})
  const [posts, setPost] = useState([])
  const [isLoading, setLoading] = useState(false)

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

  return (
    <div>
      <Header />,
      {isLoading ? (
        <p>Loading</p>
      ) : (
        posts.map((post) => (
          <MainContainer>
            <SecondContainer>
              <ThirdContainer>
                <img src="" />
                <p>Username</p>
              </ThirdContainer>
              <Img src={post.imageUrl} />
              <FourthContainer>
                <p>Username </p>
                <Description>{post.description}</Description>
              </FourthContainer>
              <Form>
                <p>😃</p>
                <InputText
                  type="text"
                  placeholder="Ajouter un commentaire..."
                ></InputText>
                <SubmitButton type="submit" value="Publier"></SubmitButton>
              </Form>
            </SecondContainer>
          </MainContainer>
        ))
      )}
    </div>
  )
}

export default Home
