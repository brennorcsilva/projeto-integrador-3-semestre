import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/carouselAvaliacoes.css'
import imgAvaliacao from '../../assets/img/img-avaliacao.png'
import  Botao  from '../Botao/botao'

const CarouselAvaliacoes = () =>{
    return(
        <section className="carousel-avaliacoes flex flex-col">
            <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                breakpoint: {
                    max: 3000,
                    min: 1024
                },
                items: 1
                },
                mobile: {
                breakpoint: {
                    max: 464,
                    min: 0
                },
                items: 1
                },
                tablet: {
                breakpoint: {
                    max: 1024,
                    min: 464
                },
                items: 1
                }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
            >
                <div className="container-avaliacao flex justify-center gap-x-[2rem]">
                    <img src={ imgAvaliacao} alt="imagem de usuario avaliacao"/>
                    <div className="container-texto flex flex-col gap-y-[.5rem]">
                        <h1 className="text-(length:--tamanho-titulo) font-bold">Douglas Vieira dos Santos, 27 anos</h1>
                        <p className="text-(length:--tamanho-texto) max-w-[80%]">Eu fui um dos primeiros a utilizar o CONEXSP. Realizei uma doação de plaquetas. A agilidade em comparação com outros sistemas é realmente gritante!</p>
                    </div>
                </div>

                <div className="container-avaliacao flex justify-center gap-x-[2rem]">
                    <img src={ imgAvaliacao} alt="imagem de usuario avaliacao"/>
                    <div className="container-texto flex flex-col gap-y-[.5rem]">
                        <h1 className="text-(length:--tamanho-titulo) font-bold">Douglas Vieira dos Santos, 27 anos</h1>
                        <p className="text-(length:--tamanho-texto) max-w-[80%]">Eu fui um dos primeiros a utilizar o CONEXSP. Realizei uma doação de plaquetas. A agilidade em comparação com outros sistemas é realmente gritante!</p>
                    </div>
                </div>

                <div className="container-avaliacao flex justify-center gap-x-[2rem]">
                    <img src={ imgAvaliacao} alt="imagem de usuario avaliacao"/>
                    <div className="container-texto flex flex-col gap-y-[.5rem]">
                        <h1 className="text-(length:--tamanho-titulo) font-bold">Douglas Vieira dos Santos, 27 anos</h1>
                        <p className="text-(length:--tamanho-texto) max-w-[80%]">Eu fui um dos primeiros a utilizar o CONEXSP. Realizei uma doação de plaquetas. A agilidade em comparação com outros sistemas é realmente gritante!</p>
                    </div>
                </div>

                <div className="container-avaliacao flex justify-center gap-x-[2rem]">
                    <img src={ imgAvaliacao} alt="imagem de usuario avaliacao"/>
                    <div className="container-texto flex flex-col gap-y-[.5rem]">
                        <h1 className="text-(length:--tamanho-titulo) font-bold">Douglas Vieira dos Santos, 27 anos</h1>
                        <p className="text-(length:--tamanho-texto) max-w-[80%]">Eu fui um dos primeiros a utilizar o CONEXSP. Realizei uma doação de plaquetas. A agilidade em comparação com outros sistemas é realmente gritante!</p>
                    </div>
                </div>

                <div className="container-avaliacao flex justify-center gap-x-[2rem]">
                    <img src={ imgAvaliacao} alt="imagem de usuario avaliacao"/>
                    <div className="container-texto flex flex-col gap-y-[.5rem]">
                        <h1 className="text-(length:--tamanho-titulo) font-bold">Douglas Vieira dos Santos, 27 anos</h1>
                        <p className="text-(length:--tamanho-texto) max-w-[80%]">Eu fui um dos primeiros a utilizar o CONEXSP. Realizei uma doação de plaquetas. A agilidade em comparação com outros sistemas é realmente gritante!</p>
                    </div>
                </div>
            </Carousel>

            <div className="container-botao flex justify-around align-center flex-wrap">
                <Botao texto="Consultar meu histórico de doações"/>
                <Botao texto="Quero me cadastrar como instituição" cor="#284F60"/>
            </div>
        </section>
    )
}

export default CarouselAvaliacoes;