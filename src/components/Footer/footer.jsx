import '../../assets/css/footer.css'
import instagram from '../../assets/img/instagram.svg'
import facebook from '../../assets/img/facebook.svg'
import twitter from '../../assets/img/twitter.svg'


const Footer = () =>{
    return(
        <footer className="grid grid-cols-4 grid-rows-2 justify-center align-center">
            <div className="container-doe">
                <h1 className="text-lg font-semibold">Doe Sangue</h1>
                <ul>
                    <li className="text-base">Agendar Doação</li>
                    <li className="text-base">Suporte</li>
                    <li className="text-base">Benefícios</li>
                </ul>
            </div>

            <div className="container-sobre">
                <h1 className="text-lg font-semibold">Sobre Nós</h1>
                <ul>
                    <li className="text-base">Mitos</li>
                    <li className="text-base">Apoiadores</li>
                </ul>
            </div>

            <div className="container-contato">
                <h1 className="text-lg font-semibold">Contato</h1>
                <ul>
                    <li className="text-base">Av. Luiz Merenda, 443 - Campanário, Diadema</li>
                    <li className="text-base">+55 11 99999-9999</li>
                    <li className="text-base">contato@gmail.com</li>
                </ul>
            </div>

            <div className="container-redes">
                <h1 className="text-lg font-semibold">Conecte-se Conosco</h1>
                <ul className="flex align-center">
                    <li><a href="#" target="_blank" rel='noreferrer'><img src={ facebook } alt="icone instagram"/></a></li>
                    <li><a href="#" target="_blank" rel='noreferrer'><img src={ instagram } alt="icone instagram"/></a></li>
                    <li><a href="#" target="_blank" rel='noreferrer'><img src={ twitter } alt="icone instagram"/></a></li>
                </ul>
            </div>
            
            <div className="container-direitos">
                <p className="text-sm">@ 2025 - Todos os Direitos Reservados</p>

                <div className="container-politicas">
                    <p className="text-sm">Política de Privacidade</p>
                    <p className="text-sm">Termos de Uso</p>
                </div>
            </div>

        </footer>
    )
}

export default Footer;