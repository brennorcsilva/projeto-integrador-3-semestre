import React from 'react';
import '../../assets/css/formularioAgendamento.css'
import LocaisDoacao from '../LocaisDoacao/locaisDoacao';
import Horarios from '../Horarios/horarios';
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from 'react';
import { ptBR } from 'date-fns/locale'

const FormularioAgendamento = () =>{
    //Data que o usuario selecionar
    const [ date, setDate ] = useState(new Date())

    //Dia/mes atual
    const [ dataAtual, setDataAtual ] = useState(new Date().setDate(1))
    
    //Dia/mes final
    const [ dataFinal, setDataFinal ] = useState(() =>{
        const data = new Date()
        data.setMonth(12)
        data.setDate(0)
        return data
    })

    //Irá renderizar os horarios disponiveis
    const [ isLoading, setIsLoading ] = useState(false)

    //Verificando que assim que a data for mudada, o isLoading virará verdadeiro para renderizar os horarios
    useEffect(() =>{
        //Ignorando primeira render
        if(date == Date()){
            return;
        }

        //Segunda render
        setIsLoading(true)
    }, [date])
    
    const Calendario = () =>{
        return(
            <Calendar 
                mode="single"
                selected={ date }
                onSelect={ setDate }
                className="rounded-md border"
                fromDate={dataAtual}
                toDate={dataFinal}
                locale={ptBR}
            />
        )
    }

    return(
        <section className="flex container-agendamento justify-center relative">
            <div className="container-form">
                <h1 className="text-2xl text-(--cor-sangue) font-bold text-center">Agende sua doação</h1>
                <form action="#" method="POST" className="flex flex-col justify-center">
                    <Calendario/>
                </form>


                { isLoading && (
                    <Horarios diaSelecionado={ date }/>
                ) }
            </div>
   

            <div className="container-doacao">
                <h1 className="text-2xl text-(--cor-sangue) font-bold text-center">Encontre os pontos de coleta mais próximos</h1>
                {<LocaisDoacao/>}
            </div>
        </section>
    )
}

export default FormularioAgendamento;