package com.backend.backend.Controller;

import com.backend.backend.Model.Usuario;
import com.backend.backend.Repository.UsuarioRepo;
import com.backend.backend.Service.UsuarioService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.backend.Helpers.HelperCrud;

import java.util.Optional;

@RestController
//Habilitando o CORS
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController extends UsuarioService {
    //Declarando o repositório juntamente com as rotas seguindo arquitetura REST
    @Autowired
    UsuarioRepo usuarioRepo;

    //Inserir um usuario
    @PostMapping("/adicionarUsuario")
    //RequestBody para usar JSON e passar os dados na requisicao posteriormente
    public ResponseEntity<?> adicionaUsuario(@RequestBody Usuario usuario) {
        try{
            ResponseEntity<?> usuarioTemp = adicionarUsuario(usuario);

            if(usuarioTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Usuario adicionado com sucesso");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Lendo um usuário
    @GetMapping("/lerUsuario/{id}")
    public ResponseEntity<?> lerUsuario(@PathVariable Long id) {
        try{
            ResponseEntity<?> usuarioTemp = lerUsuario(id);
            if(usuarioTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Usuário adicionado com sucesso");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Atualizando um usuario pelo ID
    @PatchMapping("/atualizarUsuario/{id}")
        public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado){
        try{
            ResponseEntity<?> usuarioTemp = atualizarUsuario(id, usuarioAtualizado);
            if(usuarioTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Usuario atualizado com sucesso");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Deletando um usuario pelo ID
    @DeleteMapping("deletarUsuario/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable Long id) {
        try{
            ResponseEntity<?> usuarioTemp = deletarUsuario(id);
            if(usuarioTemp.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Usuario deletado com sucesso");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Faça a requisição corretamente");
        }catch( Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
