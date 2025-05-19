import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useState } from "react";

const cardContato = ({ titulo, texto, imgUrl}) =>{
    const [ imagem, setImagem ] = useState(imgUrl && imgUrl.trim() !== '')
    return(
        <Card className="max-w-80 py-4 px-5 flex justify-start items-center gap-x-4 relative">
            <div className="container-img">
                {imagem ? (
                    <img src={imgUrl} alt="icone redes"/>
                ) : (<></>)}
            </div>
            
            <div className="container-texto">
                <h1 className="text-(--cor-sangue) text-xl font-bold text-start max-w-[14rem]">{ titulo }</h1>
                <p className="text-[#284F60]">{ texto }</p>
            </div>
        </Card>
    )
}

export default cardContato;