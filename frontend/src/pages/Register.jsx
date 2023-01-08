import styles from './Login.module.css'
import logo from '/icons/logo-2.svg'

//HOOKS
import { useState, useContext } from 'react'

//COMPONENTS
import Input from '../components/form/Input'

//CONTEXTS
import { Context } from '../context/UserContext'

const Register = () => {

    const [user, setUser] = useState({})
    const [preview, setPreview] = useState([]); //múltiplas imagens

    const { register } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function onFileChange(e) {
        setPreview(Array.from(e.target.files)) //file list é transformado em array
        setUser({ ...user, images: [...e.target.files] })
    }

    function handleSubmit(e) {
        e.preventDefault();

        register(user)
        // console.log(user)
    }

    return (
        <section>
            <div className={styles.logo_container}>
                <img src={logo} alt="logo True Love" id={styles.logo} />
                <p>True Love</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <Input
                    text='Nome'
                    type='text'
                    name='name'
                    placeholder='Digite o seu nome'
                    handleOnChange={handleChange}
                />
                <Input
                    text='E-mail'
                    type='email'
                    name='email'
                    placeholder='Digite o seu email'
                    handleOnChange={handleChange}
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
                    placeholder='Digite a confirmação da senha'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Idade'
                    type='number'
                    name='age'
                    placeholder='Digite a sua idade'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Telefone'
                    type='number'
                    name='phone'
                    placeholder='Digite o seu telefone'
                    handleOnChange={handleChange}
                />
                {/*+++++PREVIEW DA IMAGEM+++++++*/}
                <div className={styles.preview_pet_images}>
                    {preview.length > 0
                        ? preview.map((image, index) => (
                            <img src={URL.createObjectURL(image)} alt={user.name} key={`${user.name}+${index}`} />
                        ))
                        : user.images &&
                        user.images.map((image, index) => (
                            <img src={`${process.env.REACT_APP_API}/images/users${image}`} alt={user.name} key={`${user.name}+${index}`} />
                        ))
                    }
                </div>
                {/*++++++++++++++++++++++++++++*/}
                <Input
                    text='Fotos'
                    type='file'
                    name='images'
                    placeholder='Adicione algumas fotos'
                    handleOnChange={onFileChange}
                    multiple={true}
                />
                <Input
                    text='Biografia'
                    type='text'
                    name='bio'
                    placeholder='Fale um pouco sobre você'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Cidade'
                    type='text'
                    name='city'
                    placeholder='Qual cidade você mora'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Estado'
                    type='text'
                    name='nation'
                    placeholder='Qual estado você mora'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Tenho interesse em ...'
                    type='text'
                    name='interest'
                    placeholder='Homens, Mulheres .....'
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastrar" />
            </form>
        </section>
    )
}

export default Register