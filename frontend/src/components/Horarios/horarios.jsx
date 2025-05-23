import { useState, useEffect } from "react";
import axios from 'axios'
import '../../assets/css/horarios.css'

const Horarios = ({diaSelecionado}) =>{
    const [ horarios, setHorarios ] = useState([{}])
    let id_horario = ''
    const [ isOpen, setIsOpen ] = useState(false)

    //Puxando dias e horarios disponiveis do BD
    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const res = await axios.get('http://localhost:8080/lerHorarios')
                res.data.map((data) =>(
                    setHorarios(prev => [...prev, data])
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
    const marcarAgendamento = async(id, horaAgendamento) =>{
        try{
            const res = axios.patch(`http://localhost:8080/atualizarHorarios/${id}`,
                horaAgendamento,
                {
                    headers:{
                        'Content-Type': 'text/plain'
                    }
                }
            )
            alert("Marcado com sucesso!")
            window.location.reload()
        }catch(e){
            console.log(e)
        }
    }


    return(
               horarios.length < 1 ? (<></>) : (
                horarios.map((horario) =>(
                    diaSelecionado.getDate().toString() === horario.dia_horarios ? (<>
                    <p className="text-white hidden">{ id_horario = horario.id_horarios }</p>
                    <div className="container-agendamento-horarios">
                    <div className="container-horarios flex flex-col gap">
                    <h1 className="text-center text-(length:--tamanho-texto)">{dia[diaSelecionado.getDay()]}, {diaSelecionado.getDate()} de {meses[diaSelecionado.getMonth()]}</h1>

                     <div className="horarios flex flex-col gap-y-2" key={horario.id_horarios}>
                        { horario.horario_horarios.map((horaAgendamento, i) =>(
                            //Passando o dia selecionado e a hora para buscar no BD e remover da lista
                            <button onClick={() => marcarAgendamento(id_horario, horaAgendamento)} className="text-center text-(--cor-sangue) cursor-pointer" key={i}>{horaAgendamento}</button>
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