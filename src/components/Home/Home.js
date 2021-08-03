import Header from '../Header/Header'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

function Home() {
  const id = useParams()
  const [userDatas, setUserDatas] = useState({})
  
  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/update/` + id.id)
    .then((res) => res.json()
    .then(( userDatas) => setUserDatas(userDatas))
    .catch(error => console.log(error))
    )
  }, [id])

  return <Header />
}

export default Home
