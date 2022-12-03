import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Main from '../template/Main';

const title = "Cadastro de Receitas!";

const urlAPI = "http://localhost:5209/api/receita";

const initialState = {
    receita: { id: 0, nome: '', ingredientes: '', preparo: '' },
    lista: []
}

export default function CrudReceitas( ) {
    const [receita, setReceita] = useState(initialState.receita)
    const [lista, setLista] = useState(initialState.lista)
    
    useEffect(() => {
        axios(urlAPI).then(resp => {
            setLista( resp.data) 
            console.log(resp.data)
        })
    })
/*
    const limpar =() =>{
        setReceita({ receita: initialState.receita });
    }

    const salvar =() => { 
        const metodo = receita.id ? 'put' : 'post';
        const url = receita.id ? `${urlAPI}/${receita.id}` : urlAPI;
            axios[metodo](url, receita)
        .then(resp => {
            const lista = getListaAtualizada(resp.data)
            setReceita({ receita: initialState.receita, lista })
            window.location.href = "http://localhost:3000/receitas/"

        })
    }
    
    const getListaAtualizada =(receita, add = true)=>{
        const lista1 = lista.filter(a => a.id !== receita.id);
        if (add) lista1.unshift(receita);
        return lista1;
    }
    
    const atualizaCampo =(event)=> { // 
        const curso1 = { ...receita };
        curso1[event.target.name] = event.target.value;
        setReceita( curso1 );
    }

    const carregar =(receita)=> {
        setReceita( receita )
    }

    const remover =(receita)=> {
        const url = urlAPI + "/" + receita.id;
        if (window.confirm("Confirma remoção da receita: " + receita.nome)) {
            console.log("entrou no confirm");
            axios['delete'](url, receita)
                .then(resp => {
                    const lista = getListaAtualizada(receita, false)
                    setReceita({ receita: initialState.receita, lista })
                })
        }
    }

const Receitas = () => {
    const [lista, setLista] = useState(initialState.lista)
    useEffect(() => {
        axios(urlAPI).then(resp => {
            setLista(resp.data)
        })
    }, [])
    */

    const renderTable = () => {
        return (
            <div className="listagem">
                <table className="listaReceitas" id="tblListaReceitas">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloIngredientes">Ingredientes</th>
                            <th className="tabTituloPreparo">Modo de Preparo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(
                            (receita) =>
                                <tr key={receita.id}>
                                    <td>{receita.nome}</td>
                                    <td>{receita.ingredientes}</td>
                                    <td>{receita.preparo}</td>
                                    
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <Main title={title}>
            {renderTable()}
        </Main>
    )
}


