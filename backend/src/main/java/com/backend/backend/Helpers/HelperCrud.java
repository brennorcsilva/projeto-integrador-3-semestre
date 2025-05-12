package com.backend.backend.Helpers;

import com.backend.backend.Model.DatabaseSequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

public class HelperCrud {
    @Autowired
    private MongoOperations mongoOperations;

    //Funcao para pegar a counter table e inserir o ID ja sendo auto_increment
    public long gerarSequencia(String seqName){
        Query query = new Query((Criteria.where("seqName").is(seqName)));
        Update update = new Update().inc("seq", 1);
        DatabaseSequence counter = mongoOperations.findAndModify(query, update, options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return counter != null ? counter.getSeq() : 1;
    }
}