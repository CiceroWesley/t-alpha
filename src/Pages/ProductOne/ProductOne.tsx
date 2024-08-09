import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AxiosInstance } from '../../utils/Axios';
import './ProductOne.scss'
import useFetchProduct from '../../hooks/useFetchProduct';
import './ProductOne.scss'

type Props = {}

const ProductOne = (props: Props) => {
    const {id} = useParams();
    const navigate = useNavigate();

    const {setProduct: setProductData , product : productData, error, loading} = useFetchProduct(Number(id));

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
            alert('Erro ao editar')
        }
    }

  return (
    <div>
        <h3>Editar produto</h3>
        <Link to="/products">Voltar para produtos</Link>
        {error && <span>{error}</span>}
        {!loading? <div className='productOne'>
        
            <form onSubmit={handleSubmit} >
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
        : <div>carregando</div>}


    </div>
  )
}

export default ProductOne