import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  link: {
    margin: '10px 0px 10px 10px',
    display: 'flex', 
    alignItems: 'center',
    color: 'black',
    textDecoration: 'none',
  }, 
  avatar: {
    marginRight: 10,
  }
}))

const Container = styled.div`
display: flex; 
height: 80px; 
width: 200px; 
overflow: scroll;
scrollbar: none;
margin-top: 5px; 
border: 1px solid grey; 
background-color: white; 
flex-direction: column; 
position: absolute; 
z-index: 50; 
display: flex;
& > div {
  width: 10px; 
  height: 10px; 
  border- radius: 20px; 
  border: 2px solid red; 
  & > img {
    width: 100%; 
    border: 2px solid blue; 
  }
}
}
`
const MainContainer = styled.div`
position: relative; 
  & > input {
  width: 200px;
  height: 30px;
  border: 1px solid #dddfe2;
  outline-style: none;

  }
`

function SearchBar() {
  const [allUser, setAllUser] = useState([])
  const classes = useStyles()
  const [filteredData, setFilteredData] = useState([])
  const handleFilter = (e) => {
    const searchWord = e.target.value
    const newFilter = allUser.filter((value) => {
        return value.prenom === searchWord 
    })
    setFilteredData(newFilter)
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/auth/users', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((result) => setAllUser(result))
  })
  return (
    <MainContainer>
      <input
        type="text"
        placeholder="Rechecher un utilisateur"
        onChange={handleFilter}
      ></input>
      {filteredData.length !== 0 && (
        <Container>
          {filteredData.map((user) => (

            <Link to={`/profile/${user.id}`} className={classes.link}>
              <div>
                <Avatar src={user.avatar} className={classes.avatar}/>
              </div>

              <p>
                {user.prenom} {user.nom}
              </p>
            </Link>
          ))}
        </Container>
      )}
    </MainContainer>
  )
}

export default SearchBar
