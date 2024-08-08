import React, { useEffect, useState } from 'react'
import { user } from '../../types/types'
import { AxiosInstance } from '../../utils/Axios'
import './Register.scss'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Register = (props: Props) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<user>({
        name: '',
        taxNumber: '',
        mail: '',
        phone: '',
        password: ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            name: userData.name,
            taxNumber: userData.taxNumber,
            mail: userData.mail,
            phone: userData.taxNumber,
            password: userData.password
        }

        try {
            const response = await AxiosInstance.post('/api/auth/register', user);

            if(response.data){
                setUserData({
                    name: '',
                    taxNumber: '',
                    mail: '',
                    phone: '',
                    password: ''
                })
                alert('Cadastro realizado com sucesso.');
                navigate('/login')
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
        <h3>Criar conta</h3>
        <form onSubmit={handleSubmit} className='createAccount'>
            <label>
                <span>Nome de usuário:</span>
                <input type="text" placeholder='Wesley' value={userData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, name: e.target.value})}/>
            </label>

            <label>
                <span>CPF ou CNPJ:</span>
                <input type="text" placeholder='12345678900' value={userData.taxNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, taxNumber: e.target.value})}/>
            </label>

            <label>
                <span>Email:</span>
                <input type="email"placeholder='wesley@teste.com' value={userData.mail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, mail: e.target.value})}/>
            </label>

            <label>
                <span>Telefone:</span>
                <input type="text" placeholder='88888888888' value={userData.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, phone: e.target.value})}/>    
            </label>

            <label>
                <span>Senha:</span>
                <input type="password" placeholder='123456' value={userData.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password: e.target.value})}/>    
            </label>

            <input type="submit" value='Cadastrar'/>
        </form>
    </div>
  )
}

export default Register