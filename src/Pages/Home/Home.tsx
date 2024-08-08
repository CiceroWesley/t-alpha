import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Home = (props: Props) => {
  return (
    <div>
      <h3>Bem-vindo</h3>
      <Link to="/register">Registrar</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Home