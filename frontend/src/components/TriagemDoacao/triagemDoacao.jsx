import { useState, useEffect } from 'react'
import '../../assets/css/triagemDoacao.css'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const TriagemDoacao = () =>{
    //Estados a serem manipulados
    const [ progresso, setProgresso ] = useState({
        titulo: 0,
        value: 0
    })

    const [ currentStep, setCurrentStep ] = useState(0)

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

    const Progresso = () =>{        
        return <Progress value={progresso.value} className="w-full barra-progresso mb-4"/>
    }

    const handleChange = (e) =>{
        setProgresso(prev => ({
            ...prev, 
            titulo: progresso.titulo+1,
            value: progresso.value+17
        }))
        console.log(e)
    }

    return(
        <section>
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
                            <RadioGroup className="flex" onValueChange={handleChange}>

                                <div className="flex items-center gap-x-2 mt-1">
                                    <RadioGroupItem value="sim" id={pergunta.id}/>
                                    <Label htmlFor={pergunta.id} className="cursor-pointer">Sim</Label>
                                </div>

                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="não" id={pergunta.texto}/>
                                    <Label htmlFor={pergunta.texto} className="cursor-pointer">Não</Label>
                                </div>
                            </RadioGroup>
                        </div>

                    ))}
                </div>
                
                <div className="flex gap-x-2 justify-center my-4">
                    <Checkbox id="termos" className="cursor-pointer"/>
                    <Label htmlFor="termos" className="text-(--cor-sangue) cursor-pointer">Declaro que as respostas são verdadeiras</Label>
                </div>
            </div>
        </section>
    )
}

export default TriagemDoacao;