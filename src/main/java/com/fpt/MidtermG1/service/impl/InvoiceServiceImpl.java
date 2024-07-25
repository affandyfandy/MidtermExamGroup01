package com.fpt.MidtermG1.service.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fpt.MidtermG1.common.Status;
import com.fpt.MidtermG1.data.entity.Customer;
import com.fpt.MidtermG1.data.entity.Invoice;
import com.fpt.MidtermG1.data.entity.InvoiceProduct;
import com.fpt.MidtermG1.data.entity.Product;
import com.fpt.MidtermG1.data.repository.CustomerRepository;
import com.fpt.MidtermG1.data.repository.InvoiceProductRepository;
import com.fpt.MidtermG1.data.repository.InvoiceRepository;
import com.fpt.MidtermG1.data.repository.ProductRepository;
import com.fpt.MidtermG1.data.specification.InvoiceSpecification;
import com.fpt.MidtermG1.dto.InvoiceDTO;
import com.fpt.MidtermG1.dto.InvoiceProductDTO;
import com.fpt.MidtermG1.exception.InactiveCustomerException;
import com.fpt.MidtermG1.exception.InactiveProductException;
import com.fpt.MidtermG1.exception.ResourceNotFoundException;
import com.fpt.MidtermG1.service.InvoiceService;
import com.fpt.MidtermG1.util.PDFUtils;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final InvoiceProductRepository invoiceProductRepository;
    private final PDFUtils pdfUtils;

    @Override
    @Transactional
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        Customer customer = customerRepository.findById(invoiceDTO.getCustomer().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + invoiceDTO.getCustomer().getId()));

        if (customer.getStatus() != Status.ACTIVE) {
            throw new InactiveCustomerException("Customer is inactive");
        }

        for (InvoiceProductDTO ipDTO : invoiceDTO.getInvoiceProducts()) {
            Product product = productRepository.findById(ipDTO.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + ipDTO.getProduct().getId()));

            if (product.getStatus() != Status.ACTIVE) {
                throw new InactiveProductException("Product is inactive");
            }
        }

        Invoice invoice = invoiceDTO.toEntity();
        invoice.setCustomer(customer);
        invoice = invoiceRepository.save(invoice);
        return invoice.toDTO();
    }

    @Override
    @Transactional
    public InvoiceDTO editInvoice(String id, InvoiceDTO invoiceDTO) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + id));

        long diffInMillis = System.currentTimeMillis() - invoice.getCreatedTime().getTime();
        long diffInMinutes = diffInMillis / (60 * 1000);

        if (diffInMinutes > 10) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invoice can only be edited within 10 minutes of creation");
        }

        Customer customer = customerRepository.findById(invoiceDTO.getCustomer().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + invoiceDTO.getCustomer().getId()));

        if (customer.getStatus() != Status.ACTIVE) {
            throw new InactiveCustomerException("Customer is inactive");
        }

        for (InvoiceProductDTO ipDTO : invoiceDTO.getInvoiceProducts()) {
            Product product = productRepository.findById(ipDTO.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + ipDTO.getProduct().getId()));

            if (product.getStatus() != Status.ACTIVE) {
                throw new InactiveProductException("Product is inactive");
            }
        }

        invoice.setCustomer(customer);
        invoice.setInvoiceAmount(invoiceDTO.getInvoiceAmount());
        invoice.setInvoiceDate(invoiceDTO.getInvoiceDate());
        invoice = invoiceRepository.save(invoice);
        return invoice.toDTO();
    }

    @Override
    public InvoiceDTO getInvoiceById(String id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + id));
        return invoice.toDTO();
    }

    @Override
    public List<InvoiceDTO> getAllInvoices(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Invoice> invoices = invoiceRepository.findAll(pageable);
        return invoices.getContent().stream()
                .map(Invoice::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public InvoiceProductDTO addInvoiceProduct(InvoiceProductDTO invoiceProductDTO) {
        InvoiceProduct invoiceProduct = invoiceProductDTO.toEntity();
        Invoice invoice = invoiceRepository.findById(invoiceProductDTO.getInvoice().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + invoiceProductDTO.getInvoice().getId()));
        Product product = productRepository.findById(invoiceProductDTO.getProduct().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + invoiceProductDTO.getProduct().getId()));

        if (invoice.getCustomer().getStatus() != Status.ACTIVE) {
            throw new InactiveCustomerException("Customer is inactive");
        }

        if (product.getStatus() != Status.ACTIVE) {
            throw new InactiveProductException("Product is inactive");
        }

        invoiceProduct.setInvoice(invoice);
        invoiceProduct.setProduct(product);
        invoiceProduct.setAmount(invoiceProductDTO.getPrice().multiply(new BigDecimal(invoiceProductDTO.getQuantity())));
        invoiceProduct = invoiceProductRepository.save(invoiceProduct);
        return invoiceProduct.toDTO();
    }

    @Override
    public List<InvoiceDTO> getInvoicesByCriteria(String customerId, int year, int month, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Specification<Invoice> spec = Specification.where(null);

        if (customerId != null) {
            spec = spec.and(InvoiceSpecification.hasCustomerId(customerId));
        }
        if (year > 0) {
            spec = spec.and(InvoiceSpecification.hasInvoiceYear(year));
        }
        if (month > 0) {
            spec = spec.and(InvoiceSpecification.hasInvoiceMonth(month));
        }

        Page<Invoice> invoices = invoiceRepository.findAll(spec, pageable);

        if (invoices.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No invoices found with given criteria");
        }

        return invoices.getContent().stream()
                .map(Invoice::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public byte[] exportInvoiceToPDF(String id) {
        Invoice invoice = invoiceRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + id));

        try {
            return pdfUtils.generateInvoicePDF(invoice);
        } catch (IOException e) {
            throw new ResourceNotFoundException("Failed to export the PDF: " + e.getMessage());
        }
    }
}
