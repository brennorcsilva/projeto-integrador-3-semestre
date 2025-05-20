package com.backend.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "agendamento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Agendamento {
    @Transient
    public static final String SEQUENCE_NAME = "agendamento_sequence";

    @Id
    @Generated
    private long id_agendamento;

    private long id_usuario;

    private long id_hospital;

    private String data_agendamento;

    private String hora_agendamento;
}
