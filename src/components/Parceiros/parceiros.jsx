import '../../assets/css/parceiros.css'
import imgUnimed from '../../assets/img/parceiro-unimed.png'
import imgAmil from '../../assets/img/parceiro-amil.png'
import imgSulamerica from '../../assets/img/parceiro-sulamerica.png'
import imgCamilo from '../../assets/img/parceiro-camilo.png'
import imgAllianz from '../../assets/img/parceiro-allianz.png'

const Parceiros = () =>{
    return(
        <section className="parceiros flex justify-between align-center">
            <img src={ imgUnimed } alt="img unimed" className="img-parceiros"/>
            <img src={ imgAmil } alt="img amil" className="img-parceiros"/>
            <img src={ imgSulamerica } alt="img unimed" className="img-parceiros"/>
            <img src={ imgCamilo } alt="img unimed" className="img-parceiros"/>
            <img src={ imgAllianz } alt="img unimed" className="img-parceiros"/>

        </section>
    )
}

export default Parceiros;