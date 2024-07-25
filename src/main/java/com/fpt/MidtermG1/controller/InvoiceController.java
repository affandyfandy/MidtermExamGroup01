package com.fpt.MidtermG1.controller;

import java.util.List;

import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.MidtermG1.dto.InvoiceDTO;
import com.fpt.MidtermG1.dto.InvoiceProductDTO;
import com.fpt.MidtermG1.service.InvoiceService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/invoices")
public class InvoiceController {
    private final InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<InvoiceDTO> addInvoice(@Valid @RequestBody InvoiceDTO invoiceDTO) {
        InvoiceDTO createdInvoice = invoiceService.addInvoice(invoiceDTO);
        return ResponseEntity.status(201).body(createdInvoice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvoiceDTO> editInvoice(@PathVariable String id, @Valid @RequestBody InvoiceDTO invoiceDTO) {
        InvoiceDTO updatedInvoice = invoiceService.editInvoice(id, invoiceDTO);
        return ResponseEntity.ok(updatedInvoice);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceDTO> getInvoiceById(@PathVariable String id) {
        InvoiceDTO invoice = invoiceService.getInvoiceById(id);
        return ResponseEntity.ok(invoice);
    }

    @GetMapping
    public ResponseEntity<List<InvoiceDTO>> getAllInvoices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        List<InvoiceDTO> invoices = invoiceService.getAllInvoices(page, size);
        return ResponseEntity.ok(invoices);
    }

    @PostMapping("/products")
    public ResponseEntity<InvoiceProductDTO> addInvoiceProduct(@Valid @RequestBody InvoiceProductDTO invoiceProductDTO) {
        InvoiceProductDTO createdInvoiceProduct = invoiceService.addInvoiceProduct(invoiceProductDTO);
        return ResponseEntity.status(201).body(createdInvoiceProduct);
    }

    @GetMapping("/search")
    public ResponseEntity<List<InvoiceDTO>> getInvoicesByCriteria(
            @RequestParam(required = false) String customerId,
            @RequestParam(required = false, defaultValue = "0") int year,
            @RequestParam(required = false, defaultValue = "0") int month,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        List<InvoiceDTO> invoices = invoiceService.getInvoicesByCriteria(customerId, year, month, page, size);
        return ResponseEntity.ok(invoices);
    }

    @GetMapping("export/{id}")
    public ResponseEntity<byte[]> exportToPDF(@PathVariable String id) {
        byte[] pdfBytes = invoiceService.exportInvoiceToPDF(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.builder("attachment").filename("invoice.pdf").build());

        return ResponseEntity.status(HttpStatus.OK).headers(headers).body(pdfBytes);
    }
}
