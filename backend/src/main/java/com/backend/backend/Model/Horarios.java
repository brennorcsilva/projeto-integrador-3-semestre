package com.backend.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection="horarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Horarios {
    @Transient
    public static final String SEQUENCE_NAME = "horarios_sequence";

    @Id
    @Generated
    private long id_horarios;

    //ID do hospital vem aqui, por enquanto deixando vazio

    private String dia_horarios;
    private Integer mes_horarios;
    private List<String> horario_horarios = new ArrayList<String>();
}
