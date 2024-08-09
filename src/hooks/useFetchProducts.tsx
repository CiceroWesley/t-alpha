import React, { useEffect, useState } from 'react'
import { product } from '../types/types'
import { AxiosInstance } from '../utils/Axios'
import { useNavigate } from 'react-router-dom'



const useFetchProducts = () => {
    const navigate = useNavigate();
    
    const [products, setProducts] = useState<product[]>([])
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true)
                const token = localStorage.getItem('token');
                
                if(!token){
                    setLoading(false)
                    navigate('/login')
                    throw new Error("Erro na autenticação");
                    
                }
                const response = await AxiosInstance.get('/api/products/get-all-products', {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }})
                if(response.data){
                    setProducts(response.data.data.products)
                    setLoading(false)
                } 
                
            } catch (error: any) {
                setLoading(false)
                setError(String(error.response.data.message))
                
            }
        }
        loadProducts();
    },[])

  return {setProducts, products, error, loading}
}

export default useFetchProducts