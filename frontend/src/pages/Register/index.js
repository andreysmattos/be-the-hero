import React from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';

import LogoImg from '../../assets/logo.svg'

export default function Register() {
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessaos a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Não tenho cadastro
                        </Link>
                </section>
                <form>
                    <input placeholder="Nome da ONG" />
                    <input type="email" placeholder="E-mail" />
                    <input placeholder="Whatsapp" />
                    <div className="input-group">
                        <input placeholder="Cidade" />
                        <input placeholder="UF" style={{ width: '80px' }} />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
