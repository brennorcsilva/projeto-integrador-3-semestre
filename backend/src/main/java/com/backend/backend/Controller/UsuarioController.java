package com.backend.backend.Controller;

import com.backend.backend.Model.Usuario;
import com.backend.backend.Repository.UsuarioRepo;
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
public class UsuarioController extends HelperCrud {
    //Declarando o repositório juntamente com as rotas seguindo arquitetura REST
    @Autowired
    UsuarioRepo usuarioRepo;

    //Inserir um usuario
    @PostMapping("/adicionarUsuario")
    //RequestBody para usar JSON e passar os dados na requisicao posteriormente
    public String adicionarUsuario(@RequestBody Usuario usuario) {
        try{
            //Usuario temporario para adicionar o id auto_increment
            Usuario usuarioTemp = new Usuario();

            //Agora que foi adicionado o auto_increment no ID, eu irei adicionar as outras infos ao usuarioTemp
            usuarioTemp.setId_usuario(gerarSequencia(Usuario.SEQUENCE_NAME));
            usuarioTemp.setNome_usuario(usuario.getNome_usuario());
            usuarioTemp.setEmail_usuario(usuario.getEmail_usuario());
            usuarioTemp.setCpf_usuario(usuario.getCpf_usuario());
            usuarioTemp.setSenha_usuario(usuario.getSenha_usuario());

            //Salvando no repositório as infos de usuario
            usuarioRepo.save(usuarioTemp);
            return "Usuário adicionado com sucesso!";
        }catch(Exception e){
            return e.getMessage();
        }
    }

    //Lendo um usuário
    @GetMapping("/lerUsuario/{id}")
    public ResponseEntity<?> lerUsuario(@PathVariable Long id) {
        try{
            Optional<Usuario> usuario = usuarioRepo.findById(id);

            //se o usuario existir...
            if(usuario.isPresent()){
                return ResponseEntity.ok(usuario.get());
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERRO! usuário não encontrado!");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Atualizando um usuario pelo ID
    @PatchMapping("/atualizarUsuario/{id}")
        public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado){
        try{
            Usuario usuario = usuarioRepo.findById(id).get();
            usuario.setNome_usuario(usuarioAtualizado.getNome_usuario());
            usuario.setEmail_usuario(usuarioAtualizado.getEmail_usuario());
            usuario.setCpf_usuario(usuarioAtualizado.getCpf_usuario());
            usuario.setSenha_usuario(usuarioAtualizado.getSenha_usuario());
            usuarioRepo.save(usuario);

            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Usuario atualizado com sucesso!");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Deletando um usuario pelo ID
    @DeleteMapping("deletarUsuario/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable Long id) {
        try{
            usuarioRepo.deleteById(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Usuario deletado com sucesso!");
        }catch( Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
