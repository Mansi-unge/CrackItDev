import './App.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'

function App() {

  return (
    <>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
     <Header/>
      {/* <h1>home page</h1> */}
     <Routes>
      <Route path="/" element={<Home/>} />
     </Routes>
     <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
