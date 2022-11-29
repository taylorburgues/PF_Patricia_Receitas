/*
import Main from "../template/Main"
import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';

const title = "Cadastro de Receitas";

const urlAPI = "http://localhost:5046/api/aluno";
const initialState = {
    receita: { id: 0, nome: '', ingredientes: '', preparo: '' },
    lista: [{ id: 0, nome: '', ingredientes: '', preparo: '' }, { id: 0, nome: '', ingredientes: '', preparo: '' }]
}

const cursourlAPI = "http://localhost:5046/api/curso";
const cursoinitialState = {
    curso: { id: 0, codCurso: 0, nomeCurso: '', periodo: '' },
    cursoLista: []
}

export default class Home extends Component {

    state = { ...initialState, ...cursoinitialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
        axios(cursourlAPI).then((resp) => {
            this.setState({ cursoLista: resp.data });
        })
    }
    limpar() {
        this.setState({ aluno: initialState.aluno });
    }
    salvar() {
        const aluno = this.state.aluno;
        aluno.codCurso = Number(this.state.curso.codCurso);
        const metodo = aluno.id ? 'put' : 'post';
        const url = aluno.id ? `${urlAPI}/${aluno.id}` : urlAPI;
        axios[metodo](url, aluno)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ aluno: initialState.aluno, lista })
            })
    }
    getListaAtualizada(aluno, add = true) {
        const lista = this.state.lista.filter(a => a.id !== aluno.id);
        if (add) lista.unshift(aluno);
        return lista;
    }
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const aluno = { ...this.state.aluno };
        //usar o atributo NAME do input para identificar o campo a ser atualizado
        aluno[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ aluno });
    }

    atualizaCurso(evento) {
        const curso = { ...this.state.curso };
        curso[evento.target.name] = evento.target.value
        this.setState({ curso })
    }

    carregar(aluno) {
        this.setState({ aluno })
    }

    remover(aluno) {
        const url = urlAPI + "/" + aluno.id;
        if (window.confirm("Confirma remoção do aluno: " + aluno.ra)) {
            console.log("entrou no confirm");
            axios['delete'](url, aluno)
                .then(resp => {
                    const lista = this.getListaAtualizada(aluno, false)
                    this.setState({ aluno: initialState.aluno, lista })
                })
        }
    }
    renderForm() {
        return (
            <div className="inclui-container">
                <label> Nome da Receita: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome da Receita"
                    className="form-input"
                    name="nome"

                    value={this.state.receita.nome}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Ingredientes: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Ingredientes"
                    className="form-input"
                    name="ingredientes"

                    value={this.state.receita.ingredientes}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Modo de Preparo: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Modo de Preparo"
                    className="form-input"
                    name="preparo"

                    value={this.state.receita.preparo}

                    onChange={e => this.atualizaCampo(e)}
                />


                <button className="btnSalvar"
                    onClick={e => this.salvar(e)} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={e => this.limpar(e)} >
                    Cancelar
                </button>
            </div>
        )
    }
    renderTable() {
        return (
            <div className="listagem">
                <table className="listaAlunos" id="tblListaAlunos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloRa">Ra</th>
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloCurso">Curso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lista.map(
                            (aluno) =>
                                <tr key={aluno.id}>
                                    <td>{aluno.ra}</td>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.codCurso}</td>
                                    <td>
                                        <button onClick={() => this.carregar(aluno)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(aluno)} >
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
    render() {
        return (
            <Main title={title}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import Main from '../template/Main';

const title = "Cadastro de Cursos!";

const urlAPI = "http://localhost:5046/api/curso";
const initialState = {
    receita: { id: 0, nome: '', ingredientes: '', preparo: '' },
    lista: []
}


export default function CrudCurso( ) {
    const [receita, setReceita] = useState(initialState.receita)
    const [lista, setLista] = useState(initialState.lista) 
    useEffect(() => {
        axios(urlAPI).then(resp => {
            setLista( resp.data)
        })
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
                <label> Nome dos Ingredientes: </label>
                <input
                    type="text"
                    id="ingrediente"
                    placeholder="Nome do ingrediente"
                    className="form-input"
                    name="ingrediente"
                    value={receita.ingrediente}
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
                            <th className="tabTituloCodigo">Codigo</th>
                            <th className="tabTituloNome">Nome do curso</th>
                            <th className="tabTituloPeriodo">Periodo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(
                            (curso) =>
                                <tr key={curso.id}>
                                    <td>{curso.codCurso}</td>
                                    <td>{curso.nomeCurso}</td>
                                    <td>{curso.periodo}</td>
                                    <td>
                                        <button onClick={() => carregar(curso)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => remover(curso)} >
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
                {renderForm()}
                {renderTable()}
            </Main>
        )
}
