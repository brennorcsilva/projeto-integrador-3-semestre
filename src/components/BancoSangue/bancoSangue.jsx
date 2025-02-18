import '../../assets/css/bancoSangue.css'
import { useState, useEffect } from 'react'
import Botao from '../Botao/botao'

const BancoSangue = () =>{
    const [ isActive, setIsActive ] = useState(false)

    //Função para renderizar tardiamente o componente(tipo um lazy load bem gambiarra)
    const handleScroll = () =>{
        const scrollY = window.scrollY;

        if(scrollY > 102) return setIsActive(true)
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
            </section>

            <Botao texto="Agendar Doação" cor="#D33741"/>
            </>
        )
        
    )
}

export default BancoSangue;