import Header from '../../components/Header/header'
import BannerCarousel from '../../components/BannerCarousel/bannerCarousel';
import LocaisDoacao from '../../components/LocaisDoacao/locaisDoacao';
import { motion } from 'framer-motion'

const Home = () =>{

    return(<motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}>
            <Header/>
            <BannerCarousel/>
            <LocaisDoacao/>
    </motion.div>)
}

export default Home;