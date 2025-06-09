import '../../assets/css/bancoSangue.css'
import { useState, useEffect } from 'react'
import Botao from '../Botao/botao'
import { Link } from 'react-router-dom'

const BancoSangue = () =>{
    const [ isActive, setIsActive ] = useState(false)

    //Função para renderizar tardiamente o componente(tipo um lazy load bem gambiarra)
    const handleScroll = () =>{
        const scrollY = window.scrollY;

        if(scrollY > 120) return setIsActive(true)
    }

    useEffect(() =>{
        window.addEventListener('scroll', handleScroll)
    }, [])

    return(
        isActive && (<>
            <section className="banco-sangue">
                <h1 className="text-white text-(length:--tamanho-titulo) font-bold text-center">Banco de sangue Conveniado</h1>

                <div className="container flex flex-wrap justify-center items-center">

                    <div className="container-sangue flex flex-col justify-center items-center">
                        <div className="sangue"></div>
                        <h1 className="text-white text-(length:--tamanho-titulo) font-bold">A+</h1>
                    </div>

                    <div className="container-sangue flex flex-col justify-center items-center">
                        <div className="sangue"></div>
                        <h1 className="text-white text-(length:--tamanho-titulo) font-bold">A-</h1>
                    </div>

                    <div className="container-sangue flex flex-col justify-center items-center">
                        <div className="sangue"></div>
                        <h1 className="text-white text-(length:--tamanho-titulo) font-bold">B+</h1>
                    </div>

                    <div className="container-sangue flex flex-col justify-center items-center">
                        <div className="sangue"></div>
                        <h1 className="text-white text-(length:--tamanho-titulo) font-bold">B-</h1>
                    </div>

                    <div className="container-sangue flex flex-col justify-center items-center">
                        <div className="sangue"></div>
                        <h1 className="text-white text-(length:--tamanho-titulo) font-bold">AB+</h1>
                    </div>

                    <div className="container-sangue flex flex-col justify-center items-center">
                        <div className="sangue"></div>
                        <h1 className="text-white text-(length:--tamanho-titulo) font-bold">AB-</h1>
                    </div>

                    <div className="container-sangue flex flex-col justify-center items-center">
                        <div className="sangue"></div>
                        <h1 className="text-white text-(length:--tamanho-titulo) font-bold">O+</h1>
                    </div>

                    <div className="container-sangue flex flex-col justify-center items-center">
                        <div className="sangue"></div>
                        <h1 className="text-white text-(length:--tamanho-titulo) font-bold">O-</h1>
                    </div>
                </div>

                <div className="container border-t-2 border-[#284F60] flex justify-center items-center flex-wrap">
                    <div className="container-sangue flex flex-col justify-center items-center">
                        <div className="sangue"></div>
                        <h1 className="text-white font-bold">Estável</h1>
                    </div>

                    <div className="container-sangue flex flex-col justify-center items-center">
                        <div className="sangue"></div>
                        <h1 className="text-white font-bold">Alerta</h1>
                    </div>

                    <div className="container-sangue flex flex-col justify-center items-center">
                        <div className="sangue"></div>
                        <h1 className="text-white font-bold">Crítico</h1>
                    </div>

                </div>
            </section>

            <div className="container-botao flex justify-center items-center">
                <Link to="/agendamento"><Botao texto="Agendar Doação"/></Link>
            </div>
            </>
        )
        
    )
}

export default BancoSangue;