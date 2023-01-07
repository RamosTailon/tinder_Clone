import styles from './Login.module.css'
import logo from '/icons/logo-2.svg'

//HOOKS
import { useState } from 'react'

//COMPONENTS
import Input from '../components/form/Input'

const Register = () => {

    const [user, setUser] = useState({})

    // const { login } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <section>
            <div className={styles.logo_container}>
                <img src={logo} alt="logo True Love" id={styles.logo} />
                <p>True Love</p>
            </div>
            <form className={styles.form_container}>
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
                    type='text'
                    name='password'
                    placeholder='Digite a sua senha'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Confirmação de senha'
                    type='text'
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
                <Input
                    text='Fotos'
                    type='text'
                    name='images'
                    placeholder='Adicione algumas fotos'
                    handleOnChange={handleChange}
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