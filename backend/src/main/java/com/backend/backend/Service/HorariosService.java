package com.backend.backend.Service;

import com.backend.backend.Helpers.HelperCrud;
import com.backend.backend.Model.Horarios;
import com.backend.backend.Repository.HorariosRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class HorariosService extends HelperCrud {
    @Autowired
    private HorariosRepo horariosRepo;

    //Inserir horarios
    public ResponseEntity<?> adicionarHorarios(@RequestBody Horarios horarios) {
        try{
            //Horario temporario
            Horarios horarioTemp = new Horarios();

            //Definindo ao temporario os dados de horarios
            horarioTemp.setId_horarios(gerarSequencia(Horarios.SEQUENCE_NAME));
            horarioTemp.setId_hospital(horarios.getId_hospital());
            horarioTemp.setDia_horarios(horarios.getDia_horarios());
            horarioTemp.setMes_horarios(horarios.getMes_horarios());
            horarioTemp.setHorario_horarios(horarios.getHorario_horarios());

            //Salvando no REPO
            horariosRepo.save(horarioTemp);
            return ResponseEntity.ok("Horarios adicionados com sucesso!");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro! Não foi possível adicionar");
        }
    }

    //Lendo horarios
    public ResponseEntity<?> lerHorarios(){
        try{
            List<Horarios> horarios = horariosRepo.findAll();

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

    //Lendo horarios por ID
    public ResponseEntity<?> lerHorariosById(@PathVariable Long id){
        try{
            Optional<Horarios> horarios = horariosRepo.findById(id);

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
    public ResponseEntity<?> atualizarHorarios(@PathVariable Long id, @RequestBody String horaAgendamento){
        try{
            //Primeiro pegando e armazenando os dados de horario
            Horarios horarioTemp = horariosRepo.findById(id).orElseThrow(() -> new RuntimeException("Horário não encontrado"));

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
            horariosRepo.save(horarioTemp);

            return ResponseEntity.ok(true);

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Removendo todos os horarios
    public ResponseEntity<?> removerHorarios(){
        try{
            horariosRepo.deleteAll();
            return ResponseEntity.ok("Horarios removidos com sucesso!");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
