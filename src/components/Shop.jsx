import React from 'react';
import {Link} from "react-router-dom";

import {Slider} from './'
import '../media/css/Shop.css'

export default class Shop extends React.Component {
    render(){
        return (
            <div className="Shop">
                <Slider slides={this.props.query.data.sliderList} />
                <div className="popular-products">
                    <span>Товары</span>
                </div>
                <ul className="products-preview">
                    {this.props.query.data.productList.slice(0, 12).map(product => (
                        <li key={product.id} className="product-block">
                            <Link to={`/product/${product.id}`}>
                                <div className="product">
                                    { product.imagesList.length !== 0 ? (
                                        <img className="product-preview" src={product.imagesList[0].url}
                                                             alt={product.name}/>
                                    ) : null}
                                    <div className="descriptions">
                                        <span className="product-name">{product.name}</span>
                                        {/*<span className="product-price">{product.price} руб.</span>*/}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
