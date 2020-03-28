import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import HeroesImg from '../../assets/heroes.png'
import LogoImg from '../../assets/logo.svg'

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('session', {id});
            localStorage.setItem('id', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
            // console.log(response);

        } catch (error) {
            alert('Tente novamente!');
        }




    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={LogoImg} alt="Be The Hero" />
                <form onSubmit={handleLogin} >
                    <h1>Faça seu Logon</h1>
                    <input value={id} onChange={e => setId(e.target.value)} type="text" placeholder="Sua ID" />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={HeroesImg} alt="Heroes" />

        </div >
    )
}