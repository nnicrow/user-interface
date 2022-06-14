import React from 'react'

import {Modal} from './index';
import './../../media/css/Modal/Basket.css'
import './../../media/css/Modal/Modal.css';
import axios from 'axios';

export default class BasketModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            response: [],
            showBuyModal: false,
        };
        this.countChange = this.countChange.bind(this);
        this.deleteChange = this.deleteChange.bind(this);
        this.buyChange = this.buyChange.bind(this);
    }
    toggleBuyModal = () => {
        this.setState({
            showBuyModal: ! this.state.showBuyModal,
        })
    };
    buyChange(event, id) {
        this.setState({ isLoaded: false });
        let token = localStorage.getItem('token');
        axios.post(
            'http://127.0.0.1:8000/',
            {'query':'mutation { orders (token: "'+ token +'" id: '+id+') { id order_price } basket (token: "'+ token +'") {id count product {id name description option price images {object_id images}}}}'}
        ).then(res => res)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result.data.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        this.toggleBuyModal()
    }
    countChange(event, id) {
        this.setState({ isLoaded: false });
        let token = localStorage.getItem('token');
        axios.post(
            'http://127.0.0.1:8000/',
            {'query':'mutation { orders (token: "'+ token +'") { id order_price } basket (token: "'+ token +'" id: '+ id +' count: '+  event.target.value +') {id count product {id name description option price images {object_id images}}}}'}
        ).then(res => res)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result.data.data
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
    deleteChange(event, id) {
        this.setState({ isLoaded: false });
        let token = localStorage.getItem('token');
        axios.post(
            'http://127.0.0.1:8000/',
            {'query':'mutation { orders (token: "'+ token +'") { id order_price } basket (token: "'+ token +'" id: '+ id +' count: -1) {id count product {id name description option price images {object_id images}}}}'}
        ).then(res => res)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result.data.data
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
    componentDidMount() {
        let token = localStorage.getItem('token');
        axios.post(
            'http://127.0.0.1:8000/',
            {'query':'mutation { orders (token: "'+ token +'") { id order_price } basket (token: "'+ token +'") {id count product {id name description option price images {object_id images}}}}'}
        ).then(res => res)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result.data.data
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
        const {isLoaded, response, error, showBuyModal} = this.state;
        if (!this.props.tokenValid) {
            return (
                <div className="modal-form-base">
                    <div className="modal-form-header">Список желаний пуст. Войдите чтобы иметь возможность сделать заказ</div>
                </div>
            )
        }
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return (<div className="loader-container"><div className="loader">Загрузка...</div></div>);
        } else {
            return (
                <div className="modal-form-base">
                    { response.basket.length !== 0 ? (
                        <>
                            <div className="modal-form-header">Корзина</div>
                            <div className="wrap cf">
                                <div className="cart">
                                    <ul className="cartWrap">
                                        {response.basket.map(basket => (
                                            <li className="items" key={basket.id}>
                                                <div className="infoWrap">
                                                    <div className="cartSection">
                                                        <img src={"http://localhost:8000/media/" + basket.product.images[0].images} alt=""
                                                             className="itemImg"/>
                                                        <h3>{basket.product.name}</h3>
                                                        <p><input type="text" className="qty" placeholder={basket.count} onBlur={e => this.countChange(e, basket.id)}/> x {basket.product.price} Руб.</p>
                                                        {/*<p className="stockStatus">В наличии</p>*/}
                                                    </div>
                                                    <div className="prodTotal cartSection">
                                                        <p>{basket.product.price * basket.count} Руб.</p>
                                                    </div>
                                                    <div className="cartSection removeWrap">
                                                        <button className="remove" onClick={e => this.deleteChange(e, basket.id)}>x</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="subtotal cf" key={response.orders.id}>
                                    <ul>
                                        <li className="totalRow">
                                            <span className="label">Итого</span>
                                            <span className="value">{response.orders.order_price}</span>
                                        </li>
                                        <li className="totalRow"><a href="#" className="btn continue" onClick={e => this.buyChange(e, response.orders.id)}>Купить</a></li>
                                    </ul>
                                </div>
                            </div>
                        </>) : (<div className="modal-form-header">Корзина пуста</div>)}
                    {showBuyModal ? (
                        <Modal close={this.toggleBuyModal}>
                            <div className="modal-form-base">
                                <div className="modal-form-header">Заказ оформлен, ожидайте пока с вами свяжется наш специалист для уточнения подробностей заказа</div>
                            </div>
                        </Modal>) : null}
                </div>
            )
        }
    }
}