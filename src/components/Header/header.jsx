import '../../assets/css/header.css'
import logo from '../../assets/img/logo.png'
import usuario from '../../assets/img/usuario.svg'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,  AlertDialogTitle, } from "@/components/ui/alert-dialog"
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
                        <AlertDialogCancel>Recusar</AlertDialogCancel>
                        <AlertDialogAction onClick={ () => setIsOpen(true) }>Aceitar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
                
            
        )
    }

    return(
        <header>
            <nav>
                <img src={ logo } alt="logo projeto PI"/>

                <ul>
                    <li>Agendar</li>
                    <li>Mitos</li>
                    <li>Suporte</li>
                    <li>Apoiadores</li>
                    <li><img src={ usuario } alt="imagem usuario" className="img-usuario"/></li>
                </ul>
            </nav>
            <Cookies className="cookies"/>
        </header>
    )
}

export default Header;