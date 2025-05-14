import CardContato from "../CardContato/cardContato";
import DropdownContato from '../DropdownContato/dropdownContato'
import emailUrl from '../../assets/img/email.png'
import telefoneUrl from '../../assets/img/telefone.svg'
import redesUrl from '../../assets/img/redes-sociais.svg'

const Contato = () =>{
    return(<>
        <h1 className="text-(length:--tamanho-titulo) text-(--cor-sangue) max-w-50">Perguntas frequentes</h1>

        <CardContato titulo="Email" texto="horizon@conexsp.com" imgUrl={ emailUrl }/>
        <CardContato titulo="Telefone" texto="+55 11 98431-0165" imgUrl={ telefoneUrl }/>
        <DropdownContato titulo="Redes Sociais" imgUrl={ redesUrl }/>
    </>
    )
}

export default Contato;