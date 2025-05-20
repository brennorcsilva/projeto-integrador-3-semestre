import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import axios from 'axios';
import { motion } from 'framer-motion'
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

const dados = [
  {
    "id": 1,
    "nome": "Matheus",
    "idade": 19
  },
  {
    "id": 2,
    "nome": "Felipao",
    "idade": 21
  }
]

const Tabela = () =>{
  return(
    <div className="container p-(--espacamento)">
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">ID_agendamento</TableHead>
            <TableHead>ID_usuario</TableHead>
            <TableHead>ID_hospital</TableHead>
            <TableHead>dia_agendamento</TableHead>
            <TableHead>mes_agendamento</TableHead>
            <TableHead>hora_agendamento</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dados.map((dado) => (
            <TableRow key={dado.id}>
              <TableCell className="font-medium border-2">{dado.id}</TableCell>
              <TableCell className="border-2">{dado.nome}</TableCell>
              <TableCell className="text-right border-2">{dado.nome}</TableCell>
              <TableCell className="text-right border-2">{dado.nome}</TableCell>
              <TableCell className="text-right border-2">{dado.nome}</TableCell>
              <TableCell className="text-right border-2">{dado.nome}</TableCell>
              <TableCell className="text-right border-2">{dado.nome}</TableCell>
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