import React from 'react';
import {Link} from "react-router-dom";

import profile from '../media/images/avatars.svg'
import notification from '../media/images/notification.svg'
import basket from '../media/images/basket.svg'
import search from '../media/images/search.svg'
import shop from '../media/images/shop.svg'

import '../media/css/Navbar.css'

export default class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.toggleShopModal = this.toggleShopModal.bind(this);
        this.toggleSearchModal = this.toggleSearchModal.bind(this);
        this.toggleBasketModal = this.toggleBasketModal.bind(this);
        this.toggleNotificationModal = this.toggleNotificationModal.bind(this);
        this.toggleProfileModal = this.toggleProfileModal.bind(this);

    }
    handleClick() { document.querySelector('.overlay-menu').classList.toggle('overlay-menu-closed');}
    toggleShopModal () { this.props.toggleShopModal(); }
    toggleSearchModal () { this.props.toggleSearchModal(); }
    toggleBasketModal () { this.props.toggleBasketModal(); }
    toggleNotificationModal () { this.props.toggleNotificationModal(); }
    toggleProfileModal () { this.props.toggleProfileModal(); }
    render() {
    return (
        <>
            <nav id="navbar" className="">
                <div className="nav-wrapper">
                    <div className="logo">
                        <Link className="fas fa-chess-knight" to={'/'}>Nnicrow</Link>
                    </div>
                    <ul id="menu">
                        <li><img className="navbar-icons" src={shop} alt="shop" onClick={this.toggleShopModal}/></li>
                        <li><img className="navbar-icons" src={search} alt="search" onClick={this.toggleSearchModal}/></li>
                        <li><img className="navbar-icons" src={basket} alt="basket" onClick={this.toggleBasketModal}/></li>
                        {this.props.tokenValid ? (
                            <li><img className="navbar-icons" src={notification} alt="notification" onClick={this.toggleNotificationModal}/></li>
                            ) : null}
                        <li><img className="navbar-icons" src={profile} alt="profile" onClick={this.toggleProfileModal}/></li>
                        {/*<li><Link className="navbar-content" to={'/info/'}>Подробности</Link></li>*/}
                        {/*<li><span className="navbar-content">Категории</span></li>*/}
                    </ul>
                </div>
            </nav>
            <div className="menuIcon">
                <div className="icon icon-bars" onClick={this.handleClick}></div>
                <div className="icon icon-bars overlay" onClick={this.handleClick}></div>
            </div>
            <div className="overlay-menu overlay-menu-closed">
                <ul id="menu">
                    <li><a href="#сategories">Категории</a></li>
                    <li><a href="#about">Поиск</a></li>
                    <li><a href="#about">Корзина</a></li>
                    <li><a href="#about">Уведомления</a></li>
                    <li><a href="#contact">Профиль</a></li>
                </ul>
            </div>
        </>
    );
}
}