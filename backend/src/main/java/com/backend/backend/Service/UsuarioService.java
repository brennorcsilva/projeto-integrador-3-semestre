package com.backend.backend.Service;

import com.backend.backend.Helpers.HelperCrud;
import com.backend.backend.Model.Usuario;
import com.backend.backend.Repository.UsuarioRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
@CrossOrigin(origins = "localhost:5173")
public class UsuarioService extends HelperCrud {
    @Autowired
    UsuarioRepo usuarioRepo;

    //inserindo um usuario
    public ResponseEntity<?> adicionarUsuario(@RequestBody Usuario usuario) {
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
            return ResponseEntity.ok("Usuário cadastrado com sucesso!");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERRO! Não foi possível cadastrar");
        }
    }

    //Lendo um usuario
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

    //Lendo um usuario apenas pelo email
    public ResponseEntity<?> lerUsuarioEmail(@PathVariable String email, @PathVariable String senha) {
        try{
            Usuario usuario = usuarioRepo.findByEmail(email);

            if(usuario != null){
                if(usuario.getSenha_usuario().equals(senha)){
                    return ResponseEntity.ok(usuario);
                }
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro! Email e/ou senha não coincidem!");

            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro! Usuário não encontrado");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Selecionando apenas email do usuario pelo ID
    public ResponseEntity<?> lerEmail(@PathVariable long id) {
        try{
            Usuario usuario = usuarioRepo.findByEmail(id);

            //Se o usuario existir...
            if(usuario != null){
                return ResponseEntity.ok(usuario.getEmail_usuario());
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERRo! Usuário não encontrado");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Atualizando um usuario pelo ID
    public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado){
        try{
            Usuario usuario = usuarioRepo.findById(id).get();
            usuario.setNome_usuario(usuarioAtualizado.getNome_usuario());
            usuario.setEmail_usuario(usuarioAtualizado.getEmail_usuario());
            usuario.setCpf_usuario(usuarioAtualizado.getCpf_usuario());
            usuario.setSenha_usuario(usuarioAtualizado.getSenha_usuario());
            usuarioRepo.save(usuario);

            return ResponseEntity.ok("Usuário adicionado com sucesso!");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //Deletando um usuario pelo ID
    public ResponseEntity<?> deletarUsuario(@PathVariable Long id) {
        try{
            usuarioRepo.deleteById(id);
            return ResponseEntity.ok("Usuário deletado com sucesso!");
        }catch( Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
