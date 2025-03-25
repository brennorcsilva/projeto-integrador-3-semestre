package com.backend.backend.Repository;

import com.backend.backend.Model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsuarioRepo extends MongoRepository<Usuario, Long> {
}
