import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    
    /**
     * UseEffect serve para podemos dispararmos uma função em um detarminado momento do componiente
     * O array vazio como segundo parametro significa que será executad apenas uma unica vez, no carregamento da rota
     * 
     * @param function que será executada
     * @param Array são os dados que QUANDO sofrente alteração, executem a funcao
     */
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            /** 
             * Mudo o estado da variavel que armazena todos os incidents 
             * para que a lista possa ser atualizada depois que faço o delete.
             * Outra forma de atualizar a listagem, seria fazer uma função específica para retornar todos os casos
             * atraves da api novamente
             */
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(params) {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={ () => handleDeleteIncident(incident.id) } type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}