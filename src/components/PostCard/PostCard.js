import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../Header/Header'

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const SecondContainer = styled.div`
  border: 1px solid grey;
  display: flex;
  height: 600px;
`

const ThirdContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border-right: 2px solid grey;
`
const FourthContainer = styled.div`
  height: 10%;
  display: flex;
  border-bottom: 1px solid grey;
`
const Avatar = styled.img`
  border-radius: 50px;
  width: 50px;
  border: 2px solid grey;
  margin-right: 10px;
`
const Img = styled.img`
  width: 100%;
  height: 100%;
`
const FifthContainer = styled.div`
  height: 90%;
`

function PostCard() {
  const [datas, setDatas] = useState([])
  const [isLoading, setLoading] = useState(false)
  const id = useParams()
  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:3000/api/post/${id.id}`)
      .then((res) => res.json())
      .then((result) => setDatas([result]))
    setLoading(false)
  }, [])

  console.log(datas)

  return (
    <div>
      <Header />,
      {isLoading ? (
        <p>Loading</p>
      ) : (
        datas.map((data) => (
          <MainContainer>
            <SecondContainer>
              <ThirdContainer>
                <FourthContainer>
                  <Avatar src={data.user.avatar} />
                  <p>
                    {data.user.prenom} {data.user.nom}{' '}
                  </p>
                </FourthContainer>
                <FifthContainer>
                  <Img src={data.imageUrl} />
                </FifthContainer>
              </ThirdContainer>
              <div>
                <p>
                  {' '}
                  {data.user.prenom} {data.user.nom} {data.description}
                </p>
              </div>
            </SecondContainer>
          </MainContainer>
        ))
      )}
    </div>
  )
}

export default PostCard

{
  /* <div>
      <Header />
      <MainContainer>
          <div>
          <div>
            <div>
              <img src="" />
              <p>prenom + nom</p>
            </div>
            <img src="" />
          </div>
          <p> Prenom + nom + description</p>
        </div>
      </MainContainer>
    </div> */
}
