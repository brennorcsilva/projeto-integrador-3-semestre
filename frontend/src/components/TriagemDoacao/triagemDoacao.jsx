import { useState, useEffect } from 'react'
import '../../assets/css/triagemDoacao.css'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Alerta from '../Alerta/alerta'

const TriagemDoacao = ({handleSubmit}) =>{
    //Estados a serem manipulados
    const [ progresso, setProgresso ] = useState({
        titulo: 0,
        value: 0
    })

    const [ prevStep, setPrevStep ] = useState({
        resposta: '',
        id: null
    })

    const [ perguntas, setPerguntas ] = useState(
        [
            {
                id: 0,
                texto: "Doou sangue há menos de 2 meses?",
                resposta: false 
            },
            {
                id: 1,
                texto: "Fez procedimento dentário ou limpeza com anestesia local há menos de 3 dias?",
                resposta: false
            },
            {
                id: 2,
                texto: "Fez exame / procedimento endoscópico há menos de 6 meses?",
                resposta: false
            },
            {
                id: 3,
                texto: "Teve infecção pelo SARS COV-2 há menos de 10 dias?",
                resposta: false
            },
            {
                id: 4,
                texto: "Fez acupuntura em procedimento não seguro há menos de 06 meses?",
                resposta: false
            },
            {
                id: 5,
                texto: "Teve hepatite ou icterícia após 11 anos de idade?",
                resposta: false
            }
        ])

    const [ respostas, setRespostas ] = useState([])

    const [ isChecked, setIsChecked ] = useState(false)

    const [ isOpen, setIsOpen ] = useState(false)

    const [ mensagemAviso, setMensagemAviso ] = useState({
        titulo: "",
        texto: "",
        style: "",
        handleSubmit: handleSubmit
    })

    //Funções
    const Progresso = () =>{        
        return <Progress value={progresso.value} className="w-full barra-progresso mb-4"/>
    }

    const handleChange = (e, id) =>{
        if(prevStep.id === id){
            setRespostas(
                respostas.map((item) =>(
                    item.id === id+1 ? {...item, id_resposta: id, resposta: e === "sim" ? true : false} : ''
                ))
            )
            return;
        }else{
            if(progresso.value >= 100){
                return;
            }else{
                const respostaExistente = respostas.find(item => item.id_resposta === id)
                if(respostaExistente){
                    //Atualizando a resposta que já existe
                    setRespostas(respostas.map(item =>(
                        item.id_resposta === id ? {...item, resposta: e === "sim" ? true : false} : item
                    )))

                            
                    setPrevStep({
                        resposta: e,
                        id: id
                    })
                    return;
                }

                const json = {
                    id: respostas.length + 1,
                    id_resposta: id,
                    resposta: e === "sim" ? true : false
                }
                setRespostas([...respostas, json])
                
                setProgresso(prev => ({
                    ...prev, 
                    titulo: prev.titulo+1,
                    value: Math.min(prev.value+17, 100)
                }))
            }
        }
    }

    const handleClick = () =>{
        const respostaErrada = respostas.find(item => item.resposta === true)
        
        //Verificando apenas se o usuário respondeu tudo
        if(respostas.length < 6){
            setMensagemAviso({
                titulo: "Erro ao enviar!",
                texto: "Por favor, responda todas as perguntas.",
                style: "text-red-600"
            })
            return setIsOpen(true)
        } 

        //Verificando se o checkbox de termos foi checado
        if(!isChecked){
            setMensagemAviso({
                titulo: "Erro ao enviar!",
                texto: "Por favor, aceito nossos termos de consentimento.",
                style: "text-red-600"
            })
            return setIsOpen(true)
        }

        //Caso alguma resposta seja SIM(caso ruim), retornará erro/mensagem
        if(respostaErrada){
            setMensagemAviso({
                titulo: "Erro! Usuário não passível de doação",
                texto: "Infelizmente, não poderemos continuar com seu agendamento devido à incongruências em relação a nossa conduta de triagem. Por favor, procure a unidade de saúde mais próxima para mais informações.",
                style: "text-red-600"
            })
            return setIsOpen(true)
        }
            setMensagemAviso({
                titulo: "Sucesso! Usuário passível de doação",
                texto: "Parabéns! Você é elegível para doação de sangue! Por favor, continue para o agendamento",
                style: "text-green-600",
            })
        setIsOpen(true)

        setTimeout(() =>{ 
                setMensagemAviso({
                    titulo: "Sucesso! Usuário passível de doação",
                    texto: "Parabéns! Você é elegível para doação de sangue! Por favor, continue para o agendamento",
                    style: "text-green-600",
                    handleSubmit: handleSubmit()
                })
        }, 3000)
    }

    return(
        <section className="flex justify-center items-center mt-8">
            <div className="w-full max-w-2xl mx-auto rounded-lg shadow-[0_0_10px_#9C9999] px-6 py-4">
                
                <div className="flex flex-col">
                    
                    <div className="flex justify-between mb-1">
                        <h1>Passo {progresso.titulo} de 6</h1>
                        <h1>{progresso.value}% completo</h1>
                    </div>
                    <Progresso/>

                </div>

                <div className="container-perguntas flex flex-col gap-y-4">
                    { perguntas.map((pergunta) => (
                        <div className="pergunta" key={pergunta.id}>
                            <p>{pergunta.texto}</p>
                            <RadioGroup className="flex" onValueChange={(e, id) => handleChange(e, pergunta.id)}>

                                <div className="flex items-center gap-x-2 mt-1">
                                    <RadioGroupItem value="sim" id={pergunta.id}/>
                                    <Label htmlFor={pergunta.id} className="cursor-pointer">Sim</Label>
                                </div>

                                <div className="flex items-center gap-3" >
                                    <RadioGroupItem value="não" id={pergunta.texto}/>
                                    <Label htmlFor={pergunta.texto} className="cursor-pointer">Não</Label>
                                </div>
                            </RadioGroup>
                        </div>

                    ))}
                </div>
                
                <div className="flex gap-x-2 justify-center mt-2 mb-4">
                    <Checkbox id="termos" className="cursor-pointer" onCheckedChange={() => setIsChecked(!isChecked)}/>
                    <Label htmlFor="termos" className="text-(--cor-sangue) cursor-pointer">Declaro que as respostas são verdadeiras</Label>
                </div>
                
                <div className="flex justify-center items-center">
                    <button className="bg-(--cor-sangue) py-1 px-8 rounded-xl text-white cursor-pointer transition duration-500 hover:scale-110 hover:-translate-y-2" onClick={handleClick}>Enviar</button>
                </div>
            </div>
            { isOpen && <Alerta titulo={mensagemAviso.titulo} texto={mensagemAviso.texto} style={mensagemAviso.style}/>}
        </section>
    )
}

export default TriagemDoacao;