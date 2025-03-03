import '../../assets/css/parceiros.css'
import imgUnimed from '../../assets/img/parceiro-unimed.png'
import imgAmil from '../../assets/img/parceiro-amil.png'
import imgSulamerica from '../../assets/img/parceiro-sulamerica.png'
import imgCamilo from '../../assets/img/parceiro-camilo.png'
import imgAllianz from '../../assets/img/parceiro-allianz.png'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'


const Parceiros = () =>{
    //Criando um array com todas as imagens
    const arrImg = [ {src: imgUnimed, alt: "parceiro unimed doacao de sangue"}, {src: imgAmil, alt: "parceiro amil doacao de sangue"}, {src: imgSulamerica, alt: "parceiro sulamerica doacao de sangue"}, {src: imgCamilo, alt: "parceiro camilo doacao de sangue"}, {src: imgAllianz, alt: "parceiro allianz doacao de sangue"} ]

    return(
        <section className="parceiros flex justify-center align-center">
            <Carousel className="w-full" plugins={[Autoplay({ delay: 2500, stopOnInteraction: false })]} opts={{ loop: true}}>
                <CarouselContent>
                    { arrImg.map((img, i) => (
                        <CarouselItem key={ i } className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                        <Card>
                            <CardContent className="flex items-center justify-center p-6">
                            <img src={ img.src } alt={ img.alt } className="w-full h-auto img-parceiros"/>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}

export default Parceiros;