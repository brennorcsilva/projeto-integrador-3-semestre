package com.backend.backend.Repository;

import com.backend.backend.Model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UsuarioRepo extends MongoRepository<Usuario, Long> {
    @Query(value="{'id_usuario':  ?0}", fields="{'email_usuario':  1, '_id':  0}")
    Usuario findByEmail(long id);
}
