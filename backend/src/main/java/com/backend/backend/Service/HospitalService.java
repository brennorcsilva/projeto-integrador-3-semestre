package com.backend.backend.Service;

import com.backend.backend.Helpers.HelperCrud;
import com.backend.backend.Model.Hospital;
import com.backend.backend.Repository.HospitalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@CrossOrigin(origins = "http://localhost:5173")
public class HospitalService extends HelperCrud {
    @Autowired
    private HospitalRepo hospitalRepo;

    //Inserir hospital
    public ResponseEntity<?> adicionarHospital(Hospital hospital) {
        try{
            Hospital hospitalTemp = new Hospital();

            hospitalTemp.setId_hospital(gerarSequencia(Hospital.SEQUENCE_NAME));
            hospitalTemp.setCnpj_hospital(hospital.getCnpj_hospital());
            hospitalTemp.setNome_hospital(hospital.getNome_hospital());
            hospitalTemp.setEndereco_hospital(hospital.getEndereco_hospital());

            hospitalRepo.save(hospitalTemp);
            return ResponseEntity.ok("Hospital adicionado com sucesso!");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro! Não foi possível adicionar");
        }
    }

    //Lendo os hospitais
    public ResponseEntity<?> lerHospital(){
        try{
            List<Hospital> hospitais = hospitalRepo.findAll();

            //Se hospitais existirem...
            if(!hospitais.isEmpty()){
                return ResponseEntity.ok(hospitais);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro! Não há hospitais cadastrados");
            }

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Lendo hospital pelo ID
    public ResponseEntity<?> lerHospital(@PathVariable long id){
        try{
            Optional<Hospital> hospital = hospitalRepo.findById(id);

            //Se o hospital for achado...
            if(hospital.isPresent()){
                return ResponseEntity.ok(hospital.get());
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro! Hospital não encontrado!");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Lendo hospital pelo ID e retornando apenas o email
    public ResponseEntity<?> lerNomeHospital(@PathVariable long id){
        try{
            Hospital hospital = hospitalRepo.findByNome(id);

            //Se o usuario existir...
            if(hospital != null){
                List <String> hospitalTemp = new ArrayList<>();
                hospitalTemp.add(hospital.getNome_hospital());
                hospitalTemp.add(hospital.getEndereco_hospital());
                return ResponseEntity.ok(hospitalTemp);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERRO! Hospital não encontrado");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Removendo um hospital pelo ID
    public ResponseEntity<?> removerHospital(@PathVariable long id){
        try{
            hospitalRepo.deleteById(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Hospital deletado com sucesso!");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
