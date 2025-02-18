import '../../assets/css/locaisDoacao.css'
import imgMap from '../../assets/img/google-maps.png'
import { useState } from 'react'

const LocaisDoacao = () =>{
    //Pegando o valor digitado no input
    const [ posicao, setPosicao ] = useState('')

    //Função para pesquisar uma posição específica e atualizar no Mapa
    const handleClick = () =>{
        console.log(`A mensagem escrita é: ${ posicao }`)
    }

    return(
        <section className="locais-doacao flex items-start justify-evenly">
            <div className="container-texto flex align-center justify-center flex-col gap-y-6">
                <h1 className="text-white text-(length:--tamanho-titulo) font-bold text-center">Locais para Doação</h1>
                <p className="text-white text-(length:--tamanho-texto) texto-doacao text-center">A nossa missão é otimizar e agilizar todo o processo de doação de sangue e plaquetas! Ao visitar nosso site, você pode encontrar os hospitais e postos de coleta mais próximos que utilizam o software CONEXSP. Basta inserir seu endereço ao lado e verificar as opções disponíveis. Juntos, salvaremos vidas :)</p>
            </div>

            <div className="container-img w-full max-w-xs flex align-center justify-center flex-col relative gap-y-2">
                <img src={ imgMap } alt="mapa" className="w-full"/>
                <input type="text" name="posicao" id="posicao" placeholder="Digite algo..." onChange={ (e) =>setPosicao(e.target.value) } className="input-posicao"/><span className="span-pesquisar" onClick={ handleClick }></span>
            </div>
        </section>
    )
}

export default LocaisDoacao;