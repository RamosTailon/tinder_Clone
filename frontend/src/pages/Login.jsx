import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import logo from '/icons/logo-2.svg'

//HOOKS
import { useState, useContext } from 'react'


//COMPONENTS
import Input from '../components/form/Input'

//CONTEXT
import { Context } from '../context/UserContext'

const Login = () => {

    const [user, setUser] = useState({})

    const { login } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        login(user)
    }

    return (
        <section>
            <div className={styles.logo_container}>
                <img src={logo} alt="logo True Love" id={styles.logo} />
                <p>True Love</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.form_container}>
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
                <input type="submit" value="ENTRAR" />
            </form>
            <p>
                Não tem Cadastro?<Link to='/register'>Clique aqui</Link>
            </p>
        </section>
    )
}

export default Login