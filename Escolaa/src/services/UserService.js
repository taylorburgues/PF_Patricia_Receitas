import axios from 'axios'
import auth from './AuthService'

const API_URL = 'http://localhost:5209/api/'
// Cadastro Receitas: role chef e admin
// Deletar receitas: role admin
// Lista de receitas: todos

const getPublicContent = () => {
    //return axios.get(API_URL + 'carometro')
}

const getPublicReceita = {
    getReceita: () => {
        return axios.get(API_URL + 'receita')
    },
    getCurrentUser: () => {
        return axios.get(API_URL + 'home')
    },
}

const headerAuthorization = () => {
    return {
        headers: {
            Authorization: 'Bearer ' + auth.getCurrentUser().token
        }
    }
}

const getChefBoardReceita = async () => {
    return await axios.get(API_URL + 'receita', headerAuthorization())
}

const getAdminBoardReceita = async () => {
    return await axios.get(API_URL + 'receita', headerAuthorization())
}

const salvarReceita = async (method, url, Receita) => {
    return await axios[method](url, Receita, headerAuthorization())
}

const deletarReceita= async (id) => {
    return await axios.delete(API_URL + 'receita/' + id, headerAuthorization())
}

const UserService = {
    getPublicContent,
    //getPublicReceita,
    getChefBoardReceita: getChefBoardReceita,
    getAdminBoardReceita: getAdminBoardReceita,
    salvarReceita: salvarReceita,
    deletarReceita: deletarReceita,
}

export default UserService