import React from 'react';

import './Footer.css';

const footer = () => (
    <footer className='footer'>
        <section>
            <div className='footer-list'>
                <ul>
                    <a href='#'>Quem somos</a>
                    <a href='#'>Trabalhe Conosco</a>
                        <a href='#'>Contatos</a>
                </ul>
            </div>
        </section>
        <section>
            <div className='footer-media'>
                <a href='#' target='_blank'><i className="fab fa-facebook-f icon"></i></a>
                <a href='#' target='_blank'><i style={{paddingLeft: '5px'}} className="fab fa-instagram icon"></i></a>
            </div>
        </section>
        <section>
            <p>© {new Date().getFullYear()} Felipe Lisboa.</p>
        </section>
    </footer>
);

export default footer;