import '../../assets/css/chatBot.css'
import imgLogo from '../../assets/img/logo.png'
import imgRobo from '../../assets/img/robo.svg'
import imgChat from '../../assets/img/chat.svg'
import imgFechar from '../../assets/img/fechar.svg'
import imgEnviar from '../../assets/img/enviar-mensagem.svg'   
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatBot = () =>{
    //Variavel que armazena a pergunta atual e as ja enviadas
    const [ pergunta, setPergunta ] = useState('')
    const [ perguntaEnviada, setPerguntaEnviada ] = useState([])

    //Variavel que armazena a resposta atual e as ja enviadas
    const [ resposta, setResposta ] = useState('')
    const [ respostaEnviada, setRespostaEnviada ] = useState([])
    const [ isOpen, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    //Armazenando bancos de dados cadastrados
    const [ bancoDados, setBancoDados ] = useState([])

    //Componente Loading
    const Loading = () =>{
        return(<div className="flex gap-x-2 self-start px-3">
            <span className="loading"></span>
            <span className="loading"></span>
            <span className="loading"></span>
        </div>)
    }

    //Funcao responsavel para trazer infos do BD
    useEffect(() =>{
        const fetchData = ( async() =>{
            try{
                const res = await axios.get("http://localhost:8080/lerHospital")
                console.log(res.data)

                //Atribuindo agora somente os nomes à variavel
                res.data.map((hospital) =>(
                    setBancoDados(prev => [...prev, hospital.nome_hospital])
                ))
            }catch(e){
                console.log(e)
            }
            
        })
        fetchData()

    }, [])

    //Funcao responsável por enviar a mensagem que o usuario digitar a IA
    const handleClick = async() =>{
        //Requisicao utilizando tratamento de erros e axios
        setLoading(true)
        try{
            const res = await fetch('https://openrouter.ai/api/v1/chat/completions',{
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${ import.meta.env.VITE_CHATBOT_API_KEY }`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "nousresearch/deephermes-3-mistral-24b-preview:free",
                    messages: [
                        {
                            role: "user",
                            content: `Suas respostas irão se adaptar sempre ao contexto do Brasil, e irá responder somente perguntas relacionadas a doação de sangue e sangue em geral. Você irá analisar a mensagem do usuário e caso o usuário pergunte qualquer outra coisa, você irá retornar a resposta "Não foi possivel gerar uma resposta que não seja relacionada a sangue! Tente novamente". Caso o usuário pergunte, você terá agendamentos disponíveis em tais bancos: ${bancoDados}. Mensagem do usuário: ${ pergunta }}.`
                        }
                    ]
                })
            })

            //Armazenando o retorno da req da IA em um json
            const data = await res.json()

            //Aqui é armazenada a reposta da IA(isso se ela existir) e também tirando os ** que a resposta gera.
            //Como resposta é um array e podem existir respostas antes dela, é utilizado esse método.
            setResposta(data.choices?.[0]?.message?.content.split('*').join('') || "Não foi possível gerar uma resposta com essa mensagem! Tente novamente.")
            
            setPerguntaEnviada(prev => [...prev, pergunta])
            setRespostaEnviada(prev => [...prev, data.choices?.[0]?.message?.content.split('*').join('') || "Não foi possível gerar uma resposta com essa mensagem! Tente novamente."])

            setPergunta('')
            setLoading(false)
        }catch(error){
            console.log(error)
        }



    }

    return(
        <section className="z-5 fixed section-chatbot">
            { !isOpen && (
                <div className="container-button flex justify-center items-center flex-col gap-y-2 cursor-pointer" onClick={(() => setOpen(true))}>
                    <img src={ imgChat } alt="icone chatbot"/>            
                </div>
            )}


            { isOpen && (
                <div className="container-chat flex justify-center items-inherit flex-col">
                    <nav className="bg-black flex justify-between items-center nav-chatbot">
                        <img src={ imgLogo } alt="logo horizon" className="max-w-[5rem]"/>
                        <button onClick={ () => setOpen(false) } className="cursor-pointer self-end text-white"><img src={ imgFechar } alt="icone fechar"/></button>
                    </nav>

                    <div className="container-fundo flex justify-center items-center flex-col gap-y-1">
                        
                        {/*Se a resposta for vazia, irá exibir somente o default */}
                        { !resposta &&(<>
                            <img src={ imgRobo } alt="imagem robo IA fundo" className="img-robo"/>
                            <p className="text-gray-400 text-md">Como Posso Ajudar Hoje?</p>
                        </>) }

                        { /*Se o loading for verdadeiro, irá exibir a animacao de carregamento até que a resposta esteja pronta*/ }
                        { loading &&(<>
                                { perguntaEnviada.map((perg, i) => (<React.Fragment key={i}>
                                    <p key={ `pergunta-${i}`} className="max-w-[85%] self-end text-sm bg-black text-white px-3 py-2">{ perg }</p>
                                    <p key={ `resposta${i}` } className="max-w-[85%] self-start text-sm bg-white text-black px-3 py-2">{ respostaEnviada[i] }</p>
                                </React.Fragment>))}
                            <Loading/>

                            </>) }


                        {/*Agora se o loading for falso e a resposta for maior ou igual a 1, então é possível carregar a pergunta e a resposta */ }
                        { (!loading && !resposta.length <= 0) &&(<>
                            
                            {perguntaEnviada.map((perg, i) =>(<React.Fragment key={i}>
                                <p key={ `pergunta-${i}`} className="max-w-[85%] self-end text-sm bg-black text-white px-3 py-2">{ perg }</p>
                                <p key={ `resposta${i}` } className="max-w-[85%] self-start text-sm bg-white text-black px-3 py-2">{ respostaEnviada[i] }</p>
                            </React.Fragment>))}

                            </>) }

                    </div>

                    <div className="container-input relative flex gap-x-4 justify-center items-center">
                        <input type="text" placeholder="Digite sua pergunta..." onChange={ (e) => setPergunta(e.target.value)} className="input-chat" value={ pergunta }/>
                        <span onClick={ handleClick } className="span-enviar flex justify-center items-center cursor-pointer"><img src={ imgEnviar }/></span>
                    </div>

                </div>
                )}
        </section>
    )
}

export default ChatBot;