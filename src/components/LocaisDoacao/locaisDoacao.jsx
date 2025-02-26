import '../../assets/css/locaisDoacao.css'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import React, { useState, useEffect } from 'react'
import markerMaps from '../../assets/img/marker-maps.svg'

const LocaisDoacao = () =>{

    const [ userLocation, setUserLocation ] = useState(null)

    //Funcao responsável por pegar a posicao atual do usuario
    const getUserLocation = () =>{
        //Se a geolocalizacao for suportada pelo navegador...
        if(navigator.geolocation && !userLocation){
            navigator.geolocation.getCurrentPosition(
                (position) =>{
                    const { latitude, longitude } = position.coords
                    setUserLocation({ latitude, longitude })
                },
                //Se der erro enquanto pega a posicao...
                (error) =>{
                    alert(`Erro ao pegar sua posição! ${ error.message }}`)
                }
            );
        }else if(userLocation){
            return;
        }else{
            alert("Seu navegador não suporta a nossa geolocalização! Por favor, digite manualmente ou tente novamente em outro navegador.")
        }
    }

    //Chamando a função assim que a página for renderizada, para depois chamar o mapa e já setar a posição atual do usuario
    useEffect(() =>{
        getUserLocation()
    }, [])
    
    //Função que gerará o mapa
    const Mapa = () =>{
        const apiKey = import.meta.env.VITE_API_KEY;
        const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: apiKey
          })

          //Posicoes fixas de hospitais com banco de sangue
          
          const position = [{ lat: -23.577814508225977, lng: -46.64783765636008 }, {lat: -23.54386904913557, lng: -46.64997646650208 }, {lat: -23.557763365740563, lng: -46.66997784908076 }, { lat: -23.599959457589836, lng: -46.71522022728726}, { lat: -23.568564477015144, lng: -46.64328039412957}]

          //Pegando a posicao atual do usuario e colocando no padrao aceito pela API
          const userLatLng = {  
                lat: userLocation.latitude,
                lng: userLocation.longitude
            }

          return(
          <div className="mapa">
            { isLoaded ? (
            <GoogleMap
            center={ userLatLng }
            zoom={12}
            mapContainerStyle={{ width: '100%', height: '15rem', borderRadius: '30px'}}
            >

            {/*Exibindo para o usuário onde ele está*/  }
            <Marker position = { userLatLng }/>

            {/*Exibindo no mapa a posição dos bancos de sangue*/}
                { position.map((posicao, i) =>(
                    <Marker key={ i + 1 } position={ posicao } icon={ markerMaps}/>
                )) }

            <></>
            </GoogleMap>
            ) : (<></>) }
          </div>
        )
        
    }

    //Função para pesquisar uma posição específica e atualizar no Mapa
    const handleClick = (txt) =>{
        console.log(`A mensagem é: ${ txt }`)
    }

    //Isolando para o onChange nao ficar re-renderizando o componente pai
    const Input = () =>{
        //Pegando o valor digitado no input
        const [ posicao, setPosicao ] = useState('')
        return(<>
        <input type="text" name="posicao" id="posicao" placeholder="Digite algo..." onChange={ (e) => setPosicao(e.target.value) } className="input-posicao"/><span className="span-pesquisar" onClick={ (e) => handleClick(posicao)}></span>
        </>)
    }

    return(
        <section className="locais-doacao flex items-start justify-evenly">
            <div className="container-texto flex align-center justify-center flex-col gap-y-6">
                <h1 className="text-white text-(length:--tamanho-titulo) font-bold text-center">Locais para Doação</h1>
                <p className="text-white text-(length:--tamanho-texto) texto-doacao text-center">A nossa missão é otimizar e agilizar todo o processo de doação de sangue e plaquetas! Ao visitar nosso site, você pode encontrar os hospitais e postos de coleta mais próximos que utilizam o software CONEXSP. Basta inserir seu endereço ao lado e verificar as opções disponíveis. Juntos, salvaremos vidas :)</p>
            </div>

            <div className="container-img w-full flex align-center justify-center flex-col relative gap-y-4">
                { userLocation  && (<Mapa/>)}
                <Input/>
            </div>
        </section>
    )
}

export default LocaisDoacao;