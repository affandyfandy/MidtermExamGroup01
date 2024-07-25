package com.fpt.MidtermG1.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/invoices")
public class InvoiceController {
    private final InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<InvoiceDTO> addInvoice(@Validated @RequestBody InvoiceDTO invoiceDTO) {
        InvoiceDTO addedInvoice = invoiceService.addInvoice(invoiceDTO);
        return ResponseEntity.ok(addedInvoice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvoiceDTO> editInvoice(@PathVariable String id, @Validated @RequestBody InvoiceDTO invoiceDTO) {
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
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String customerId,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month) {
        List<InvoiceDTO> invoices;
        if (customerId != null && year != null && month != null) {
            invoices = invoiceService.getInvoicesByCriteria(customerId, year, month, page, size);
        } else {
            invoices = invoiceService.getAllInvoices(page, size);
        }
        return ResponseEntity.ok(invoices);
    }

    @PostMapping("/products")
    public ResponseEntity<InvoiceProductDTO> addInvoiceProduct(@Validated @RequestBody InvoiceProductDTO invoiceProductDTO) {
        InvoiceProductDTO addedInvoiceProduct = invoiceService.addInvoiceProduct(invoiceProductDTO);
        return ResponseEntity.ok(addedInvoiceProduct);
    }
}
