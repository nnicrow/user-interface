import React from 'react';

import './../../media/css/Product/SpecificationsBlock.css'

export default function SpecificationsBlock(props){
    if (props.product.description || props.product.option)
    return (
        <>
        {
            props.product.description !== "null" ? (
                <div className="specifications-block">
                    <div className="description_header">
                        {props.product.name}
                    </div>
                <div className="description">
                    {props.product.description}
                </div>
                    <div className="description_header">
                        Где купить
                    </div>
                    <div className="description">
                        {
                            props.product.externalProductList.map ( externalProduct =>
                                <a className="externalProduct" key={externalProduct.id} href={externalProduct.url}>
                                    <span className="externalProductWebShop">{externalProduct.category.webShop.name}</span>
                                    <span className="externalProductName">{externalProduct.name}</span>
                                    <span className="externalProductPrice">{externalProduct.price}</span>
                                </a>
                            )
                        }
                    </div>
                </div>
            ) : null
        }
            {/*{*/}
            {/*    props.product.description ? (*/}
            {/*        props.product.description.blocks.map(description => (*/}
            {/*            <div key={description.header}>*/}
            {/*                <div className="description_header">*/}
            {/*                    {description.header}*/}
            {/*                </div>*/}
            {/*                <div className="description">*/}
            {/*                    {description.description}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ))*/}
            {/*    ) : null}*/}
            {/*{*/}
            {/*    props.specifications.option ? (*/}
            {/*        <>*/}
            {/*            <div className="description_header">*/}
            {/*                Характеристики*/}
            {/*            </div>*/}
            {/*            {props.specifications.option.blocks.map(option =>(*/}
            {/*                <div className="option" key={option.blockname}>*/}
            {/*                    <div className="option-header">*/}
            {/*                        {option.blockname}*/}
            {/*                    </div>*/}
            {/*                    {option.options.map(feature =>(*/}
            {/*                        <div className="option-value" key={feature.value}>*/}
            {/*                            <ul>*/}
            {/*                                <li>{feature.value}</li>*/}
            {/*                            </ul>*/}
            {/*                        </div>*/}
            {/*                    ))}*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </>*/}
            {/*    ) : null}*/}
        </>
    );
    else return null;
};