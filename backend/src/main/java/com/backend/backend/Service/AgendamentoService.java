package com.backend.backend.Service;

import com.backend.backend.Helpers.HelperCrud;
import com.backend.backend.Model.Agendamento;
import com.backend.backend.Repository.AgendamentoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
@CrossOrigin(origins = "http://localhost:5173")
public class AgendamentoService extends HelperCrud {
    @Autowired
    private AgendamentoRepo agendamentoRepo;

    //Inserir Agendamento
    public ResponseEntity<?> adicionarAgendamento(Agendamento agendamento) {
        try{
            //Agendamento temporario
            Agendamento agendamentoTemp = new Agendamento();

            agendamentoTemp.setId_agendamento(gerarSequencia(Agendamento.SEQUENCE_NAME));
            agendamentoTemp.setId_usuario(agendamento.getId_usuario());
            agendamentoTemp.setId_hospital(agendamento.getId_hospital());
            agendamentoTemp.setDia_agendamento(agendamento.getDia_agendamento());
            agendamentoTemp.setMes_agendamento(agendamento.getMes_agendamento());
            agendamentoTemp.setHora_agendamento(agendamento.getHora_agendamento());

            //Salvando no Repo
            agendamentoRepo.save(agendamentoTemp);
            return ResponseEntity.ok("Agendamento adicionado com sucesso!");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro! Não foi possível adicionar");
        }
    }

    //Lendo os agendamentos
    public ResponseEntity<?> lerAgendamento(){
        try{
            List<Agendamento> agendamentos = agendamentoRepo.findAll();

            //Se os agendamento existirem...
            if(!agendamentos.isEmpty()){
                return ResponseEntity.ok(agendamentos);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro! Não há agendamentos cadastrados");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro! Não foi possível adicionar");
        }
    }

    //Lendo os agendamentos por ID
    public ResponseEntity<?> lerAgendamentoById(long id){
        try{
            Optional<Agendamento> agendamento = agendamentoRepo.findById(id);

            if(agendamento.isPresent()){
                return ResponseEntity.ok(agendamento);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERRO! Agendamento não encontrado!");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro!");
        }
    }

    //Excluindo agendamento por ID
    public ResponseEntity<?> removerAgendamentoById(long id){
        try{
            agendamentoRepo.deleteById(id);
            return ResponseEntity.ok("Agendamento deletado com sucesso!");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro!");
        }
    }
}
