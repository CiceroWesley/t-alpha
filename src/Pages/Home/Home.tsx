import { Link } from 'react-router-dom'
import './Home.scss'


const Home = () => {
  return (
    <div>
      <h3>Bem-vindo</h3>

      <div>
        <Link className='linkButton' to="/register">Registrar</Link>
        <Link className='linkButton' to="/login">Login</Link>
      </div>
      
    </div>
  )
}

export default Home