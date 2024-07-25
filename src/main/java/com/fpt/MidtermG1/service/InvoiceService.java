package com.fpt.MidtermG1.service;

import java.util.List;

import com.fpt.MidtermG1.dto.InvoiceDTO;
import com.fpt.MidtermG1.dto.InvoiceProductDTO;

public interface InvoiceService {
    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);
    InvoiceDTO editInvoice(String id, InvoiceDTO invoiceDTO);
    InvoiceDTO getInvoiceById(String id);
    List<InvoiceDTO> getAllInvoices(int page, int size);
    InvoiceProductDTO addInvoiceProduct(InvoiceProductDTO invoiceProductDTO);
    List<InvoiceDTO> getInvoicesByCriteria(String customerId, int year, int month, int page, int size);
    byte[] exportInvoiceToPDF(String id);
}
