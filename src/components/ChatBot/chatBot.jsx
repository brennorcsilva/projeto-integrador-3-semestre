import '../../assets/css/chatBot.css'
import { useState } from 'react'

const ChatBot = () =>{
    //Funcao que armazena a mensagem
    const [ pergunta, setPergunta ] = useState('')
    const [ resposta, setResposta ] = useState('')
    const [ loading, setLoading ] = useState(false)

    //Componente Loading
    const Loading = () =>{
        return(
            <div className="loading"></div>
        )
    }

    //Funcao responsável por enviar a mensagem que o usuario digitar a IA
    const handleClick = async() =>{
        //Requisicao utilizando tratamento de erros e axios
        setLoading(true)
        try{
            const res = await fetch('https://openrouter.ai/api/v1/chat/completions',{
                method: 'POST',
                headers: {
                    "Authorization": "Bearer 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",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-r1:free",
                    messages: [
                        {
                            role: "user",
                            content: pergunta 
                        }
                    ]
                })
            })

            //Armazenando o retorno da req da IA em um json
            const data = await res.json()

            //Aqui é armazenada a reposta da IA(isso se ela existir) e também tirando os ** que a resposta gera.
            setResposta(data.choices?.[0]?.message?.content.split('*').join('') || "Não foi possível gerar uma resposta com essa mensagem! Tente novamente.")
            setPergunta('')
            setLoading(false)
        }catch(error){
            console.log(error)
        }



    }

    return(
        <div className="container-chat flex justify-center items-center flex-col gap-y-2">
            <h1>ChatBot teste!!!!</h1>

            <input type="text" placeholder="Qual sua pergunta?" onChange={ (e) => setPergunta(e.target.value) } className="text-center"/>
            <button onClick={ handleClick } className="cursor-pointer">Enviar mensagem</button>
            { loading &&(<Loading/>) }

            { (!loading && !pergunta) &&(<p>{ resposta }</p>) }
        </div>
    )
}

export default ChatBot;