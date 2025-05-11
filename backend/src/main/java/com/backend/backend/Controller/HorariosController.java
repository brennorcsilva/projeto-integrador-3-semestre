package com.backend.backend.Controller;

import com.backend.backend.Helpers.HelperCrud;
import com.backend.backend.Model.Horarios;
import com.backend.backend.Repository.HorariosRepo;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class HorariosController extends HelperCrud {
    @Autowired
    HorariosRepo HorariosRepo;
    private HorariosRepo horariosRepo;

    //Inserir Horarios
    @PostMapping("/adicionarHorarios")
    public String adicionarHorarios(@RequestBody Horarios horarios) {
        try{
            //Horario temporario
            Horarios horarioTemp = new Horarios();

            //Definindo ao temporario os dados de horarios
            horarioTemp.setId_horarios(gerarSequencia(Horarios.SEQUENCE_NAME));
            horarioTemp.setDia_horarios(horarios.getDia_horarios());
            horarioTemp.setMes_horarios(horarios.getMes_horarios());
            horarioTemp.setHorario_horarios(horarios.getHorario_horarios());

            //Salvando no REPO
            HorariosRepo.save(horarioTemp);
            return "Horários adicionados com sucesso!";
        }catch(Exception e){
            return e.getMessage();
        }
    }

    //Lendo os Horários
    @GetMapping("/lerHorarios")
    public ResponseEntity<?> lerHorarios(){
        try{
            List<Horarios> horarios = HorariosRepo.findAll();

            //Se os horarios existirem...
            if(!horarios.isEmpty()){
                return ResponseEntity.ok(horarios);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro! Não hã horários cadastrados");
            }

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
