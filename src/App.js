import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import User from './Pages/User';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import { GithubProvider } from './context/github/GithubContext';
import { AlertProvider } from './context/alert/AlertContext';
import Alert from './components/layout/Alert';


function App() {

    //Including all the props at the global level ..using the ContextApi...
    return (
       <GithubProvider>
           <AlertProvider>
                <Router>
                    <div className='flex flex-col justify-between h-screen'>
                    <Navbar /> 
                    {/**The Main Contents are nested below ... */}
                    <main className='container mx-auto px-3 pb-12'>
                        <Alert />
                        <Routes>
                            <Route path='/' element={<Home />} /> 
                            <Route path='/about' element={<About />} /> 
                            <Route path='/notfound' element={<NotFound /> } />
                            <Route path='/user/:login' element={<User />}/> 
                            <Route path = '/*' element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer /> 
                    </div>
                </Router>
           </AlertProvider>
       </GithubProvider>
       
    );
}

export default App;


/**
 * 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 //github api generated token ..
 * if the Route is not enclosed within Routes ...it won't work because we are using react-router-dom 6+
 * if the Routes are not included in the App.js it woont work ...because there is no way map the components ...
 * 
 * for App.js components to have access the ContextApi values(props) ...everything must be wrapped withing the Provider...
 */