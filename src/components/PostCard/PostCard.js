import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../Header/Header'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import DeleteIcon from '@material-ui/icons/Delete'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar'

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px; 
  &  > div {
    border: 1px solid #dddfe2;
  display: flex;
  height: 100%;
  width: 70%;
  border-radius: 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
  }
`

const ThirdContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  border-right: 1px solid #dddfe2;
  @media (max-width: 600px) {
    width: 100%;
  }
`
const FourthContainer = styled.div`
  height: 50%;
  display: flex;
  border-bottom: 1px solid #dddfe2;
  & > div {
    display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  margin-left: 20px;
  }
  & > p {
    font-weight: bold; 
  }
`

const Img = styled.img`
  width: 100%;
  height: 100%;
`

const FifthContainer = styled.div`
  height: 50%;
`
const SixContainer = styled.div`
  width: 50%;
  height: 100%; 
  @media (max-width: 600px) {
    width: 100%;
  }
`
const Description = styled.p`
  display: flex;
  margin-left: 20px;
`
const NameContainer = styled.span`
  font-weight: bold;
`
const Comments = styled.p`
  display: flex;
  align-items: center;
  margin-left: 20px;
  
`
const Comment = styled.span`
  font-weight: 200;
  margin: 0px 20px;
`

function PostCard() {
  const [datas, setDatas] = useState([])
  const [actions, setActions] = useState([])
  const [userDatas, setUserDatas] = useState([])
  const [deleteComment, setDeleteComment] = useState()
  const [allPost, setAllPost] = useState([])
  const [allAction, setAllAction] = useState([])
  const [isLoading, setLoading] = useState(false)
  const userOnline = JSON.parse(localStorage.getItem('userId'))
  const id = useParams()
  const MobileDesign = useMediaQuery('(max-width: 600px)')

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:3000/api/post/${id.id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((result) => setDatas([result]))
    setLoading(false)
  }, [])

  useEffect(() => {
    fetch(`http://localhost:3000/api/post/action/${id.id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((result) => setActions(result))
  }, [actions])

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/auth/update/` + localStorage.getItem('userId'),
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    ).then((res) =>
      res
        .json()
        .then((userDatas) => setUserDatas(userDatas))
        .catch((error) => console.log(error))
    )
  }, [id])

  const handleClick = (id) => {
    fetch(`http://localhost:3000/api/post/action/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
  }

  return (
    <div>
      <Header />
      {isLoading ? (
        <p>Loading</p>
      ) : (
        datas.map((data) => (
          <MainContainer>
            <div>
              <ThirdContainer>
                <FourthContainer>
                  <Avatar>
                    {data.user.avatar && (
                      <Img src={data.user.avatar} />
                    ) }
                  </Avatar>
                  <p>
                    {data.user.prenom} {data.user.nom}{' '}
                  </p>
                </FourthContainer>
                {data.imageUrl ? (
                  <FifthContainer>
                    <Img src={data.imageUrl} />
                  </FifthContainer>
                ) : (
                  <Description>
                    <NameContainer>
                      {data.user.prenom} {data.user.nom}
                    </NameContainer>
                    <Comment>{data.description}</Comment>{' '}
                  </Description>
                )}
              </ThirdContainer>
              <SixContainer>
                {data.imageUrl && (
                  <Description>
                    <NameContainer>
                      {data.user.prenom} {data.user.nom}
                    </NameContainer>
                    <Comment>{data.description}</Comment>{' '}
                  </Description>
                )}

                <div>
                  {actions.map((action) => (
                    <Comments key={action.comment_id}>
                      {' '}
                      <NameContainer>
                        {action.user.prenom} {action.user.nom}{' '}
                        <Comment>{action.comments} </Comment>
                      </NameContainer>
                      {/* {userDatas.admin  && (
                        <button onClick={() => handleClick(action.comment_id)}>
                          <DeleteIcon />
                        </button>
                      )}  */}
                      {action.post.user_id === userOnline ||
                      action.user_id === userOnline ||
                      userDatas.admin ? (
                        <button onClick={() => handleClick(action.comment_id)}>
                          <DeleteIcon />
                        </button>
                      ) : null}
                    </Comments>
                  ))}
                </div>
              </SixContainer>
            </div>
          </MainContainer>
        ))
      )}
    </div>
  )
}

export default PostCard
