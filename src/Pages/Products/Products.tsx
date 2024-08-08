import React, { useEffect, useState } from 'react'
import { product } from '../../types/types'
import { AxiosInstance } from '../../utils/Axios';

type Props = {}

const Products = (props: Props) => {
    const [products, setProducts] = useState<product[]>([]);


    const handleDelete = async (id: number | undefined) => {
        try {
            const token = localStorage.getItem('token');
            if(!token){
                throw new Error("Erro na autenticação");
            }
            const response = await AxiosInstance.delete(`/api/products/delete-product/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }})
            if(response.status == 204){
                alert('Produto deletado');
                location.reload()
                
            } else {
                throw 'Erro ao excluir produto';
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            
            try {
                const token = localStorage.getItem('token');
                if(!token){
                    throw new Error("Erro na autenticação");
                }
                const response = await AxiosInstance.get('/api/products/get-all-products', {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }})
                if(response.data){
                    setProducts(response.data.data.products)
                }
                
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchProducts()
    },[])


  return (
    <div>
        <h3>Produtos</h3>

        {products && products.map((product) => (
            <div>
                <span>{product.id}</span>
                <span>{product.name}</span>
                <span>{product.description}</span>
                <span>{product.price}</span>
                <span>{product.stock}</span>
                <span onClick={() => handleDelete(product.id)}>Apagar</span>
            </div>
        ))
    }
    </div>
  )
}

export default Products