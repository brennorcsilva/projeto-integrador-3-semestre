import CardContato from "../CardContato/cardContato";
import DropdownContato from '../DropdownContato/dropdownContato'
import emailUrl from '../../assets/img/email.png'
import telefoneUrl from '../../assets/img/telefone.svg'
import redesUrl from '../../assets/img/redes-sociais.svg'
import instagramVermelho from '../../assets/img/instagram-vermelho.svg'
import facebookVermelho from '../../assets/img/facebook-vermelho.svg'
import twitterVermelho from '../../assets/img/instagram-vermelho.svg'
import { useState } from "react";

const Contato = () =>{
    const [ redesProps, setRedesProps ] = useState([
        {
            "id": 1,
            "nome": "Instagram",
            "url": instagramVermelho
        },
        {
            "id": 2,
            "nome": "Facebook",
            "url": facebookVermelho
        },
        {
            "id": 3,
            "nome": "Twitter/X",
            "url": twitterVermelho
        }
    ])
    return(<>

        <div className="container-cards-contato flex flex-col gap-y-4 relative">
            <h1 className="text-(length:--tamanho-titulo) text-(--cor-sangue)">Perguntas frequentes</h1>
            <CardContato titulo="Email" texto="horizon@conexsp.com" imgUrl={ emailUrl }/>
            <CardContato titulo="Telefone" texto="+55 11 98431-0165" imgUrl={ telefoneUrl }/>
            <DropdownContato titulo="Redes Sociais" imgUrl={ redesUrl } isImg={true} redes={redesProps}/>
        </div>

        <div className="container-dropdown-contato flex flex-col gap-y-4">
            <DropdownContato titulo="Como funciona o agendamento?" texto="O agendamento é 100% seguro e eficiente! Primeiro você escolhe a unidade mais próxima, passa pelo nosso sistema de triagem eletrônica, escolha a data disponível e pronto! :)"/>
            <DropdownContato titulo="Eu tenho que pagar algo?" texto="lorem ipsum dolor met color"/>
            <DropdownContato titulo="Não consigo localizar minhas doações" texto="lorem ipsum dolor met color"/>
            <DropdownContato titulo="Não consegui localizar nenhum local para doação perto de mim" texto="lorem ipsum dolor met color"/>
            <DropdownContato titulo="Como cadastro meu Hospital / Posto de coleta?" texto="lorem ipsum dolor met color"/>
        </div>

    </>
    )
}

export default Contato;