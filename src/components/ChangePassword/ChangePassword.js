import Header from '../Header/Header'
import styled from 'styled-components'
import logo from '../../assets/logos/icon.png'
import { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 500px;
  border: 1px solid grey;
`

const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid grey;
  width: 20%;
`
const ThirdContainer = styled.form`
text-align: center; 
`

function ChangePassword() {

    const {register, formState: {errors}, handleSubmit } = useForm()
    const id = useParams()
    const [userDatas, setUserDatas] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3000/api/auth/getPassword/` + id.id, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }).then((res) =>
          res
            .json()
            .then((userDatas) => setUserDatas(userDatas))
            .catch((error) => console.log(error))
        )
      }, [id])

      const onSubmit = (data) => {
        if (data.password !== data.confirmpassword){
            console.log("password not confirmed")
        } else {
            fetch('http://localhost:3000/api/auth/changepassword/'+ id.id, { 
                method:'PUT', 
                body:JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json", 
                    "Accept": "application/json", 
                      Authorization: 'Bearer ' + localStorage.getItem('token')
                },
            }).then(function(res){
                if(res.ok){
                    return res.json()
                }
            })
            .then((result) => {
                console.log(result)
            })
        }
      }

   
  return (
    <div>
      <Header />
      <MainContainer>
        <SecondContainer>
          <Link to={`/profile/${id.id}`}>Modifier le profil</Link>
          <Link>changer le mot de passe</Link>
          <Link to={`/deleteprofile/${id.id}`}>Supprimer mon compte</Link>
        </SecondContainer>
          <ThirdContainer onSubmit={handleSubmit(onSubmit)}>
            <h1>Changer le mot de passe</h1>
            <div>
            <label>Ancien mot de passe</label>
            <input type="password" {...register('oldpassword')}></input>
            </div>
            <div>
            <label>Nouveau mot de passe</label>
            <input type="password" {...register('password')}></input>
            </div>
            <div>
            <label>Confirmer mot de passe</label>
            <input type="password" {...register('confirmpassword')}></input>
            </div>
            <button type="submit">Envoyer</button>
          </ThirdContainer>
      </MainContainer>
    </div>
  )
}

export default ChangePassword
