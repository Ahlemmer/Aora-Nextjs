import Link from 'next/link'
import React from 'react'
import PriceTag from './price-tag'
import Image from 'next/image'
import { Product } from '@/types';

export interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product}:ProductCardProps) {
 
  return (
    <Link
    href={"/products/" + product.id}
    className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
  >
    <figure>
      <Image
        src={product.image}
        alt={product.title}
        width={800}
        height={400}
        className="h-48 object-cover"
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{product.title}</h2>
    
      <p>{product.description}</p>
      <PriceTag price={product.price} />
    </div>
  </Link>
  )
}
