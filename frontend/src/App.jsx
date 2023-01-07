//IMPORTS
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

//COMPONENTS
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Container from './components/Container'

//PAGES
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Container>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/' element={<Home />} />
					</Routes>
				</Container>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App
