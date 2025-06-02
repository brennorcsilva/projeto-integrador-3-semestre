import '../../assets/css/formulario.css'
import logo from '../../assets/img/logo-circulo.png'
import { useState, useEffect } from 'react';
import { useMask  } from '@react-input/mask'
import { Link } from 'react-router-dom'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,  AlertDialogTitle, } from "@/components/ui/alert-dialog"
import axios from 'axios'


const Formulario = ({ formCadastro }) =>{
    //Definindo os estados do formulario
    const [ nome, setNome ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ senha, setSenha ] = useState('')
    const [ confirmarSenha, setConfirmarSenha ] = useState('')
    const [ cpf, setCpf ] = useState('')
    const [ cep, setCep ] = useState('')
    const [ endereco, setEndereco ] = useState('')
    
    //Estado responsável para controle do componente de avisos
    const [ isAvisoOpen, setIsAvisoOpen ] = useState(false)
    const [ avisoInfo, setAvisoInfo ] = useState({ titulo: '', mensagem: '', erro: false })

    //Estados responsáveis por monitorar se a senha preenche os requisitos e também se a senha é igual ao confirmar senha
    const [ isSenha, setIsSenha ] = useState(false)
    const [ senhaFinal, setSenhaFinal ] = useState(false)

    //Definindo as mascaras de CPF e CEP no formulario
    const cpfRef = useMask({
        mask: '___.___.___-__',
        replacement: { _: /\d/ },
    })

    const cepRef = useMask({
        mask: '_____-___',
        replacement: { _: /\d/ },
    })
    

    //Lidando com a mudança de senha e verificacoes de requisitos
    const handleSenhaChange = (e) =>{
        setSenha(e.target.value)

        //Verificando se a senha atende aos requisitos de caracteres(um caractere especial, numero e letra)
        if((senha.includes("@") || senha.includes("#") || senha.includes("$") || senha.includes("%")) && (senha.includes(0) || senha.includes(1) || senha.includes(2) || senha.includes(3) || senha.includes(4) || senha.includes(5) || senha.includes(6) || senha.includes(7) || senha.includes(8) || senha.includes(9)) && senha.length >= 3){
            setIsSenha(false)
        }else{
            setIsSenha(true)
        }
    }

    //Funcao para alterar o valor do estado confirmarSenha
    const handleConfirmarSenha = (e) =>{
        setConfirmarSenha(e.target.value)
    }

    //Obrigando o react a alterar o estado da senha/confirmarSenha para nao bugar na manipulação assíncrona padrão do React
    useEffect(() =>{
        if(!isSenha){
            if(senha === confirmarSenha && confirmarSenha.length >= 3){
                setSenhaFinal(true)
            }else{
                setSenhaFinal(false)
            }
        }
    }, [senha, confirmarSenha, isSenha])

    //Componente para exibir mensagens ao usuario
    const Aviso = ({titulo, mensagem, erro}) =>{
        return(
            isAvisoOpen && (
                <AlertDialog defaultOpen={ true }>
                    <AlertDialogContent onEscapeKeyDown={ () => setIsAvisoOpen(false) } >
                        <AlertDialogHeader>
                        { erro ? (<AlertDialogTitle className="text-red-600">{ titulo }</AlertDialogTitle>) 
                        : (<AlertDialogTitle className="text-green-600">{ titulo }</AlertDialogTitle>)
                        }
                        <AlertDialogDescription>
                            { mensagem }
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogAction onClick={ () => setIsAvisoOpen(false)} className="cursor-pointer">Fechar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        )
        
    }

    //Função para verificar se o CPF existe
    const verificacaoCpf = async(e) =>{
        //Criando o array para armazenar os valores
        const arrayCpf = [];

        //Array para armazenar o produto do calculo de CPF
        var produtosCpf = [];
        let j = 1;

        //Armazenando a soma dos dígitos do CPF
        let soma = 0;;
        
        //Armazenando o valor sem os pontos e traços no array
        arrayCpf[0] = cpf.split('.').join('').split('-').join('');

        //Agora, armazenando em cada índice um valor
        arrayCpf.push(arrayCpf[0].split(''));
        
        //Criando uma variável clone para armezanar o CPF pós formatação
        const cpfFinal = cpf.split('.').join('').split('-').join('');

        //Looping para calcular o produto de cada índice do array
        for(let i = 0; i < 9; i++){
            produtosCpf.push(arrayCpf[1][i] * j);
            soma += produtosCpf[i];
            j++;
        }

        //Armazenando o resto da divisao ao CPF
        produtosCpf.push(soma % 11);

        //Se der maior ou igual a 10, pela regra = 0
        if(soma % 11 >= 10){
            arrayCpf[1][9] = 0;
        }else{
            arrayCpf[1][9] = soma % 11;
        }
        
        //Zerando os valores para começar a conta do 11 dígito
        soma = 0;
        j = 0;
        produtosCpf = [];
        //Looping para calcular o ultimo digito do CPF
        for(let i = 0; i < 10; i++){
            produtosCpf.push(arrayCpf[1][i] * j);
            soma += produtosCpf[i];
            j++; 
        }

        //Se der maior ou igual a 10, pela regra = 0
        if(soma % 11 >= 10){
            arrayCpf[1][10] = 0;
        }else{
            arrayCpf[1][10] = soma % 11;
        }
        
        //Se o valor calculado for igual ao CPF final, cpf valido
        if(arrayCpf[1].toString().split(',').join('') == cpfFinal){
            e.preventDefault()
            //Agora eu faço a requisicao e jogo as infos no BD
            try{
                const res = await axios.post("http://localhost:8080/adicionarUsuario", {
                    "nome_usuario": nome,
                    "email_usuario": email,
                    "cpf_usuario": cpf,
                    "senha_usuario": senha
                })
                console.log(res.data)
                setIsAvisoOpen(true)
                setAvisoInfo({
                    titulo: "Informações Válidas!",
                    mensagem: "Cadastro realizado com sucesso!",
                    erro: false
                })
            }catch(error){
                console.log(error)
            }
        }else{
            e.preventDefault()
            setIsAvisoOpen(true)
            setAvisoInfo({
                titulo: "Informações Inválidas!",
                mensagem: "O CPF digitado não existe! Tente novamente",
                erro: true
            })
            setCpf('')

        }
    }

    return(
        <section className="formulario flex align-center flex-1">
            <div className="container-login bg-(--cor-fundo) flex flex-col justify-center align-center w-1/3">
                <img src={ logo } alt="logo do site" className="logo-login"/>  
                <h1 className="text-white mb-8 mt-2 text-(length:--tamanho-texto) font-bold text-center">Bem-vindo novamente!</h1>

                <p className="text-white font-bold text-center">Já possui uma conta?</p>
                <p className="text-white font-bold text-center">Acesse-a agora mesmo!</p>
                <Link to="/login" className="text-white font-bold text-center botao-entrar">Entrar</Link>
            </div>

            <div className="container-cadastro flex flex-col align-center justify-center">
                    <h1 className="text-(length:--tamanho-titulo) text-(--cor-sangue) font-bold text-center">Crie sua conta</h1>
                    <h4 className="text-md text-[#C6C6C6] text-center font-semibold">Preencha com seus dados</h4>
                        <form action="#" method="POST" className="flex flex-wrap form gap-4 mt-2 mx-auto">

                        { formCadastro && (<>
                            <input type="text" name="nome" id="nome" placeholder="Nome" className="w-100 text-lg" onChange={(e) => setNome(e.target.value)}/>
                            <input type="text" name="cpf" id="cpf" placeholder="CPF" className="w-50 text-lg" ref={ cpfRef } onChange={(e) => setCpf(e.target.value)} value={ cpf }/>
                            <input type="email" name="email" id="email" placeholder="E-mail" className="w-[96.5%] text-lg" onChange={(e) => setEmail(e.target.value)}/>

                            <input type="text" name="endereco" id="endereco" placeholder="Endereço" className="w-100 text-lg" onChange={(e) => setEndereco(e.target.value)}/>
                            <input type="text" name="cep" id="cep" placeholder="CEP" className="w-50 text-lg" ref={ cepRef } onChange={(e) => setCep(e.target.value)}/>
                            <input type="password" name="senha" id="senha" placeholder="Senha" className="w-75 text-lg" onKeyUp={handleSenhaChange}/>
                            <input type="password" name="confirmarSenha" id="confirmarSenha" placeholder="Confirmar senha" className="w-75 text-lg" onChange={(e) => handleConfirmarSenha(e)}/>
                            <p className="text-sm text-[#9D9D9D] texto-aviso">Use oito ou mais caracteres com uma combinação de letras, números e símbolos</p>

                            <div className="container-avisos flex flex-col justify-center align-center w-full">
                                <div className="container-mensagem flex gap-x-4 flex-col">
                                    { isSenha && (<p className="text-red-600 text-sm">A senha não atende aos requisitos!</p>)}
                                    { (!isSenha && senha.length >= 3 ) && (<p className="text-green-600 text-sm">A senha atende aos requisitos!</p>) }
                                    
                                    { senhaFinal && (<p className="text-green-600 text-sm">As senhas coincidem!</p>) }
                                    { (!senhaFinal &&  confirmarSenha.length >= 3) && (<p className="text-red-600 text-sm">As senhas não coincidem!</p>) }
                                </div>
                            <input type="submit" value="Cadastrar" className="mx-auto mt-6 mb-6 botao-form text-white font-semibold text-lg" onClick={verificacaoCpf}/>

                            </div>

                            <Aviso titulo={ avisoInfo.titulo } mensagem={ avisoInfo.mensagem } erro={ avisoInfo.erro }/>
                        </>) }
                    </form>
            </div>

        </section>
    )
}

export default Formulario;