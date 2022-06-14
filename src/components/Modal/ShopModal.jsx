import React from 'react'
import {Link} from "react-router-dom";

import axios from 'axios';

import './../../media/css/Modal/Modal.css';

export default class ShopModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            response: [],
        };
        this.dismiss = this.dismiss.bind(this);
    }
    dismiss() {
        this.props.unmountMe();
    }
    componentDidMount() {
        axios.post(
            'http://127.0.0.1:8000/',
            {"query":"{categories{id name} manufacturers{id name}}"}
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
                }
            )
    }
    render() {

        const {error, isLoaded, response} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return null;
        } else {
            return (
                <div className="modal-form-base">
                    <div className="modal-form-header">Каталог</div>
                    <div className="modal-form-body">
                        <div className="modal-form-block-header">
                            Категории
                        </div>
                        <div className="modal-form-block">
                            {response.data.data.categories.map(categorie =>(
                                    <div key={categorie.id} onClick={this.dismiss}>
                                        <Link to={'/categories/'+categorie.id}>{categorie.name}</Link>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="modal-form-body">
                        <div className="modal-form-block-header">
                            Производители
                        </div>
                        <div className="modal-form-block">
                            {response.data.data.manufacturers.map(manufacturer =>(
                                    <div key={manufacturer.id} onClick={this.dismiss}>
                                        <Link to={'/manufactureres/'+manufacturer.id}>{manufacturer.name}</Link>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            );
        }
    }
}
