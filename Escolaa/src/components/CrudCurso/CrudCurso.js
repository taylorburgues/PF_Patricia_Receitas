import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CrudCurso.css';
import Main from '../template/Main';

const title = "Cadastro de Cursos!";

const urlAPI = "http://localhost:5046/api/curso";
const initialState = {
    curso: { id: 0, codCurso: 0, nomeCurso: '', periodo: '' },
    lista: []
}

export default function CrudCurso( ) {
    const [curso, setCurso] = useState(initialState.curso)
    const [lista, setLista] = useState(initialState.lista) 
    useEffect(() => {
        axios(urlAPI).then(resp => {
            setLista( resp.data)
        })
    })
    const limpar =() =>{
        setCurso({ curso: initialState.curso });
    }
    const salvar =() => {
            curso.codCurso = Number(curso.codCurso);
        const metodo = curso.id ? 'put' : 'post';
        const url = curso.id ? `${urlAPI}/${curso.id}` : urlAPI;
            axios[metodo](url, curso)
        .then(resp => {
            const lista = getListaAtualizada(resp.data)
            setCurso({ curso: initialState.curso, lista })

        })
    }
    const getListaAtualizada =(curso, add = true)=>{
        const lista1 = lista.filter(a => a.id !== curso.id);
        if (add) lista1.unshift(curso);
        return lista1;
    }
    
    const atualizaCampo =(event)=> {
        const curso1 = { ...curso };
        curso1[event.target.name] = event.target.value;
        setCurso( curso1 );
    }
    const carregar =(curso)=> {
        setCurso( curso )
    }
    const remover =(curso)=> {
        const url = urlAPI + "/" + curso.id;
        if (window.confirm("Confirma remoção do aluno: " + curso.ra)) {
            console.log("entrou no confirm");
            axios['delete'](url, curso)
                .then(resp => {
                    const lista = getListaAtualizada(curso, false)
                    setCurso({ curso: initialState.curso, lista })
                })
        }
    }
    const renderForm =()=> {
        return (
            <div className="inclui-container">
                <label> Codigo: </label>
                <input
                    type="number"
                    id="codCurso"
                    className="form-input"
                    name="codCurso"
                    value={curso.codCurso}
                    onChange={e => atualizaCampo(e)}
                />
                <label> Nome do Curso: </label>
                <input
                    type="text"
                    id="nomeCurso"
                    placeholder="Nome do curso"
                    className="form-input"
                    name="nomeCurso"
                    value={curso.nomeCurso}
                    onChange={e => atualizaCampo(e)}
                />
                <label> Periodo: </label>
                <input
                    type="text"
                    id="periodo"
                    placeholder="Periodo"
                    className="form-input"
                    name="periodo"
                    value={curso.periodo}
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


