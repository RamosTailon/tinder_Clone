//IMPORTS
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

//COMPONENTS
import Container from './components/Container'

//LAYOUTS
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Message from './layouts/Message'

//PAGES
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

//CONTEXTS
import { UserProvider } from './context/UserContext';

function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<UserProvider>
					<Navbar />
					<Message />
					<Container>
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='/user/profile' element={<Profile />} />
							<Route path='/' element={<Home />} />
						</Routes>
					</Container>
					<Footer />
				</UserProvider>
			</BrowserRouter>
		</div>
	)
}

export default App
