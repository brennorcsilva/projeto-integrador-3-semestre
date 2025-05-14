import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const cardContato = ({ titulo, texto, imgUrl }) =>{
    return(
        <Card className="max-w-80 py-4 px-5 flex justify-start items-center gap-x-4 relative">
            <div className="container-img">
                <img src={imgUrl} alt="icone redes"/>
            </div>
            
            <div className="container-texto">
                <h1 className="text-(--cor-sangue) text-2xl font-bold">{ titulo }</h1>
                <p className="text-[#284F60]">{ texto }</p>
            </div>
        </Card>
    )
}

export default cardContato;