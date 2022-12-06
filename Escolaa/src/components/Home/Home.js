import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import Main from '../template/Main';


const title = "Cadastro de Receitas!";


const urlAPI = "http://localhost:5209/api/receita";

const initialState = {
    receita: { id: 0, nome: '', ingredientes: '', preparo: '' },
    lista: []
}

const user = JSON.parse(localStorage.getItem("user"));

export default function Home() {
    const [receita, setReceita] = useState(initialState.receita)
    const [lista, setLista] = useState(initialState.lista)
    
    useEffect(() => {
        axios(urlAPI).then(resp => {
            setLista( resp.data)
        })
    })

    const componentDidMount =(() => {
        /*axios(urlAPI).then(resp => {
        //console.log(resp.data)
        this.setState({ lista_aluno: resp.data });
        })*/
        axios(urlAPI, { headers: { Authorization: 'Bearer ' + user.token } })
        .then(resp => {
                this.setState( { lista_aluno: resp.data } );
            },
            (error) => {
                const _mens =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                    this.setState( { mens: _mens });
            }
        );
    })

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
    
    const atualizaCampo =(event)=> {
        const curso1 = { ...receita };
        curso1[event.target.name] = event.target.value;
        setReceita( curso1 );
    }
    const carregar =(receita)=> {
        setReceita( receita )
    }
    const remover =(receita)=> {
        const url = urlAPI + "/" + receita.id;
        if (window.confirm("Confirma remoção do aluno: " + receita.ra)) {
            console.log("entrou no confirm");
            axios['delete'](url, receita)
                .then(resp => {
                    const lista = getListaAtualizada(receita, false)
                    setReceita({ receita: initialState.receita, lista })
                })
        }
    }
    const renderForm =()=> {
        return (
            <div className="inclui-container">
                <label> Nome da Receita: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome da Receita"
                    className="form-input"
                    name="nome"
                    value={receita.nome}
                    onChange={e => atualizaCampo(e)}
                />
                <label> Ingredientes: </label>
                <input
                    type="text"
                    id="ingrediente"
                    placeholder="Ingredientes"
                    className="form-input"
                    name="ingredientes"
                    value={receita.ingredientes}
                    onChange={e => atualizaCampo(e)}
                />
                <label> Modo de Preparo: </label>
                <input
                    type="text"
                    id="preparo"
                    placeholder="Modo de Fazer"
                    className="form-input"
                    name="preparo"
                    value={receita.preparo}
                    onChange={e => atualizaCampo(e)}
                />
                <button className="btnSalvar"
                    onClick={e => salvar(e)} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={e => limpar(e)} >
                    Cancelar
                </button>
            </div>
        )
    }
    
    const renderTable =()=> {
        return (
            <div className="listagem">
                <table className="listaCurso" id="tblListaCurso">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloNome">Alterar</th>
                            <th className="tabTituloNome">Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(
                            (receita) =>
                                <tr key={receita.id}>
                                    <td>{receita.nome}</td>
                                    <td> 
                                        <button onClick={() => carregar(receita)} >  
                                            Alterar
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => remover(receita)} >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    
        return (
            <Main title={title}>
                {(this.mens) ? 
                    "Erro" + this.mens :
                    renderForm() ||
                    renderTable()}
            </Main>
        )

}
