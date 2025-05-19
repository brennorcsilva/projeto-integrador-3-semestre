package com.backend.backend.Controller;

import com.backend.backend.Helpers.HelperCrud;
import com.backend.backend.Model.Hospital;
import com.backend.backend.Repository.HospitalRepo;
import com.backend.backend.Service.HospitalService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class HospitalController extends HelperCrud {
    @Autowired
    private HospitalRepo hospitalRepo;

    @Autowired
    private HospitalService hospitalService;

    //Inserindo um hospital
    @PostMapping("/adicionarHospital")
    public ResponseEntity<?> adicionarHospital(@RequestBody Hospital hospital) {
        try{
            ResponseEntity<?> hospitalTemp = hospitalService.adicionarHospital(hospital);

            if(hospitalTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Hospital adicionado com sucesso");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Lendo todos os hospitais
    @GetMapping("/lerHospital")
    public ResponseEntity<?> lerHospital(){
        try{
            ResponseEntity<?> hospitalTemp = hospitalService.lerHospital();

            if(hospitalTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(hospitalTemp.getBody());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Lendo hospital pelo ID
    @GetMapping("/lerHospital/{id}")
    public ResponseEntity<?> lerHospital(@PathVariable long id){
        try{
            ResponseEntity<?> hospitalTemp = hospitalService.lerHospital(id);

            if(hospitalTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Hospital cadastrado com sucesso!");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Removendo um hospital pelo ID
    @DeleteMapping("/removerHospital/{id}")
    public ResponseEntity<?> removerHospital(@PathVariable long id){
        try{
            ResponseEntity<?> hospitalTemp = hospitalService.removerHospital(id);

            if(hospitalTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Hospital removido com sucesso!");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
