import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    function navigateToDetail(incident,) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
    
        /**
         * Lógica da paginação
         * 1. Loading começa como false, então ele inicia a requisição para a api.
         * 2. Se o total for > 0 ( o que singifica que já ouve uma requisição) e o total de itens no array de incidents for igual ao total de incidentes, significa que ja chegou ao final da lista e que não é mais necessário realizar requisições;
         * 2. Loading passa a ser true para dizer para aplicação que uma requisição está sendo feita. Isso ocorre para evitar várias requisições simultaneas para buscar os dados;
         * 3. É feito a requisição na api passando o page=1;
         * 4. O page passa ser page+1, para controlar a paginação;
         * 5. Após a requisição feita, o loading passa a ser false, liberando a aplicação para realizar uma nova requisição.
         */
        if(loading){
            return;
        }

        if(total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents',{
            params: { page }
        });
        /**
         * Uso spread operator para juntar os dois arrays em um único array
         */
        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>
                                {
                                    Intl.NumberFormat('pt-BR', 
                                    { 
                                        style: 'currency', currency: 'BRL'
                                    }).format(incident.value)
                                }
                            </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

/**
 * Parametros do FlatList
 * data = Array com os dados que serão iterados na lista
 * keyExtractor = a chave única de cada item da lista
 * showsVerticalScrollIndicator = desabilita a bara vertical do scroll
 * renderItem = metodo contado do JSX 
 * onEndReached = Executa uma ação quando chega no final da lista
 * onEndReachedThreshold = representa o percentual (0 a 1) de quanto o usuario precisa estar para o final da lista para executar a funcao definida em onEndReached
 */