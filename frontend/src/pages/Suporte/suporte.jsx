import { motion } from 'framer-motion'
import Header from "../../components/Header/header";
import ChatBot from "../../components/ChatBot/chatBot";
import Contato from '../../components/Contato/contato'
import Footer from '../../components/Footer/footer';

const Suporte = () =>{
    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="flex flex-col min-h-screen"
            >
                
                <Header/>

                <section className="section-contato p-(--espacamento) relative flex justify-around flex-1 mt-6">
                    <Contato/>
                </section>

                <ChatBot/>
                <Footer/>

            </motion.div>
    )
}

export default Suporte;