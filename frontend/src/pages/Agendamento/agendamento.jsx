import '../../assets/css/agendamento.css'
import Header from '../../components/Header/header';
import FormularioAgendamento from '../../components/FormularioAgendamento/formularioAgendamento';
import Footer from '../../components/Footer/footer';
import TriagemDoacao from '../../components/TriagemDoacao/triagemDoacao'
import { useEffect, useState } from 'react';

const Agendamento = () =>{
    //Estado que servirá para verificar se o usuario ja completou a triagem
    const [ isTriagemDone, setIsTriagemDone ] = useState(false)

    const handleSubmit = () =>{
        setIsTriagemDone(true)
    }

    useEffect(() =>{
        console.log(`Teste: ${isTriagemDone}`)
    }, [isTriagemDone])

    return(<>
        <Header/>
        {/*Triagem de doação de sangue*/ }
        { isTriagemDone ? (<FormularioAgendamento mostrarTexto={ false }/>) : (<TriagemDoacao handleSubmit={handleSubmit}/>)}
        
        <Footer fixed={"fixed"} bottom={"bottom-0"} width={"w-full"}/>
        </>
    )
}

export default Agendamento;