package com.fpt.MidtermG1.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fpt.MidtermG1.data.entity.Invoice;
import com.fpt.MidtermG1.data.repository.InvoiceRepository;
import com.fpt.MidtermG1.dto.InvoiceDTO;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<InvoiceDTO> getAllInvoices() {
        return invoiceRepository.findAll().stream()
                .map(Invoice::toDTO)
                .collect(Collectors.toList());
    }

    public InvoiceDTO getInvoiceById(String id) {
        Optional<Invoice> invoice = invoiceRepository.findById(id);
        return invoice.map(Invoice::toDTO).orElse(null);
    }

    public InvoiceDTO createInvoice(InvoiceDTO invoiceDTO) {
        Invoice invoice = invoiceDTO.toEntity();
        invoice = invoiceRepository.save(invoice);
        return invoice.toDTO();
    }

    public InvoiceDTO updateInvoice(String id, InvoiceDTO invoiceDTO) {
        Optional<Invoice> invoiceOptional = invoiceRepository.findById(id);
        if (invoiceOptional.isPresent()) {
            Invoice invoice = invoiceDTO.toEntity();
            invoice.setId(id);
            invoice = invoiceRepository.save(invoice);
            return invoice.toDTO();
        }
        return null;
    }

    public void deleteInvoice(String id) {
        invoiceRepository.deleteById(id);
    }
}