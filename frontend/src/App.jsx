//IMPORTS
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

//COMPONENTS
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//PAGES
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="container">
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App
