import styles from './Home.module.css'

//API
import api from '../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';


const Home = () => {
	const [user, setUser] = useState([]);

	useEffect(() => {
		api.get('/users/')
			.then((response) => {
				setUser(response.data.users)
			})
	}, []);

	return (
		<section>
			<div>
				<h4>Conheça novas pessoas</h4>
			</div>
			<div className={styles.lovesContainer}>
				{user.length > 0 && (
					user.map((user) => (
						<div className={styles.loves}>
							<div style={{ backgroundImage: `url(http://localhost:5000/images/users/${user.images[0]})` }} className={styles.lovesPhoto}></div>
							<Link to='/user/details/'>
								<h4 className={styles.lovesName}>{user.name}</h4>
								<article className={styles.lovesAge}>{user.age} anos</article>
							</Link>
						</div>
					))
				)}
				{user.length == 0 && (
					<p>Não há usuários cadastrados</p>
				)}
			</div>

		</section>
	)
}

export default Home