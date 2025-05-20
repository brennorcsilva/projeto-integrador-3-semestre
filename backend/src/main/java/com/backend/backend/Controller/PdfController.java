package com.backend.backend.Controller;

import com.backend.backend.Service.PdfService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
public class PdfController{
    @Autowired
    private PdfService pdfService;

    @GetMapping("/gerarPdf")
    public void gerarPdf(HttpServletResponse response) throws IOException {
        pdfService.converterPdf(response);
    }
}
