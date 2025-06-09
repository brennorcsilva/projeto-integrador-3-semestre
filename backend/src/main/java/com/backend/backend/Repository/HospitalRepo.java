package com.backend.backend.Repository;

import com.backend.backend.Model.Hospital;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface HospitalRepo extends MongoRepository<Hospital, Long> {
    @Query(value="{'id_hospital':  ?0}", fields="{'nome_hospital':  1, 'endereco_hospital': 1, '_id':  0}")
    Hospital findByNome(long id);

}
