import '../../assets/css/botao.css'

// eslint-disable-next-line react/prop-types
const Botao = ({ texto, cor }) =>{
    return(
        cor === '#D33741' ? <button className="botao botao-vermelho bg-(--cor-fundo) text-white text-center mx-auto flex mb-[2rem]" >{ texto }</button> : <button className="botao botao-cinza">{ texto }</button>
    )
}

export default Botao;