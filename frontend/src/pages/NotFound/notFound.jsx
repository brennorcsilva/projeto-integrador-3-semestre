import { motion } from 'framer-motion'
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import homeSvg from '../../assets/img/home.svg';
import voltarSvg from '../../assets/img/voltar.svg';
import { Link } from 'react-router-dom';

const NotFound = () =>{
    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="flex flex-col min-h-screen"
            >
            <Header/>
            
            <section className="flex flex-col flex-1 justify-center items-center my-8">
                <div className="container-principal flex flex-col justify-center items-center">
                    <h1 className="text-gray-300 text-9xl">404</h1>

                    <div className="w-50 bg-gray-300 h-[2px] my-2"></div>

                    <p className="text-3xl">Página não encontrada</p>

                    <div className="container-botoes flex gap-x-6 my-4">
                    <button className="bg-(--cor-sangue) text-white py-2 px-3 rounded-lg hover:opacity-75">
                        <Link to="/" className="flex gap-x-2">
                            <img src={ homeSvg } alt="icone home"/>
                            Voltar para Home
                        </Link>
                    </button>
                    
                    <button className="bg-(--cor-sangue) text-white py-2 px-3 rounded-lg flex gap-x-1 cursor-pointer hover:opacity-75" onClick={ () => window.history.back() }>
                        <img src={ voltarSvg } alt="icone voltar"/>
                        Voltar
                    </button>
                    </div>
                </div>

                <div className="container-divisor flex justify-center items-center gap-x-2">
                    <div className="bg-gray-200 w-50 h-[2px]"></div>
                    <span className="text-lg">Ou</span>
                    <div className="bg-gray-200 w-50 h-[2px]"></div>
                </div>

                <div className="container-links">
                    <h1 className="text-center text-gray-700 text-3xl my-2">Links rápidos</h1>

                    <div className="flex gap-x-4">
                        <Link to="/cadastro" className="hover:text-gray-500">Cadastro</Link>
                        <Link to="/agendamento" className="hover:text-gray-500">Agendar</Link>
                        <Link to="/suporte" className="hover:text-gray-500">Mitos</Link>
                        <Link to="/suporte" className="hover:text-gray-500">Suporte</Link>
                    </div>
                    
                </div>                
            </section>

            <Footer/>
        </motion.div>
    )
}

export default NotFound;