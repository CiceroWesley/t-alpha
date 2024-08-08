import React, { useEffect, useState } from 'react'
import { AxiosInstance } from '../../utils/Axios'
import { useNavigate } from 'react-router-dom';
import './Login.scss'

type Props = {}

const Login = (props: Props) => {
  const navigate = useNavigate();


  const [userData, setUserData] = useState({
    taxNumber: '',
    password: ''
})

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

    } catch (error) {
        console.log(error);
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
</div>
)
}

export default Login