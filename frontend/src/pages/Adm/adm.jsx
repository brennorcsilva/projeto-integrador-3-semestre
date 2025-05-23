import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import axios from 'axios';
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const Tabela = () =>{
  //Estado de agendamentos
  const [ agendamentos, setAgendamentos ] = useState([])

  //Estados de infos importantes que serão utilizadas - id_usuario, id_hospital
  const [ ids, setIds ] = useState([])

  //Entidade email_usuario e nome_hospital
  const [ email, setEmail ] = useState([])

  const [ hospital, setHospital ] = useState([])


  //Estado de tipos sanguineos
  const [ tiposSanguineos, setTiposSanguineos ] = useState([
    { "id": 1, "tipo": "A+" },{ "id": 2, "tipo": "A-" },
    { "id": 3, "tipo": "B+" }, { "id": 4, "tipo": "B-" },
    { "id": 5, "tipo": "AB+" },
    { "id": 6, "tipo": "AB-" },
    { "id": 7, "tipo": "O+" }, { "id": 8, "tipo": "O-" },
  ])

  //tipo sanguineo selecionado
  const [ sangueSelecionado, setSangueSelecionado ] = useState('')


  //Chamando a API do backend
  useEffect(() =>{
    const fetchData = async () =>{
      const res = await axios.get("http://localhost:8080/lerAgendamento")

      //Se existir...
      if(res.data){
        setAgendamentos(res.data)

        res.data.map((data) => (
          setIds(prev => [...prev, {id_usuario: data.id_usuario, id_hospital: data.id_hospital}])
        ))
      }
    }

    fetchData()
  }, [])

  //Pegando os id_usuario e dando o get 
  useEffect(() =>{
    const fetchData = async() =>{
      var res;

      if(ids.length === 0){
        return;
      }else{
        ids.map(async(dado) => {
          res = await axios.get(`http://localhost:8080/lerEmail/${dado.id_usuario}`)
          setEmail(prev => [...prev, res.data])
        })
      }

    }
    fetchData()
  }, [ids])

  //Pegando os id_email e dando o get
  useEffect(() =>{
    const fetchData = async() =>{
      var res;
      if(ids.length === 0){
        return;
      }else{
        ids.map(async(dado) => {
          res = await axios.get(`http://localhost:8080/lerNomeHospital/${dado.id_hospital}`)
          setHospital(prev => [...prev, res.data])
        })
      }}

      fetchData()
  }, [ids])

  //Imprimir dados
  const imprimir = (dadosAgendamento, e) =>{
    setSangueSelecionado(e)
  }

  //Exclusao de um agendamento
  const deletarAgendamento = async(dados) =>{
    try{
      await axios.delete(`http://localhost:8080/removerAgendamentos/${dados.id_agendamento}`)
      location.reload()
    }catch(e){
      console.log(e)
    }
  }

  //Componente Select
  const TipoSanguineo = (dadosAgendamento) =>{
    return(
      <Select onValueChange={(e) => imprimir(dadosAgendamento, e)}>
        <SelectTrigger className="w-50 flex mx-auto">
        <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
            { tiposSanguineos.map((tipoSanguineo) => (<>
              <SelectItem key={tipoSanguineo.id} value={tipoSanguineo.tipo}>{tipoSanguineo.tipo}</SelectItem>
          </>)) }
        </SelectContent>
      </Select>
    )
  }

  //Componente Alert Dialog
  const Alerta = ({ dadosAgendamento, cancelarAgendamento }) =>{
    return(
        <AlertDialog>
            { cancelarAgendamento ? (<>
              <AlertDialogTrigger asChild>
              <Button className="bg-(--cor-sangue) hover:bg-red-400 cursor-pointer">Excluir</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
            <AlertDialogHeader>
                  <AlertDialogTitle>Cuidado! Essa ação é irreversível</AlertDialogTitle>
                  <AlertDialogDescription>
                      Tem certeza que deseja excluir agendamento?
                  </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
            <AlertDialogAction className="cursor-pointer bg-(--cor-sangue) hover:bg-red-400" onClick={() => deletarAgendamento(dadosAgendamento)}>Deletar</AlertDialogAction>
          </AlertDialogFooter>
          </AlertDialogContent>
        </>) : (<>
          <AlertDialogTrigger asChild>
              <Button className="cursor-pointer bg-indigo-500 hover:bg-indigo-300">Imprimir</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
            <AlertDialogHeader>
                  <AlertDialogTitle>Siga as instruções abaixo</AlertDialogTitle>
                  <AlertDialogDescription>
                      Antes de imprimir, por favor, selecione corretamente o tipo sanguíneo do paciente
                  </AlertDialogDescription>
                  <TipoSanguineo dadosAgendamento={dadosAgendamento}/>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogAction className="cursor-pointer bg-stone-600">Cancelar</AlertDialogAction>
          </AlertDialogFooter>
          </AlertDialogContent>
        </>  
        )}
        </AlertDialog>
    )
  }

  return(
    <div className="container p-(--espacamento) flex mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">ID_agendamento</TableHead>
            <TableHead>Email do Doador</TableHead>
            <TableHead>Nome do Hospital</TableHead>
            <TableHead>Dia do Agendamento</TableHead>
            <TableHead>Mes do agendamento</TableHead>
            <TableHead>Hora do agendamento</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agendamentos.map((agendamento, index) => (
            <TableRow key={agendamento.id_agendamento}>
              <TableCell className="font-medium border-2 text-center">{agendamento.id_agendamento}</TableCell>
              <TableCell className="border-2 text-center">{email[index]}</TableCell>
              <TableCell className="text-center border-2">{hospital[index]}</TableCell>
              <TableCell className="text-center border-2">{agendamento.dia_agendamento}</TableCell>
              <TableCell className="text-center border-2">{agendamento.mes_agendamento}</TableCell>
              <TableCell className="text-center border-2">{agendamento.hora_agendamento}</TableCell>
              <TableCell className="text-center border-2"><Alerta dadosAgendamento={agendamento} className="cursor-pointer"/></TableCell>
              <TableCell className="text-center border-2"><Alerta dadosAgendamento={agendamento} cancelarAgendamento={true} className="cursor-pointer"/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
      )
  }


  const Adm = () =>{
      return(
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3 }}>
              <Header/>
              <Tabela/>
              <Footer/>
      </motion.div>
    )
}

export default Adm;