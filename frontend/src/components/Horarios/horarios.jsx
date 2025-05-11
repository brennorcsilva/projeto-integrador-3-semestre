import { useState, useEffect } from "react";
import axios from 'axios'
import '../../assets/css/horarios.css'

const Horarios = ({diaSelecionado}) =>{
    const [ horarios, setHorarios ] = useState([{}])
    const [ isOpen, setIsOpen ] = useState(false)

    //Puxando dias e horarios disponiveis do BD
    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const res = await axios.get('http://localhost:8080/lerHorarios')
                res.data.map((data) =>(
                    setHorarios(prev => [...prev, data])
                    //Fazer um setHorarios que funcione!
                    /*                        id: data.id_horarios,
                        dia: data.dia_horarios,
                        mes: data.mes_horarios,
                        horarios: data.horario_horarios*/
                ))
            }catch(e){
                console.log(`Erro! ${e}`)
            }
        }
        fetchData()
    }, [])

    const meses = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const dia = [ "Domingo", "Segunda-Feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

    //Lógica para marcar o agendamento
    const marcarAgendamento = (horaAgendamento, dia) =>{
        console.log(`Agendamento marcado! ${horaAgendamento} e ${dia}`)
    }


    return(
               horarios.length < 1 ? (<></>) : (
                horarios.map((horario) =>(
                    diaSelecionado.getDate().toString() === horario.dia_horarios ? (<>
                    <div className="container-agendamento-horarios">
                    <div className="container-horarios flex flex-col gap">
                    <h1 className="text-center text-(length:--tamanho-texto)">{dia[diaSelecionado.getDay()]}, {diaSelecionado.getDate()} de {meses[diaSelecionado.getMonth()]}</h1>

                     <div className="horarios flex flex-col gap-y-2" key={horario.id_horarios}>
                        { horario.horario_horarios.map((horaAgendamento, i) =>(
                            //Passando o dia selecionado e a hora para buscar no BD e remover da lista
                            <button onClick={() => marcarAgendamento(horaAgendamento, diaSelecionado.getDate())} className="text-center text-(--cor-sangue) cursor-pointer" key={i}>{horaAgendamento}</button>
                        )) }
                     </div>
                     </div>  
                    </div>
                    </>) : (<></>)
                ))
               )
            )
}

export default Horarios;