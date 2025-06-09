package com.backend.backend.Controller;

import com.backend.backend.Service.PdfService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PdfController{
    @Autowired
    private PdfService pdfService;

    @GetMapping("/gerarPdf/{nome_usuario}/{email_usuario}/{nome_hospital}/{endereco_hospital}/{dia_doacao}/{mes_doacao}/{tipo_sanguineo}")
    //response, dadosUsuario para o HTML, String nome, String email
    public void gerarPdf(HttpServletResponse response, @PathVariable String nome_usuario, @PathVariable String email_usuario, @PathVariable String nome_hospital, @PathVariable String endereco_hospital, @PathVariable String dia_doacao, @PathVariable String mes_doacao, @PathVariable String tipo_sanguineo) throws IOException {
        pdfService.converterPdf(response, nome_usuario, email_usuario, nome_hospital, endereco_hospital, dia_doacao, mes_doacao, tipo_sanguineo);
    }
}
