import React from 'react';
import {Routes, Route} from "react-router-dom";

import axios from 'axios';

import {ShopModal, SearchModal, BasketModal, NotificationModal, ProfileModal, Modal} from './Modal';
import {Navbar, Footer, Shop, Categories, Manufactureres} from './index'
import {Product} from './Product/index'
import ScrollToTop from "./ScrollToTop";

import '../media/css/App.css'

import back_video from '../media/videos/smoke-background-optimized.mp4';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            response: [],
            tokenValid: false,
            showShopModal: false,
            showSearchModal: false,
            showBasketModal: false,
            showNotificationModal: false,
            showProfileModal: false,
        };
        this.loginTogle = this.loginTogle.bind(this);
        this.BasketAddProduct = this.BasketAddProduct.bind(this);
    }
    toggleShopModal = () => {
        this.setState({
            showShopModal: ! this.state.showShopModal,
            showSearchModal: false,
            showBasketModal: false,
            showNotificationModal: false,
            showProfileModal: false,
        })};
    toggleSearchModal = () => {
        this.setState({
            showSearchModal: ! this.state.showSearchModal,
            showShopModal: false,
            showBasketModal: false,
            showNotificationModal: false,
            showProfileModal: false,
        })};
    toggleBasketModal = () => {
        this.setState({
            showBasketModal: ! this.state.showBasketModal,
            showShopModal: false,
            showSearchModal: false,
            showNotificationModal: false,
            showProfileModal: false,
        })};
    toggleNotificationModal = () => {
        this.setState({
            showNotificationModal: ! this.state.showNotificationModal,
            showShopModal: false,
            showSearchModal: false,
            showBasketModal: false,
            showProfileModal: false,
        })};
    toggleProfileModal = () => {
        this.setState({
            showProfileModal: ! this.state.showProfileModal,
            showShopModal: false,
            showSearchModal: false,
            showBasketModal: false,
            showNotificationModal: false,
        })};
    loginTogle(){
        this.setState({
                showProfileModal: false,
                tokenValid: ! this.state.tokenValid,
        })
    };
    BasketAddProduct(){
        this.setState({
            showShopModal: false,
            showSearchModal: false,
            showBasketModal: false,
            showNotificationModal: false,
            showProfileModal: false,
        })
    };
    componentDidMount() {
        // if ( localStorage.getItem('token') !== null) {
        //     axios.post(
        //         'http://127.0.0.1:8000/',
        //         {'query':'{isAuthenticated(token: "'+localStorage.getItem('token')+'")}'}
        //     ).then(res => res)
        //         .then(
        //             (result) => {
        //                 this.setState({
        //                     tokenValid: result.data.data.isAuthenticated
        //                 });
        //             },
        //             (error) => {
        //                 this.setState({
        //                     error
        //                 });
        //             }
        //         )
        // }
        axios.post(
            'http://localhost:8080/graphql',
            {"query":"{sliderList { id name description path} productList { id name imagesList {id url} }}"}
        ).then(res => res)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    return null
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
            const { showShopModal, showSearchModal, showBasketModal, showNotificationModal, showProfileModal, tokenValid} = this.state;
            return (
                <>
                    <Navbar
                        unmountMe={this.handleChildUnmount}
                        toggleShopModal={this.toggleShopModal}
                        toggleSearchModal={this.toggleSearchModal}
                        toggleBasketModal={this.toggleBasketModal}
                        toggleNotificationModal={this.toggleNotificationModal}
                        toggleProfileModal={this.toggleProfileModal}
                        tokenValid={tokenValid}
                    />
                    <ScrollToTop>
                        <Routes>
                            <Route path="/" element={<Shop query={response.data}/>}/>
                            <Route path="product/" element={<Product query={response.data} BasketAddProduct={this.BasketAddProduct}/>}>
                                <Route path=":productId" element={<Product query={response.data} />}/>
                            </Route>
                            {/*<Route path="categories/" element={<Categories query={response.data}/>}>*/}
                            {/*    <Route path=":categoriesId" element={<Categories query={response.data}/>}/>*/}
                            {/*</Route>*/}
                            {/*<Route path="manufactureres/" element={<Manufactureres query={response.data}/>}>*/}
                            {/*    <Route path=":manufactureresID" element={<Manufactureres query={response.data}/>}/>*/}
                            {/*</Route>*/}
                            <Route path="*" element={
                                <div className="not-found">
                                    Тут ничего нет
                                </div>
                            }>
                            </Route>
                        </Routes>
                    </ScrollToTop>
                    <video src={back_video} className="background__video" autoPlay loop muted></video>
                    <Footer/>

                    {showShopModal ? (
                        <Modal close={this.toggleShopModal}>
                            <ShopModal tokenValid={tokenValid}/>
                        </Modal>) : null}
                    {showSearchModal ? (
                        <Modal close={this.toggleSearchModal}>
                            <SearchModal tokenValid={tokenValid}/>
                        </Modal>) : null}
                    {showBasketModal ? (
                        <Modal close={this.toggleBasketModal}>
                            <BasketModal tokenValid={tokenValid}/>
                        </Modal>) : null}
                    {showNotificationModal ? (
                        <Modal close={this.toggleNotificationModal}>
                            <NotificationModal tokenValid={tokenValid}/>
                        </Modal>) : null}
                    {showProfileModal ? (
                        <Modal close={this.toggleProfileModal}>
                            <ProfileModal unmountMe={this.loginTogle} tokenValid={tokenValid}/>
                        </Modal>) : null}
                </>
            );
        }
    }
}
