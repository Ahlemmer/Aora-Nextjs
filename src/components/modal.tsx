import React from 'react'
import FormSubmitButton from './form-submit'
import { Product } from '@/types'

export default function Modal({btn_Name,setProduct,product,saveButton}:{btn_Name:string,setProduct:any,product:Partial<Product>,saveButton:any}) {
    console.log("🚀 ~ Modal ~ product:", product)
    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <div className="text-lg mb-3 font-bold"> Add Product</div>
                
                <form method="dialog" >
                    <input
                         value={product?.title}
                         onChange={(e)=>setProduct({...product,title: e.target.value})}
                        name="name"
                        placeholder="Name"
                        className="input-bordered input mb-3 w-full"
                    />
                    <textarea
                        value={product?.description}
                        onChange={(e) => setProduct({ ...product, description:  e.target.value })}
                        name="description"
                        placeholder="Description"
                        className="textarea-bordered textarea mb-3 w-full"
                    />
                    <input
                        value={product?.image}
                        onChange={(e) => setProduct({ ...product, image: e.target.value })}
                        name="imageUrl"
                        placeholder="Image URL"
                        type="url"
                        className="input-bordered input mb-3 w-full"
                    />
                    <input
                        value={product?.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        name="price"
                        placeholder="Price"
                        type="number"
                        className="input-bordered input mb-3 w-full"
                    />
                     <input
                        value={product?.category}
                        onChange={(e) => setProduct({ ...product, category:  e.target.value })}
                        name="category"
                        placeholder="Category"
                        type="text"
                        className="input-bordered input mb-3 w-full"
                    />
                    <FormSubmitButton className="btn" onClick={saveButton}>{btn_Name} Product</FormSubmitButton>
                    <button className='btn mx-3'>close</button>
                </form>

            </div>

        </dialog>

    )
}
