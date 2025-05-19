package com.backend.backend.Repository;

import com.backend.backend.Model.Hospital;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HospitalRepo extends MongoRepository<Hospital, Long> {

}
