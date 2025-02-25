import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import AutoPlay from 'embla-carousel-autoplay'
import '../../assets/css/bannerCarousel.css'

const BannerCarousel = () =>{

    const CarouselHome = () =>{
        return(
        <Carousel className="w-full h-85" plugins={[ AutoPlay({ delay: 2000, stopOnInteraction: false})]} opts={{ loop: true }}>
            <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="basis-3/3">
                <div className="p-1">
                    <Card>
                    <CardContent className="w-full flex aspect-square items-center justify-center p-6 h-95">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                    </CardContent>
                    </Card>
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="hidden"/>
            <CarouselNext className="hidden"/>
        </Carousel>
        )
    }

    return(
        <section className="banner-carousel">
            <CarouselHome/>
        </section>
    )
}

export default BannerCarousel;