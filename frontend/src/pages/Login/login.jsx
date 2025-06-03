import logo from '../../assets/img/logo-circulo.png'
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import ChatBot from '../../components/ChatBot/chatBot'
import { motion } from 'framer-motion'
import Alerta from '../../components/Alerta/alerta'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Login = () =>{

    //Criando o estado que manipulará as infos do form
    const [ usuario, setUsuario ] = useState({
        email: "",
        senha: ""
    })

    //Estado para controlar a mensagem de aviso
    const [ isAvisoOpen, setIsAvisoOpen ] = useState(false)

    const [ mensagemAviso, setMensagemAviso ] = useState({
        titulo: '',
        texto: '',
        style: ''
    })

    //onChange para os campos do formulario
    const handleForm = (e) =>{
        setUsuario(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    //Lidando com o submit
    const handleSubmit = async(e) =>{
        e.preventDefault()

        if(usuario.email === '' || usuario.senha === ''){
            setMensagemAviso({
                titulo: "Erro ao tentar logar!",
                texto: "Preencha as informações corretamente!",
                style: "text-red-600"
            })
            return setIsAvisoOpen(true)
        }

        try{
            const res = await axios.get(`http://localhost:8080/lerUsuarioEmail/${usuario.email}/${usuario.senha}`)
            localStorage.setItem("usuario", JSON.stringify(res.data))
            setMensagemAviso({
                titulo: "Sucesso ao logar!",
                texto: `Seja bem vindo novamente ${JSON.stringify(res.data.nome_usuario)}`,
                style: "text-green-600"
            })
            setIsAvisoOpen(true)
        }catch(e){
            alert("Email e/ou senha não coincidem! tente novamente")
            setUsuario({
                email: '',
                senha: ''
            })
        }
    }

    const handleContinuar = () =>{
        window.open("/", "_self")
    }

    //Lidando caso o usuario ja esteja logado
    useEffect(() =>{
        const isLogged = localStorage.getItem("usuario")

        if(isLogged){
            setMensagemAviso({
                titulo: "Usuário já logado!",
                texto: `Seja bem vindo novamente ${JSON.parse(localStorage.getItem("usuario")).nome_usuario}! Te redirecionando para a página inicial`,
                style: "text-green-600"
            })
            return setIsAvisoOpen(true)
        }
    }, [])

    return(
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3 }}
                className="flex flex-col min-h-screen"
            >
                <Header/>
                    <section className="w-full max-w-7xl my-8 mx-auto flex-1 flex items-center w-full">
                        <div className="rounded-lg shadow-[0_0_10px_#9C9999] flex flex-col items-center justify-center py-8 px-2 max-w-lg mx-auto w-full bg-[#F5F5F5]">
                            <img src={logo} alt="logo projeto horizon"/>
                            <h1 className="text-2xl text-(--cor-sangue) mb-4">Entre na sua conta</h1>
                            <form action="#" method="POST" className="flex flex-col gap-y-4 justify-center items-center">
                                <input type="email" name="email" id="email" placeholder="lorem.ipsum@gmail.com" onChange={handleForm} value={usuario.email} className="rounded-2xl px-3 py-1.5 text-md bg-[#EEEDED] border-2 border-[-#C6C6C6] text-black font-semibold"/>
                                <input type="password" name="senha" id="senha" placeholder="********" onChange={handleForm} value={usuario.senha} className="rounded-2xl px-3 py-1.5 text-md bg-[#EEEDED] border-2 border-[-#C6C6C6] text-black font-semibold"/>

                                <input type="submit" value="Entrar" onClick={handleSubmit} className="cursor-pointer bg-(--cor-sangue) rounded-4xl py-2 px-4 w-36 text-white transition duration-500 hover:-translate-y-2 hover:scale-110"/>
                            </form>
                        </div>
                    </section>
                { isAvisoOpen && (<Alerta titulo={mensagemAviso.titulo} texto={mensagemAviso.texto} style={mensagemAviso.style} handleSubmit={handleContinuar}/>) }
                <Footer/>
                <ChatBot/>
                    
            </motion.div>

    )
}

export default Login;