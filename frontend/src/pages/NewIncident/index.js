import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('id');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();
        try {
            const data = {
                title,
                description,
                value
            }

            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile');
            
        } catch (error) {
            alert('Erro ao cadastrar, tente novamente!')
        }

    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                        </Link>

                </section>
                <form onSubmit={handleNewIncident}>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titulo do caso" />
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição"></textarea>
                    <input value={value} onChange={e => setValue(e.target.value)} placeholder="Valor em reais" />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}