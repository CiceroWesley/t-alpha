import React, { useEffect, useState } from 'react'
import { product } from '../../types/types'
import { AxiosInstance } from '../../utils/Axios'
import { Link, useNavigate } from 'react-router-dom'
import './CreateProduct.scss'


const CreateProduct = () => {
    const navigate = useNavigate();

    const [productData, setProductData] = useState<product>({
        name: '',
        description: '',
        price: 0,
        stock: 0,
    })

    const [error, setError] = useState<string | null>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const product = {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            stock: productData.stock
        }

        try {
            const token = localStorage.getItem('token');
            if(!token){
                navigate('/login')
                throw new Error("Erro na autenticação");
                
            }
            const response = await AxiosInstance.post('/api/products/create-product', product, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }});

            if(response.data){
                setProductData({
                    name: '',
                    description: '',
                    price: 0,
                    stock: 0,
                })
                alert('Cadastro realizado com sucesso.');
            } else{
                throw('Erro no cadastro.');
            }

        } catch (error: any) {
            setError(String(error.response.data.message))
        }
    }

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/login')
        }
    },[])

  return (
    <div>
        <h3>Criar produto</h3>
        <Link to="/products">Voltar para produtos</Link>
        <form onSubmit={handleSubmit} className='createProduct'>
            <label>
                <span>Nome do produto:</span>
                <input type="text" placeholder='Wesley' value={productData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductData({...productData, name: e.target.value})}/>
            </label>

            <label>
                <span>Descrição:</span>
                <input type="text" placeholder='Produto com dimensões' value={productData.description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductData({...productData, description: e.target.value})}/>
            </label>

            <label>
                <span>Preço:</span>
                <input type="number" step="0.01" placeholder='1.0' value={productData.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductData({...productData, price: Number(e.target.value)})}/>
            </label>

            <label>
                <span>Quantidade:</span>
                <input type="number" placeholder='2' value={productData.stock} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductData({...productData, stock: Number(e.target.value)})}/>    
            </label>

            <input type="submit" value='Cadastrar'/>
        </form>
        {error && <span>{error}</span>}
    </div>
  )
}

export default CreateProduct