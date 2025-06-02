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
            return alert("NAO OK!")
        }

        try{
            const res = await axios.get(`http://localhost:8080/lerUsuarioEmail/${usuario.email}/${usuario.senha}`)
            localStorage.setItem("usuario", JSON.stringify(res.data))
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
                texto: `Seja bem vindo novamente ${JSON.parse(localStorage.getItem("usuario")).nome_usuario}! Te redirecionnado para a página inicial`,
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
                    <section className="rounded-lg w-full max-w-7xl my-4 mx-auto shadow-[0 0 10px #9c9999] flex-1">
                        <div>
                            <img src={logo} alt="logo projeto horizon"/>
                            <form action="#" method="POST">
                                <input type="email" name="email" id="email" placeholder="lorem.ipsum@gmail.com" onChange={handleForm} value={usuario.email}/>
                                <input type="password" name="senha" id="senha" placeholder="********" onChange={handleForm} value={usuario.senha}/>

                                <input type="submit" value="Logar" onClick={handleSubmit}/>
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