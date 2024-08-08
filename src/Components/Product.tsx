import React from 'react'
import { product } from '../types/types'
import { Link } from 'react-router-dom'
import './Product.scss'

type Props = {
    id?: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    handleDelete: (id?: number) => void
 }

const Product = (props: Props) => {
  return (
    <div className='product'>
        <span>{props.name}</span>
        <span>{props.description}</span>
        <span>{props.price} R$</span>
        <span>{props.stock} items</span>
        <Link to={`/product/${props.id}`}><button>Ver/editar</button></Link>
        <button onClick={() => props.handleDelete(props.id)}>Apagar</button>
    </div>
  )
}

export default Product