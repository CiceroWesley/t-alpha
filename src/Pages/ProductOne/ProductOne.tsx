import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { product } from '../../types/types';
import { AxiosInstance } from '../../utils/Axios';
import './ProductOne.scss'

type Props = {}

const ProductOne = (props: Props) => {
    const {id} = useParams();

    const [productData, setProductData] = useState<product>({
        name: '',
        description: '',
        price: 0,
        stock: 0,
    })

    const [editProduct, setEditProduct] = useState<boolean>(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token');
            if(!token){
                throw new Error("Erro na autenticação");
            }

            const product = {
                name: productData.name,
                description: productData.description,
                price: productData.price,
                stock: productData.stock
            }
            
            const response = await AxiosInstance.patch(`/api/products/update-product/${id}`, product, {
            headers: {
            'Authorization': `Bearer ${token}`
            }})
            if(response.status == 204){
                alert('Produto atualizado com sucesso.')
            } else {
                throw('Erro na edição.');
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {

            try {
                const token = localStorage.getItem('token');
                if(!token){
                    throw new Error("Erro na autenticação");
                }
                const response = await AxiosInstance.get(`/api/products/get-one-product/${id}`, {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }})
                if(response.data){
                    setProductData(response.data.data.product)
                }
                
            } catch (error) {
                console.log(error)
            }

        }
        fetchProduct();
    },[id])


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome do produto:</span>
                <input disabled={editProduct} type="text" placeholder='Wesley' value={productData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductData({...productData, name: e.target.value})}/>
            </label>

            <label>
                <span>Descrição:</span>
                <input disabled={editProduct} type="text" placeholder='Produto com dimensões' value={productData.description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductData({...productData, description: e.target.value})}/>
            </label>

            <label>
                <span>Preço:</span>
                <input disabled={editProduct} type="number" step="0.01" placeholder='1.0' value={productData.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductData({...productData, price: Number(e.target.value)})}/>
            </label>

            <label>
                <span>Quantidade:</span>
                <input disabled={editProduct} type="number" placeholder='2' value={productData.stock} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductData({...productData, stock: Number(e.target.value)})}/>    
            </label>

            <input disabled={editProduct} type="submit" value='Atualizar'/>
        </form>

        <button onClick={() => {setEditProduct(!editProduct)}}>{editProduct? 'Liberar para editar' : 'Cancelar'}</button>


    </div>
  )
}

export default ProductOne