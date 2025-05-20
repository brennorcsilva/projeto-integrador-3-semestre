package com.backend.backend.Controller;


import com.backend.backend.Model.Agendamento;
import com.backend.backend.Service.AgendamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AgendamentoController{
    private AgendamentoService agendamentoService;

    //Primeira Rota - GET - Ler agendamentos
    @GetMapping("/lerAgendamentos")
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
    @GetMapping("/lerAgendamentos/{id}")
    public ResponseEntity<?> lerAgendamentoById(long id){
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
}