import React from 'react'
import { product } from '../types/types'
import { Link } from 'react-router-dom'

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
    <div>
        <span>{props.name}</span>
        <span>{props.description}</span>
        <span>{props.price}</span>
        <span>{props.stock}</span>
        <Link to={`/product/${props.id}`}>Ver</Link>
        <span onClick={() => props.handleDelete(props.id)}>Apagar</span>
    </div>
  )
}

export default Product