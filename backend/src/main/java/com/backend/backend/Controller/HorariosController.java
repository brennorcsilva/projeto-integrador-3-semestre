package com.backend.backend.Controller;

import com.backend.backend.Helpers.HelperCrud;
import com.backend.backend.Model.Horarios;
import com.backend.backend.Repository.HorariosRepo;
import com.backend.backend.Service.HorariosService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class HorariosController extends HorariosService {
    @Autowired
    HorariosRepo HorariosRepo;
    private HorariosRepo horariosRepo;

    @Autowired
    private HorariosService horariosService;

    //Inserir Horarios
    @PostMapping("/adicionarHorarios")
    public ResponseEntity<?> adicionarHorarios(@RequestBody Horarios horarios) {
        try{
            ResponseEntity<?> horariosTemp = horariosService.adicionarHorarios(horarios);

            if(horariosTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Horários adicionados com sucesso");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");
        }catch(Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Lendo os Horários
    @GetMapping("/lerHorarios")
    public ResponseEntity<?> lerHorarios(){
        try{
            ResponseEntity<?> horariosTemp = horariosService.lerHorarios();

            //Se os horarios existirem...
            if(horariosTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(horariosTemp.getBody());
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Lendo Horários pelo ID
    @GetMapping("/lerHorarios/{id}")
    public ResponseEntity<?> lerHorariosById(@PathVariable Long id){
        try{
            ResponseEntity<?> horariosTemp = horariosService.lerHorariosById(id);

            //Se os horarios existirem...
            if(horariosTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(horariosTemp.getBody());
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Removendo somente um horário específico pelo ID
    @PatchMapping("/atualizarHorarios/{id}")
    public ResponseEntity<?> atualizarHorarios(@PathVariable Long id, @RequestBody String horaAgendamento){
        try{
            ResponseEntity<?> horariosTemp = horariosService.atualizarHorarios(id, horaAgendamento);

            //Se os horarios existirem...
            if(horariosTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Horarios atualizados com sucesso!");
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Removendo todos os horarios
    @DeleteMapping("/removerHorarios")
    public ResponseEntity<?> removerHorarios(){
        try{
            ResponseEntity<?> horariosTemp = horariosService.removerHorarios();

            //Se os horarios existirem...
            if(horariosTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Horarios removidos com sucesso!");
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
