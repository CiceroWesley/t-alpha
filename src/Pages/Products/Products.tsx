import React, { useEffect, useState } from 'react'
import { product } from '../../types/types'
import { AxiosInstance } from '../../utils/Axios';
import { Link, useNavigate } from 'react-router-dom';
import Product from '../../Components/Product';
import useFetchProducts from '../../hooks/useFetchProducts';

type Props = {}

const Products = (props: Props) => {
    const navigate = useNavigate();

    // const [products, setProducts] = useState<product[]>([]);

    const {setProducts ,products, error, loading} = useFetchProducts();


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

  return (
    <div>
        <h3>Produtos</h3>
        <Link to="/createproduct">Cadastrar produto</Link>

        {loading && <span>Carregando</span>}
        {error && <span>{error}</span>}
        {products && products.map((product) => (
            <Product key={product.id} id={product.id} name={product.name} description={product.description} price={product.price} stock={product.stock} handleDelete={handleDelete}/>
            ))
        }
    </div>
  )
}

export default Products