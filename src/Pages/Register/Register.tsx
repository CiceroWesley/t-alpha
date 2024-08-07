import React, { useState } from 'react'
import { user } from '../../types/User'

type Props = {}

const Register = (props: Props) => {
    const [userData, setUserData] = useState<user>({
        name: '',
        taxNumber: '',
        mail: '',
        phone: '',
        password: ''
    })

    console.log(userData)
  return (
    <div>
        <h3>Register User</h3>
        <form>
            <label>
                <span>Nome de usuário:</span>
                <input type="text" placeholder='Wesley' value={userData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, name: e.target.value})}/>
            </label>

            <label>
                <span>CPF ou CNPJ:</span>
                <input type="text" placeholder='12345678900'/>
            </label>

            <label>
                <span>Email:</span>
                <input type="email"placeholder='wesley@teste.com'/>
            </label>

            <label>
                <span>Telefone:</span>
                <input type="text" placeholder='88888888888' value={userData.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, phone: e.target.value})}/>    
            </label>

            <label>
                <span>Senha:</span>
                <input type="password" placeholder='123456'/>    
            </label>

            <input type="submit" value='Cadastrar'/>
        </form>
    </div>
  )
}

export default Register