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

import java.util.*;

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

    //Lendo Horários pelo ID
    @GetMapping("/lerHorarios/{id}")
    public ResponseEntity<?> lerHorariosById(@PathVariable Long id){
        try{
            Optional<Horarios> horarios = HorariosRepo.findById(id);

            //Se o usuário existir...
            if(horarios.isPresent()){
                return ResponseEntity.ok(horarios.get());
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERRO! Horário não encontrado!");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Removendo somente um horário específico pelo ID
    @PatchMapping("/atualizarHorarios/{id}")
    public ResponseEntity<?> atualizarHorarios(@PathVariable Long id, @RequestBody String horaAgendamento){
        try{
            //Primeiro pegando e armazenando os dados de horario
            Horarios horarioTemp = HorariosRepo.findById(id).orElseThrow(() -> new RuntimeException("Horário não encontrado"));

            List<String> horariosArray = horarioTemp.getHorario_horarios();

            // Remover aspas extras, caso existam
            horaAgendamento = horaAgendamento.replace("\"", "").trim();

            // Verificar se o horário a ser removido está na lista
            if (horariosArray.contains(horaAgendamento)) {
                horariosArray.remove(horaAgendamento); // Remover o horário
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Erro! O horário '" + horaAgendamento + "' não foi encontrado. Horários disponíveis: " + horariosArray);
            }

            horarioTemp.setHorario_horarios(horariosArray);

            //Salvando no repo
            HorariosRepo.save(horarioTemp);

            return ResponseEntity.ok(true);

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
