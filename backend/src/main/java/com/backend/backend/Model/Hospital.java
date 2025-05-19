package com.backend.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="hospital")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hospital {
    @Transient
    public static final String SEQUENCE_NAME = "hospital_sequence";

    @Id
    @Generated
    private long id_hospital;


    private String cnpj_hospital;
    private String nome_hospital;

    //Endereco sera por ex: Rua dos bobos, 231
    private String endereco_hospital;
}
