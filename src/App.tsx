/** @format */

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Calculator from "./components/Calculator/Calculator";
import History from "./components/History/History";
import { ExchangeProvider } from "./context/ExchangeContext";
import Container from "./components/Container/Container";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<div className="flex flex-col">
			<ExchangeProvider>
				<ToastContainer />
				<Header />
				<Container className="pt-24">
					<Calculator />
					<History />
				</Container>
				<Footer />
			</ExchangeProvider>
		</div>
	);
}

export default App;
