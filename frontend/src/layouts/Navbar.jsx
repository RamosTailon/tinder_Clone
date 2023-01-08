import style from './Navbar.module.css';

import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav id={style.nav}>
            <div className={style.icon}>
                <Link to='/'><img src="/icons/logo-2.svg" alt="logo true love" /> </Link>
                <article>True Love</article>
            </div>
            <div className={style.profile}>
                <p>Fulana de tal</p>
                <Link to='/edit'><div className={style.image}></div></Link>
            </div>
        </nav>
    )
}

export default Navbar