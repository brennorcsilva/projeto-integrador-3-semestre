package com.backend.backend.Controller;


import com.backend.backend.Model.Agendamento;
import com.backend.backend.Service.AgendamentoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AgendamentoController{
    private AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    //Adicionar agendamentos
    @PostMapping("/adicionarAgendamento")
    public ResponseEntity<?> adicionarAgendamento(@RequestBody Agendamento agendamento){
        try {
            ResponseEntity<?> agendamentoTemp = agendamentoService.adicionarAgendamento(agendamento);

            if(agendamentoTemp.getStatusCode().equals(HttpStatus.OK)){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Agendamento adicionado com sucesso");
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());   
        }
    }

    //Ler agendamentos
    @GetMapping("/lerAgendamento")
    public ResponseEntity<?> lerAgendamento(){
        try{
            ResponseEntity<?> agendamentosTemp = agendamentoService.lerAgendamento();

            //Se existir...
            if(agendamentosTemp.getStatusCode().equals(HttpStatus.OK)){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(agendamentosTemp.getBody());
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Ler agendamentos por ID
    @GetMapping("/lerAgendamento/{id}")
    public ResponseEntity<?> lerAgendamentoById(@PathVariable long id){
        try{
            ResponseEntity<?> agendamentosTemp = agendamentoService.lerAgendamentoById(id);

            //Se existir...
            if(agendamentosTemp.getStatusCode().equals(HttpStatus.OK)){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(agendamentosTemp.getBody());
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Deletando Agendamentos por ID
    @DeleteMapping("/removerAgendamentos/{id}")
    public ResponseEntity<?> removerAgendamentoById(@PathVariable long id){
        try{
            ResponseEntity<?> agendamentosTemp = agendamentoService.removerAgendamentoById(id);

            if(agendamentosTemp.getStatusCode().equals(HttpStatus.OK)){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Agendamento realizado com sucesso");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}