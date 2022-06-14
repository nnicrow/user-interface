import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import axios from 'axios';

import './../../media/libs/swiper/swiper-bundle.min.css'
import './../../media/css/Product/Product.css'
// import './../../media/css/Product/Price.css'
import SpecificationsBlock from './SpecificationsBlock'

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            response: []
        };
        // this.BasketAddProduct = this.BasketAddProduct.bind(this);
    }
    // BasketAddProduct(){
    //     // this.props.BasketAddProduct()
    //     // let basket = JSON.parse(localStorage.getItem('basket'))
    //     // let id = window.location.pathname.split('/')[2]
    //     // if (basket) {
    //     //     let product_index = basket.products.findIndex(item => {
    //     //         return item.id === id
    //     //     })
    //     //     if (product_index === -1) {
    //     //         let products = { 'products': [ { 'id': id, 'count': 1 } ].concat(basket.products) }
    //     //         localStorage.setItem('basket', JSON.stringify(products));
    //     //     }
    //     //     else {
    //     //         basket.products[product_index] = { 'id': id, 'count': basket.products[product_index].count + 1 }
    //     //         localStorage.setItem('basket', JSON.stringify(basket));
    //     //     }
    //     // }
    //     // else {
    //     //     let products = { 'products': [ {'id': id, 'count': 1 } ] };
    //     //     localStorage.setItem('basket', JSON.stringify(products));
    //     // }
    //     this.setState({
    //         isLoaded: false,
    //     });
    //     let id = window.location.pathname.split('/')[2];
    //     let token = localStorage.getItem('token');
    //     axios.post(
    //         'http://127.0.0.1:8000/',
    //         {'query':'mutation { basket (token: "'+ token +'" product:'+id+') {id}}'}
    //     ).then(res => res)
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                 });
    //             },
    //             (error) => {
    //                 console.log(error)
    //                 this.setState({
    //                     isLoaded: true,
    //                     error
    //                 });
    //             }
    //         )
    // }
    componentDidMount() {
        axios.post(
            'http://localhost:8080/graphql',
            {"query":"{productById (id: "+window.location.pathname.split('/')[2]+") { id name description imagesList {id url} externalProductList {id name price url category {webShop {name}}} } }"}
        ).then(res => res)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result.data.data.productById
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, response} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return (<div className="loader-container"><div className="loader">Загрузка...</div></div>);
        } else {
            return (
                <>
        <section className="showcase">
            <h2 className="showcase__header">{this.state.response.name} {/*<span>Mantle</span>*/}</h2>
            <div className="showcase__content-wrapper">
                <div className="showcase__content">
            <Swiper
                modules={[Navigation]}
                loop={true}
                slidesPerView={3}
                speed={1800}
                centeredSlides={true}
                navigation={{
                    nextEl: '.showcase-navigation__next',
                    prevEl: '.showcase-navigation__prev',
                }}
                className="showcase-carousel">
                <div className="swiper-wrapper">
                    { response.imagesList.length > 1 ? (response.imagesList.map(slide => (
                        <SwiperSlide className="swiper-slide showcase-carousel__item" key={slide.url}>
                            <div className="showcase-carousel__image-wrapper">
                                <div className="showcase-carousel__image-left">
                                    <div className="showcase-carousel__image"
                                         style={{backgroundImage: 'url("'+ slide.url +'")'}}></div>
                                </div>
                                <div className="showcase-carousel__image-right">
                                    <div className="showcase-carousel__image"
                                         style={{backgroundImage: 'url("'+ slide.url +'")'}}></div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))): (<div className="swiper-slide showcase-carousel__item">
                            <div className="showcase-carousel__image-wrapper">
                                <div className="showcase-carousel__image-left">
                                    <div className="showcase-carousel__image"
                                         style={{backgroundImage: 'url("'+ response.imagesList[0].url +'")'}}></div>
                                </div>
                                <div className="showcase-carousel__image-right">
                                    <div className="showcase-carousel__image"
                                         style={{backgroundImage: 'url("'+ response.imagesList[0].url +'")'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Swiper>
                    <div className="showcase-navigation">
                        <div className="showcase-navigation__prev"></div>
                        <div className="showcase-navigation__next"></div>
                    </div>
                </div>
                {/*<div className="price-block">*/}
                {/*    <div className="price">{response.price} руб.</div>*/}
                {/*    /!*<button className="cybr-btn" onClick={this.BasketAddProduct}>*!/*/}
                {/*    /!*    Купить*!/*/}
                {/*    /!*    <span aria-hidden className="cybr-btn__glitch">_Купить_</span>*!/*/}
                {/*    /!*</button>*!/*/}
                {/*</div>*/}
            </div>
            <SpecificationsBlock product={response}/>
        </section>
                </>
            );
        }
    }
}
