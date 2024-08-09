import React, { useEffect, useState } from 'react'
import { AxiosInstance } from '../../utils/Axios'
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss'


const Login = () => {
  const navigate = useNavigate();


  const [userData, setUserData] = useState({
    taxNumber: '',
    password: ''
})

const [error, setError] = useState<string | null>('')

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
        taxNumber: userData.taxNumber,
        password: userData.password
    }

    try {
        const response = await AxiosInstance.post('/api/auth/login', user);

        if(response.data){
          localStorage.setItem('token', response.data.data.token);
          navigate('/products')

        } else{
            throw('Erro no cadastro.');
        }

    } catch (error: any) {
        setError(String(error.response.data.message))
    }
}

useEffect(() => {
  const token = localStorage.getItem('token');
  if(token){
      navigate('/products')
  }
},[])

return (
<div>
    <h3>Login</h3>
    <Link to='/'>Voltar</Link>
    <form onSubmit={handleSubmit} className='login'>
        <label>
            <span>CPF ou CNPJ:</span>
            <input type="text" placeholder='12345678900' value={userData.taxNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, taxNumber: e.target.value})}/>
        </label>

        <label>
            <span>Senha:</span>
            <input type="password" placeholder='123456' value={userData.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password: e.target.value})}/>    
        </label>

        <input type="submit" value='Fazer login'/>
    </form>
    {error && <span style={{textAlign:'center'}}>{error}</span>}
</div>
)
}

export default Login