import api from '../utils/api'

//HOOKS
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    // const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    // const history = useNavigate()

    async function register(user) {

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'

        try {
            //COMUNICAÇÃO COM A API
            const data = await api.post('/users/register', user)
                .then((response) => {
                    return response.data
                })
            // await authUser(data)


        } catch (err) {

            msgText = err.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)

    }

    return { register }

}