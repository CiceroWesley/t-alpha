import { useEffect, useState } from 'react'
import { product } from '../types/types'
import { AxiosInstance } from '../utils/Axios'
import { useNavigate } from 'react-router-dom'



const useFetchProduct = (id: number) => {
    const navigate = useNavigate();
    
    const [product, setProduct] = useState<product>({
        name: '',
        description: '',
        price: 0,
        stock: 0})
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                if(!token){
                    setLoading(false);
                    navigate('/login');
                    throw new Error("Erro na autenticação");
                    
                }
                const response = await AxiosInstance.get(`/api/products/get-one-product/${id}`, {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }})
                if(response.data){
                    setProduct(response.data.data.product)
                    setLoading(false);
                }
                
            } catch (error: any) {
                setError(String(error.response.data.message))
                setLoading(false);
            }
        }
        loadProduct();
    },[])

  return {setProduct, product, error, loading}
}

export default useFetchProduct