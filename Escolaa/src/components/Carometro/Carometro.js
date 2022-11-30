import React, { useState, useEffect } from "react";
import axios from "axios";

const Carometro = () => {
    const urlApiAlunos = "http://localhost:5046/api/aluno"
    const urlApiCursos = "http://localhost:5046/api/curso"
    const [listaDosAlunos, setAlunos] = useState([])
    const [listaFiltrada, setListaFiltrada] = useState([])
    const [listaDeCursos, setListaCursos] = useState([])
    const [dataAtualizada, setDataAtualizada] = useState(true)
    const avatar = ['micah',]

    const ramdomAvatar = () => {
        let tamanho = avatar.length
        let av = Math.floor(Math.random() * tamanho)
        let rd = avatar[av]
        return rd
    }
/*
    const getRandomLetter = () => {
        return Math.random().toString(36).substring(2, 9);
    }
*/
    const pegarInformacoesDaApi = async () => {
        await axios(urlApiAlunos)
            .then(resp => {
                setDataAtualizada(true)
                setAlunos(resp.data)
            })
            .catch(error => {
                console.error(error)
            })
        await axios(urlApiCursos)
            .then(resp => {
                setListaCursos(resp.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    useEffect(() => {
        if (dataAtualizada) {
            pegarInformacoesDaApi()
            setDataAtualizada(false)
        }
    }, [dataAtualizada])

    const getListaAtualizada = (evento) => {
        const codCurso = evento.target.value
        const lista = listaDosAlunos.filter(a => a.codCurso == codCurso);
        setListaFiltrada(lista)
        console.log(lista)
    }

    return (
        <div>
            <select name="codCurso" onChange={e => { getListaAtualizada(e) }}>
                {listaDeCursos.map(
                    (curso) =>
                        <option
                            name="codCurso"
                            value={curso.codCurso}
                        >
                            {curso.nomeCurso}
                            -
                            {curso.periodo}
                        </option>
                )}

            </select>
            <div className="text-center duration-75 rounded-lg">
                <div className="flex flex-wrap gap-5 w-screen items-center justify-between py-10 px-60 rounded-lg">
                    {listaFiltrada.map((datas) => {
                        return (
                            <div key={datas.id} className="flex flex-wrap p-5 shadow-2xl shadow-grey-700 h-[370px] rounded-lg">
                                <div className="">
                                    <div className="">
                                        <div className="w-12/12 items-center self-center place-items-center">
                                            <img src={`https://avatars.dicebear.com/api/micah/${getRandomLetter()}.svg`} alt={datas.nome} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col flex-wrap w-[180px] pt-5 gap-3 text-left">
                                        <span className="text-xl font-medium">{datas.nome}</span>
                                        <span className="font-medium">RA: {datas.ra}</span>
                                        <span className="">Curso: {datas.codCurso}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Carometro