import Header from '../../components/Header/header'
import BannerCarousel from '../../components/BannerCarousel/bannerCarousel';
import LocaisDoacao from '../../components/LocaisDoacao/locaisDoacao';
import BancoSangue from '../../components/BancoSangue/bancoSangue'
import CarouselAvaliacoes from '../../components/CarouselAvaliacoes/carouselAvaliacoes';
import Parceiros from '../../components/Parceiros/parceiros'
import ChatBot from '../../components/ChatBot/chatBot'
import Footer from '../../components/Footer/footer'
import { motion } from 'framer-motion'

const Home = () =>{

    return(<motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}>
            <Header/>
            <BannerCarousel/>
            <LocaisDoacao mostrarTexto={true}/>
            <BancoSangue/>
            <CarouselAvaliacoes/>
            <Parceiros/>
            <ChatBot/>
            <Footer/>
    </motion.div>)
}

export default Home;