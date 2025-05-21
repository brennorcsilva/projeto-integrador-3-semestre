package com.backend.backend.Service;

import com.itextpdf.html2pdf.HtmlConverter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class PdfService {

    //Aqui irá receber o response para converter e enviar como HTML
    public void converterPdf(HttpServletResponse response, String nome_usuario, String email_usuario) throws IOException {
        StringBuilder paginaHtml = new StringBuilder();

        //Lendo arquivo HTML
        try(BufferedReader br = new BufferedReader(new InputStreamReader(getClass().getClassLoader().getResourceAsStream("templates/pdf.html")))) {
            String linha;

            while((linha = br.readLine()) != null) {
                paginaHtml.append(linha);
            }
        }

        String htmlFinal = paginaHtml.toString()
                .replace("{{nome_usuario}}", nome_usuario)
                .replace("{{email_usuario}}", email_usuario);

        //Armazenando o PDF em memoria
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        HtmlConverter.convertToPdf(htmlFinal, byteArrayOutputStream);

        //Definindo o content type
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "inline; filename=\"certificado.pdf\"");

        response.getOutputStream().write(byteArrayOutputStream.toByteArray());

        byteArrayOutputStream.close();
    }


}
