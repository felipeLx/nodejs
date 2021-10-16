import React, { useEffect } from 'react';

import cleaning from '../../../assets/images/cleaning.png';
import office from '../../../assets/images/office.png';
import toys from '../../../assets/images/toys.png';
import './Carousel.css';

const carousel = () => (
    <div id='carouselExampleIndicators' className='carousel slide carousel-main' data-ride='carousel'>
        <div className='carousel-inner'>
            <div className='carousel-item active'>
                <img className='w-100' src={cleaning} alt='First slide' />
                <div className='carousel-caption my-caption'>
                    <h5>Produtos de Limpeza</h5>
                    <p>Mehores preços e variedade de marcas</p>
                </div>
            </div>
            <div className='carousel-item'>
                <img className='w-100' src={office} alt='Second slide' />
                <div className='carousel-caption my-caption'>
                    <h5>Produtos de escritório</h5>
                    <p>Tudo que você precisa para o seu escritório</p>
                </div>
            </div>
            <div className='carousel-item'>
                <img className='w-100' src={toys} alt='Third slide' />
                <div className='carousel-caption my-caption'>
                    <h5>Binquedos e Jogos</h5>
                    <p>Para a criança que levamos dentro</p>
                </div>
            </div>
        </div>   
    </div> 
);

export default carousel;