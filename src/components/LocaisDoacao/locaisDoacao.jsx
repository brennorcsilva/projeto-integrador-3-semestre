import '../../assets/css/locaisDoacao.css'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { useState, useEffect } from 'react'

const LocaisDoacao = () =>{

    const [ userLocation, setUserLocation ] = useState(null)

    //Funcao responsável por pegar a posicao atual do usuario
    const getUserLocation = () =>{
        //Se a geolocalizacao for suportada pelo navegador...
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) =>{
                    const { latitude, longitude } = position.coords
                    setUserLocation({ latitude, longitude })
                },
                //Se der erro enquanto pega a posicao...
                (error) =>{
                    alert("Erro ao pegar sua posição! Tente novamente")
                }
            );
        }else{
            alert("Seu navegador não suporta a nossa geolocalização! Por favor, digite manualmente ou tente novamente em outro navegador.")
        }
    }

    //Chamando a função assim que a página for renderizada, para depois chamar o mapa e já setar a posição atual do usuario
    useEffect(() =>{
        getUserLocation()
    },)
    
    //Função que gerará o mapa
    const Mapa = () =>{
        const apiKey = import.meta.env.VITE_API_KEY;
        const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: apiKey,
          })

        
          const position = [{lat: -23.663359, lng:  -46.661627}, {lat: -23.666473, lng: -46.655793}, {lat: -23.661483, lng: -46.663155  }]
          
          const latlng = {  
                lat: userLocation.latitude,
                lng: userLocation.longitude
            }

          return(
          <div className="mapa">
            { isLoaded ? (
            <GoogleMap
            center={ latlng }
            zoom={12}
            >
                { position.map((posicao, i) =>(
                    <Marker key={ i + 1 } position={ posicao } options={{
                        label: {
                            text: `Endereço ${ i + 1 }`,
                            className: "mapa-marker",
                        }
                    }}/>
                )) }

            <></>
            </GoogleMap>
            ) : (<></>) }
          </div>
        )
        
    }

    //Pegando o valor digitado no input
    const [ posicao, setPosicao ] = useState('')

    //Função para pesquisar uma posição específica e atualizar no Mapa
    const handleClick = () =>{
        console.log(`A mensagem escrita é: ${ posicao }`)
    }

    return(
        <section className="locais-doacao flex items-start justify-evenly">
            <div className="container-texto flex align-center justify-center flex-col gap-y-6">
                <h1 className="text-white text-(length:--tamanho-titulo) font-bold text-center">Locais para Doação</h1>
                <p className="text-white text-(length:--tamanho-texto) texto-doacao text-center">A nossa missão é otimizar e agilizar todo o processo de doação de sangue e plaquetas! Ao visitar nosso site, você pode encontrar os hospitais e postos de coleta mais próximos que utilizam o software CONEXSP. Basta inserir seu endereço ao lado e verificar as opções disponíveis. Juntos, salvaremos vidas :)</p>
            </div>

            <div className="container-img w-full max-w-xs flex align-center justify-center flex-col relative gap-y-2">
                { userLocation  && (<Mapa/>)}
                <input type="text" name="posicao" id="posicao" placeholder="Digite algo..." onChange={ (e) =>setPosicao(e.target.value) } className="input-posicao"/><span className="span-pesquisar" onClick={ handleClick }></span>
            </div>
        </section>
    )
}

export default LocaisDoacao;