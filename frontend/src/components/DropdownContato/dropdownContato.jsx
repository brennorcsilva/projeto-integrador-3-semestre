import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Card from '../CardContato/cardContato'
import setaBaixo from '../../assets/img/seta-baixo.svg'
import redesUrl from '../../assets/img/redes-sociais.svg'
import instagramUrl from '../../assets/img/instagram.svg'
import twitterUrl from '../../assets/img/twitter.svg'
import facebookUrl from '../../assets/img/facebook.svg'
 

const dropDownContato = () =>{
    return(
        <DropdownMenu className="w-80">
      <DropdownMenuTrigger className="w-80">
        <Card titulo="Redes sociais" imgUrl={redesUrl}/>
        <img src={setaBaixo} alt="icone seta para baixo" className="absolute top-90 left-80 cursor-pointer"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="container-redes">
                <p>Instagram</p>
                <img src={instagramUrl} alt="icone instagram"/>
            </div>
          </DropdownMenuItem>
        <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="container-redes">
                <p>Facebook</p>
                <img src={facebookUrl} alt="icone facebook"/>
            </div>
          </DropdownMenuItem>
            <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="container-redes">
                <p>Twitter/X</p>
                <img src={twitterUrl} alt="icone twitter"/>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    )
}

export default dropDownContato;