import style from './Navbar.module.css';


import { NavLink, Link } from 'react-router-dom';

//CONTEXT
import { Context } from '../context/UserContext';
import { useContext } from 'react';

const Navbar = () => {

    const { authenticated, logout } = useContext(Context)

    return (
        <nav id={style.nav}>
            <div className={style.icon}>
                <Link to='/'><img src="/icons/logo-2.svg" alt="logo true love" /> </Link>
                <article>True Love</article>
            </div>
            <div className={style.profile}>
                {authenticated ? (
                    <>
                        <p>Fulana de tal</p>
                        <Link to='/user/profile' className={style.image}></Link>
                        <br />
                        <p id={style.sair} onClick={logout}>Sair</p>
                    </>
                ) : (
                    <>
                        <Link to='/login' className={style.log}>Entrar</Link>
                        <Link to='/register' className={style.log}>Cadastrar</Link>
                    </>
                )}
            </div>
        </nav >
    )
}

export default Navbar