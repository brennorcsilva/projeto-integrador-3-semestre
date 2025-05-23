import '../../assets/css/header.css'
import logo from '../../assets/img/logo.png'
import usuario from '../../assets/img/usuario.svg'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,  AlertDialogTitle, } from "@/components/ui/alert-dialog"
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Header = () =>{
    const [ isOpen, setIsOpen ] = useState(false)

    //Monitorando o comportamento do estado para não exibir novamente os cookies(armazenando via localStorage)
    useEffect(() =>{
        //Se for verdadeiro, então irá inserir dados localStorage
        if(isOpen){
            return localStorage.setItem("cookies", true)
        }
    }, [ isOpen ])

    //Ao abrir a página, irá ver se o cookies já havia sido fechado. Se Sim, não irá exibir
    useEffect(() =>{
        const cookies = localStorage.getItem('cookies')

        //Se for verdadeiro, irá fechar o modal
        if(cookies) return setIsOpen(true)
    }, [])

    //Colocando a caixa de cookies no Header para que seja escalável para toda a página
    const Cookies = () =>{
        return(
            !isOpen && (
                <AlertDialog defaultOpen={ true }>
                    <AlertDialogContent className="top-(--spacing-modal)">
                        <AlertDialogHeader>
                        <AlertDialogTitle>Aviso - Cookies</AlertDialogTitle>
                        <AlertDialogDescription>
                        Este site utiliza cookies para melhorar a sua experiência de navegação, personalizar conteúdos, analisar o tráfego e oferecer funcionalidades de redes sociais. Os cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você visita nossos sites e são usados para lembrar suas preferências e ações ao longo do tempo.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel className="hover:cursor-pointer">Recusar</AlertDialogCancel>
                        <AlertDialogAction onClick={ () => setIsOpen(true) } className="hover:cursor-pointer">Aceitar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
                
            
        )
    }


    //classe para usar menu hamburguer no Header
    class MobileNavbar {
        constructor(mobileMenu, navList, navLinks) {
          this.mobileMenu = document.querySelector(mobileMenu);
          this.navList = document.querySelector(navList);
          this.navLinks = document.querySelectorAll(navLinks);
          this.activeClass = "active";
      
          this.handleClick = this.handleClick.bind(this);
        }

        animateLinks() {
            this.navLinks.forEach((link, index) => {
              link.style.animation ? (link.style.animation = "") : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
            });
        }
      
        handleClick() {
          this.navList.classList.toggle(this.activeClass);
          this.mobileMenu.classList.toggle(this.activeClass);
          this.animateLinks();
        }
      
        addClickEvent() {
          this.mobileMenu.addEventListener("click", this.handleClick);
          //this.mobileMenu.addEventListener("click", () => console.log("TESTANDO"));
        }
      
        init() {
          if (this.mobileMenu) {
            this.addClickEvent();
          }
          return this;
        }
      }

      const mobileNavbar = new MobileNavbar(
        ".hamburguer",
        ".nav-list",
        ".nav-list li",
      );
      mobileNavbar.init();

    return(
        <header>
            <nav>
              <Link to="/"><img src={ logo } alt="logo projeto PI"/></Link>
                <div className='hamburguer'>
                    <div className='linha1'></div>
                    <div className='linha2'></div>
                    <div className='linha3'></div>

                </div>
                <ul className='nav-list'>
                    <li><Link to="/agendamento">Agendar</Link></li>
                    <li>Mitos</li>
                    <li><Link to="/suporte">Suporte</Link></li>
                    <li>Apoiadores</li>
                <li><Link to="/cadastro"><img src={ usuario } alt="imagem usuario" className="img-usuario"/></Link></li>
                </ul>
            </nav>
            <Cookies className="cookies"/>
        </header>
    )
}

export default Header;