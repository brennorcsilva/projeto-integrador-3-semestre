import '../../assets/css/agendamento.css'
import Header from '../../components/Header/header';
import FormularioAgendamento from '../../components/FormularioAgendamento/formularioAgendamento';
import Footer from '../../components/Footer/footer';

const Agendamento = () =>{
    return(<>
        <Header/>
        <FormularioAgendamento mostrarTexto={ false }/>

        <Footer fixed={"fixed"} bottom={"bottom-0"} width={"w-full"}/>
        </>
    )
}

export default Agendamento;