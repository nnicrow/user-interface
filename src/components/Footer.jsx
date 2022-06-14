import '../media/css/Footer.css'

const Footer = () => {
    return (
        <footer className="footer-clean">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-4 col-md-3 item">
                            <h3>Адреса магазинов</h3>
                            <ul>
                                <li>Подробности</li>
                            </ul>
                        </div>
                        <div className="col-sm-4 col-md-3 item">
                            <h3>Доставка</h3>
                            <ul>
                                <li>Подробности</li>
                            </ul>
                        </div>
                        <div className="col-sm-4 col-md-3 item">
                            <h3>Контакты</h3>
                            <ul>
                                <li>Почта</li>
                                <li>Номер телефона</li>
                            </ul>
                        </div>
                        <div className="col-lg-3 item social">
                            <a href="https://www.facebook.com/nnicrow/"><i className="icon ion-social-facebook"></i></a>
                            <a href="https://www.instagram.com/nnicrow/"><i className="icon ion-social-instagram"></i></a>
                            <p className="copyright">nnicrow © 2022</p>
                        </div>
                    </div>
                </div>
        </footer>
    );
}

export default Footer;