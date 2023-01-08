//HOOKS
import { useState, useEffect } from 'react';
import useFlashMessage from '../hooks/useFlashMessage'
import { useParams } from 'react-router-dom';
//UTILS
import api from '../utils/api'

//CSS
import styles from './Profile.module.css'
import formStyles from '../components/form/Form.module.css'

import Input from '../components/form/Input'


const Profile = () => {

    const { id } = useParams()

    const [user, setUser] = useState({});
    const [preview, setPreview] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    function onFileChange(e) {
        //file list é transformado em array
        // setUser({ ...user, images: [...e.target.files] })
        setPreview(e.target.files)
        //const setImageUser = Array.from(e.target.files).map((im) => { return im.name })
        setUser({ ...user, images: [...e.target.files] })
        console.log([...e.target.files])
    }

    // Array.from(e.target.files).map((im) => { return im.name })

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let msgType = 'success'

        const formData = new FormData()

        // const userFormData = await Object.keys(user).forEach((key) =>
        //     formData.append(key, user[key]),)

        const userFormData = await Object.keys(user).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < user[key].length; i++) {
                    formData.append(`images`, user[key][i])
                }
            } else {
                formData.append(key, user[key])
            }
        })

        formData.append('user', userFormData)
        console.log(formData)

        const data = await api
            .patch(`/users/edit/${user._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(response.data)
                return response.data
            })
            .catch((err) => {
                console.log(err)
                msgType = 'error'
                return err.response.data
            })

        setFlashMessage(data.message, msgType)


    }

    useEffect(() => {

        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token]);

    return (
        <section>
            <h1>Edição de Perfil</h1>
            {(user.image || preview) && (
                <div className={styles.preview_pet_images}>
                    {preview.length > 0
                        ? preview.map((image, index) => (
                            <img src={URL.createObjectURL(image)} alt={user.name} key={`${user.name}+${index}`} />
                        ))
                        : user.images &&
                        user.images.map((image, index) => (
                            <img src={`http://localhost:5000/images/users${image}`} alt={user.name} key={`${user.name}+${index}`} />
                        ))
                    }
                </div>
            )}
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input
                    text='Fotos'
                    type='file'
                    name='images'
                    handleOnChange={onFileChange}
                    multiple={true}
                />

                <Input
                    text='Nome'
                    type='text'
                    name='name'
                    placeholder='Digite o seu email'
                    handleOnChange={handleChange}
                    value={user.name || ''}
                />
                <Input
                    text='E-mail'
                    type='email'
                    name='email'
                    placeholder='Digite o seu email'
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />
                <Input
                    text='Senha'
                    type='password'
                    name='password'
                    placeholder='Digite a sua senha'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Confirmação de senha'
                    type='password'
                    name='confirmpassword'
                    placeholder='Confirme a sua senha'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Idade'
                    type='number'
                    name='age'
                    placeholder='Digite a sua idade'
                    handleOnChange={handleChange}
                    value={user.age || ''}
                />
                <Input
                    text='Telefone'
                    type='number'
                    name='phone'
                    placeholder='Digite a sua telefone'
                    handleOnChange={handleChange}
                    value={user.phone || ''}
                />
                <label htmlFor="textarea" className={styles.textLabel}>Descrição</label><br />
                <textarea
                    className="textarea"
                    name='bio'
                    placeholder='Fale sobre você...'
                    onChange={handleChange}
                    value={user.bio || ''}
                ></textarea>
                <Input
                    text='Cidade'
                    type='text'
                    name='city'
                    placeholder='Insira a sua cidade'
                    handleOnChange={handleChange}
                    value={user.city || ''}
                />
                <Input
                    text='Estado'
                    type='text'
                    name='nation'
                    placeholder='Insira a seu estado'
                    handleOnChange={handleChange}
                    value={user.nation || ''}
                />
                <Input
                    text='Estou interessado em'
                    type='text'
                    name='interest'
                    placeholder='Homens, Mulheres, .....'
                    handleOnChange={handleChange}
                    value={user.interest || ''}
                />
                <input type="submit" value="Editar" />
            </form>
        </section>
    )
}

export default Profile