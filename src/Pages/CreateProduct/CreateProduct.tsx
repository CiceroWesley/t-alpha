import React, { useState } from 'react'
import { product } from '../../types/types'
import { AxiosInstance } from '../../utils/Axios'

type Props = {}

const CreateProduct = (props: Props) => {
    const [productData, setProductData] = useState<product>({
        name: '',
        description: '',
        price: 0,
        stock: 0,
    })

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

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <h3>Criar produto</h3>
        <form onSubmit={handleSubmit}>
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
    </div>
  )
}

export default CreateProduct