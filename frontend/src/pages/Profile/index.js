import React, { useEffect, useState } from 'react';
import './styles.css';
import LogoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

export default function Profile() {

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('id');

    const [incidents, setIncidents] = useState([])
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        // console.log('id on Delete', id)
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });
            setIncidents( incidents.filter(item => item.id !== id) );

        } catch (e) {
            alert('Erro ao deletar o caso, tente novamente!')
        }
    }

    function handleLogout(){
        localStorage.clear()
        console.log('clean localStorage 5758');
        history.push('/')
    }


    return (
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt="Be the Hero" />
                <span> Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new"> Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout} >
                    <FiPower size="18" color="#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>


                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button type="button" onClick={ () => handleDeleteIncident(incident.id) }>
                            <FiTrash2 size="20" color="#a8a8b3" />
                        </button>
                    </li>
                ))}


            </ul>

        </div>
    );
}