import React from 'react'

import './../../media/css/Modal/Modal.css';

export default class SearchModal extends React.Component {
    constructor(props) {
        super(props);
        this.dismiss = this.dismiss.bind(this);
    }
    dismiss() {
        this.props.unmountMe();
    }
    render() {
        return (
            <div className="modal-form-base-seacrh">
                <div className="modal-form-body">
                    <div className="search">
                        <input type="text" className="searchTerm" placeholder="Что вы хотите найти?"/>
                        <button type="submit" className="searchButton">
                            <i className="fa fa-search">Найти</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};