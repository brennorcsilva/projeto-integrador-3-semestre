package com.backend.backend.Repository;

import com.backend.backend.Model.Agendamento;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AgendamentoRepo extends MongoRepository<Agendamento, Long> {
}
