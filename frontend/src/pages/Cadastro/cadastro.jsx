import { motion } from "framer-motion";
import Header from "../../components/Header/header";
import ChatBot from "../../components/ChatBot/chatBot";
import Formulario from '../../components/Formulario/formulario';
import Footer from '../../components/Footer/footer';

const Cadastro = () =>{
    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="flex flex-col min-h-screen"
            >
                <Header/>
                <ChatBot/>
                <Formulario formCadastro = { true }/>

                <Footer/>
            </motion.div>
    )
}

export default Cadastro;