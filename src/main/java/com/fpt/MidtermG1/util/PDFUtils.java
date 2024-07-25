package com.fpt.MidtermG1.util;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.fpt.MidtermG1.data.entity.Invoice;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.io.source.ByteArrayOutputStream;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class PDFUtils {
    
    private final SpringTemplateEngine springTemplateEngine;

    public byte[] generateInvoicePDF(Invoice invoice) throws IOException {
        Context context = new Context();

        context.setVariable("invoice", invoice);
        context.setVariable("customer", invoice.getCustomer());
        context.setVariable("invoiceProduct", invoice.getInvoiceProducts());
        context.setVariable("totalAmount", invoice.getInvoiceProducts().stream()
                .mapToDouble(detail -> detail.getQuantity() * detail.getPrice().doubleValue()).sum());

        String processedHtml = springTemplateEngine.process("invoice-template", context);

        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        HtmlConverter.convertToPdf(processedHtml, stream);
        stream.flush();
        return stream.toByteArray();
    }
}
