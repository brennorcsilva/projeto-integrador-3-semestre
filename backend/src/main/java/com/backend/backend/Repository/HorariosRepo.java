package com.backend.backend.Repository;

import com.backend.backend.Model.Horarios;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface HorariosRepo extends MongoRepository<Horarios, Long> {
}
