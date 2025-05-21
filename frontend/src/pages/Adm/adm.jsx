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
      }
    }

    fetchData()
  }, [])

  useEffect(() =>{
    console.log(sangueSelecionado)
  }, [sangueSelecionado])

  const imprimir = (dadosAgendamento, e) =>{
    setSangueSelecionado(e)
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
              <Button variant="outline">Excluir</Button>
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
            <AlertDialogAction className="cursor-pointer">Deletar</AlertDialogAction>
          </AlertDialogFooter>
          </AlertDialogContent>
        </>) : (<>
          <AlertDialogTrigger asChild>
              <Button variant="outline">Imprimir</Button>
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
            <AlertDialogAction className="cursor-pointer">Cancelar</AlertDialogAction>
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
            <TableHead>Email_usuario</TableHead>
            <TableHead>Nome_hospital</TableHead>
            <TableHead>Dia_agendamento</TableHead>
            <TableHead>Mes_agendamento</TableHead>
            <TableHead>Hora_agendamento</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agendamentos.map((agendamento) => (
            <TableRow key={agendamento.id_agendamento}>
              <TableCell className="font-medium border-2">{agendamento.id_agendamento}</TableCell>
              <TableCell className="border-2">{agendamento.id_usuario}</TableCell>
              <TableCell className="text-right border-2">{agendamento.id_hospital}</TableCell>
              <TableCell className="text-right border-2">{agendamento.dia_agendamento}</TableCell>
              <TableCell className="text-right border-2">{agendamento.mes_agendamento}</TableCell>
              <TableCell className="text-right border-2">{agendamento.hora_agendamento}</TableCell>
              <TableCell className="text-center border-2"><Alerta dadosAgendamento={agendamento} className="cursor-pointer"/></TableCell>
              <TableCell className="text-center border-2"><Alerta dadosAgendamento={null} cancelarAgendamento={true} className="cursor-pointer"/></TableCell>
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