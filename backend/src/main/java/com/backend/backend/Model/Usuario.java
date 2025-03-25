package com.backend.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Transient
    public static final String SEQUENCE_NAME = "usuario_sequence";

    @Id
    @Generated
    private Long id_usuario;

    private String nome_usuario;
    private String email_usuario;
    private String cpf_usuario;
    private String senha_usuario;
    private String tipo_sanguineo;
}
