import React, { useState, useEffect } from 'react'
import styles from './Auth.module.css'
import { GET_TOKEN } from '../queries/queries'
import { useMutation } from '@apollo/client'
import SignIn from '../components/SignIn'
import jwtDecode from 'jwt-decode'
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid'

const Auth = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [getToken] = useMutation(GET_TOKEN)
  const [isLogin, setIsLogin] = useState(true)

  const authUser = async (e) => {
    e.preventDefault()
    if (isLogin) {
      try {
        const result = await getToken({
          variables: { username: username, password: password },
        })
        localStorage.setItem('token', result.data.tokenAuth.token)
        result.data.tokenAuth.token && (window.location.href = '/employees')
      } catch (err) {
        alert(err.message)
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decodedToken = jwtDecode(localStorage.getItem('token'))
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
      } else {
        window.location.href = '/employees'
      }
    }
  }, [])

  return <SignIn />
}

export default Auth
