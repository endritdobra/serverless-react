import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

const url = 'http://localhost:8888/api/products';

export default () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const {productId} = useParams();
    console.log();

    const fetchData = async () => {
       try {
           const response = await fetch(`${url}?id=${productId}`);
           const data = await response.json();
           setProduct(data);
           setLoading(false);
       } catch (error) {
           console.log(error);
       }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if(loading) return <h3>Loading...</h3>;

    console.log(product);
    const {fields} = product;
    const {name, desc, price, image} = fields;

    return (
        <section className="section section-center">
            <Link to={'/'} className='link'>Back home</Link>
            <div className='title'>
                <h2>{name}</h2>
                <div className="title-underline"></div>
            </div>
            <article className="product">
                <div className="single-product">
                    <img className="single-product-img" src={image[0].url} alt={name} />
                </div>
            </article>
            <div>
                <h5>{name}</h5>
                <h5 className='price'>${price}</h5>
                <p>{desc}</p>
            </div>
        </section>
    )
};