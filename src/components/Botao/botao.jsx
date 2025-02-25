import '../../assets/css/botao.css'

// eslint-disable-next-line react/prop-types
const Botao = ({ texto, cor='#D33741' }) =>{
    return(
        cor === '#D33741' ? <button className={`botao botao-vermelho bg-(--cor-fundo) text-white text-center flex mb-[2rem]`}>{ texto }</button> : <button className={`botao botao-cinza bg-[#284F60] text-white text-center flex mb-[2rem]`}>{ texto }</button>
    )
}

export default Botao;