import React from 'react';
import '../../assets/css/formularioAgendamento.css'
import LocaisDoacao from '../LocaisDoacao/locaisDoacao';
import Horarios from '../Horarios/horarios';
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from 'react';
import { ptBR } from 'date-fns/locale'
import axios from 'axios'

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

    const [ hospitais, setHospitais ] = useState({})

    //Loading para primeiro procurar hospitais que existem
    const [ loadingHospital, setLoadingHospital ] = useState(false)

    //Irá renderizar os horarios disponiveis
    const [ isLoading, setIsLoading ] = useState(false)

    //Trazendo os hospitais do BD
    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const res = await axios.get("http://localhost:8080/lerHospital")
                setHospitais(res.data)
            }catch(e){
                console.log(e)
            }
        }

        fetchData()
    }, [])

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
                className="rounded-md border calendario mt-6"
                fromDate={dataAtual}
                toDate={dataFinal}
                locale={ptBR}
            />
        )
    }

    const mostrarAgendamento = (id) =>{
        //Aqui eu preciso pegar o ID do hospital e exibir somente com base no hospital selecionado e os dias cadastrados no BD.
        console.log(`Olá! ${id}`)
        setLoadingHospital(true)
    }

    return(
        <section className="flex container-agendamento justify-center relative">
            <div className="container-form">
                { loadingHospital ? (
                    <>
                        <h1 className="text-2xl text-(--cor-sangue) font-bold text-center">Agende sua doação</h1>
                        <form action="#" method="POST" className="flex flex-col justify-center">
                            <Calendario/>
                         </form>

                        { isLoading && (
                            <Horarios diaSelecionado={ date }/>
                        ) }
                    </>

                ) : (<>
                    <h1 className="text-2xl text-(--cor-sangue) font-bold text-center mb-4">Selecione um hospital</h1>
                    <div className="container-hospitais flex justify-center items-center flex-col">
                        { hospitais.length >= 1 ? (
                            hospitais.map((hospital) =>(
                                <div key={hospital.id_hospital} className="flex justify-center items-center">
                                    <button className="botao botao-vermelho bg-(--cor-fundo) text-white text-center my-2" onClick={() => mostrarAgendamento(hospital.id_hospital)}>{hospital.nome_hospital}</button>
                                </div>
                            ))
                        ) : (<></>)}
                        
                    </div>

                </>) }
            </div>
   

            <div className="container-doacao">
                <h1 className="text-2xl text-(--cor-sangue) font-bold text-center mb-4">Encontre os pontos de coleta mais próximos</h1>
                {<LocaisDoacao mostrarTexto={false}/> }
            </div>
        </section>
    )
}

export default FormularioAgendamento;