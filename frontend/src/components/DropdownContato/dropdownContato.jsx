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
import '../../assets/css/dropdownContato.css'
 

const dropDownContato = ({titulo="", texto="", isImg, redes=false}) =>{
    return(
        <DropdownMenu className="w-80">
      <DropdownMenuTrigger className="w-80 botao-relative">

        <div className="container-conteudo relative">
          {isImg ? (
            <Card titulo={titulo} imgUrl={redesUrl}/>
            ) : (<Card titulo={titulo}/>)}

          <img src={setaBaixo} alt="icone seta para baixo" className="absolute top-10 right-5 cursor-pointer"/>
        </div>
        
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuGroup>
          { redes ? (
            //Mapeando todos as redes(caso exista) e incluindo-as
            redes.map((rede) => (<>
              <DropdownMenuItem key={rede.id}>
                  <div className="container-dropdown-redes flex items-center w-100 justify-between px-1">
                    <p className="text-lg">{rede.nome}</p>
                    <img src={rede.url} alt="icone rede social"/>
                  </div>
                  </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>))
          ) : (
            <DropdownMenuItem>
              <div className="dropdown-perguntas">
                <p>{texto}</p>
              </div>
            </DropdownMenuItem>
          ) }
         
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    )
}

export default dropDownContato;