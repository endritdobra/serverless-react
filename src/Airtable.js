import React, {useEffect, useState} from 'react';
import axios from 'axios';

const url = 'http://localhost:8888/api/products';

function Airtable() {
    const [products, setProducts] = useState([]);
    const fetchData = async () => {
        try {
            const {data} = await axios.get(url);
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return <section className="section section-center">
        <div className="title">
            <h2>Airtable</h2>
            <div className="title-underline"></div>
        </div>
        <div className="products">
            {products.map(product => {
                const {id, title, price, url} = product;
                return (
                    <article key={id} className="product">
                        <img src={url} alt={title} />
                        <div className="product-info">
                            <h5>{title}</h5>
                            <h4 className="product-price">${price}</h4>
                        </div>
                    </article>
                )
            })}
        </div>
    </section>
}

export default Airtable;