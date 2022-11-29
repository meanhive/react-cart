import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'

//custom product hook

function useProduct() {
    const [products,setProducts] = useState([])
    const [cart,setCart] = useState([])

    const getProducts = async () => {
        await fetch(`https://dummyjson.com/products`)
            .then(out => out.json())
            .then(res => {
                // console.log('products =', res);
                setProducts(res.products)
            }).catch(err => console.log(err.message))
    }

    // callback
    const initData = useCallback(() => {
        getProducts()
    },[])

    // useEffect
    useEffect(() => {
        initData()
    },[initData])

    // add to cart
    const addToCart = async (product) => {
            // console.log('cart product =', product);

            // product is already in cart or not
                // check => true -> product is not in cart
                // check => false -> product is already in cart
        const check = cart.every(item => {
            return item.id !== product.id
        });

        if(check) {
            toast.success('Product added to cart')
            setCart([...cart, {...product, quantity: 1}])
        } else {
            toast.warning('Product is already in cart');
        }

    }


  return {
    products: [products,setProducts],
    cart: [cart,setCart],
    addToCart: addToCart
  }
}

export default useProduct