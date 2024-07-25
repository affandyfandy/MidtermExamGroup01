package com.fpt.MidtermG1.service;

import java.math.BigDecimal;
import java.util.List;

import com.fpt.MidtermG1.dto.InvoiceDTO;
import com.fpt.MidtermG1.dto.InvoiceProductDTO;

public interface InvoiceService {
    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);
    InvoiceDTO editInvoice(String id, InvoiceDTO invoiceDTO);
    InvoiceDTO getInvoiceById(String id);
    List<InvoiceDTO> getAllInvoices(int page, int size);
    InvoiceProductDTO addInvoiceProduct(InvoiceProductDTO invoiceProductDTO);
    byte[] exportInvoiceToPDF(String id);
    List<InvoiceDTO> getInvoicesByCriteria(String customerId, String customerName, int year, int month, String invoiceAmountCondition, BigDecimal invoiceAmount, int page, int size);
}
