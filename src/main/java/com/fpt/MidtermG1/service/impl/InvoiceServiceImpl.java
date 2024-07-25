package com.fpt.MidtermG1.service.impl;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
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
import com.fpt.MidtermG1.dto.CustomerDTO;
import com.fpt.MidtermG1.dto.InvoiceDTO;
import com.fpt.MidtermG1.dto.InvoiceProductDTO;
import com.fpt.MidtermG1.dto.ProductDTO;
import com.fpt.MidtermG1.exception.InactiveCustomerException;
import com.fpt.MidtermG1.exception.InactiveProductException;
import com.fpt.MidtermG1.exception.ResourceNotFoundException;
import com.fpt.MidtermG1.service.InvoiceService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final InvoiceProductRepository invoiceProductRepository;

    @Override
public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
    List<InvoiceProductDTO> invoiceProducts = invoiceDTO.getInvoiceProducts();
    
    BigDecimal invoiceAmount = BigDecimal.ZERO;
    
    for (InvoiceProductDTO invoiceProduct : invoiceProducts) {
        Product product = productRepository.findById(invoiceProduct.getProduct().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        
        BigDecimal price = product.getPrice();
        int quantity = invoiceProduct.getQuantity();
        BigDecimal amount = price.multiply(BigDecimal.valueOf(quantity));
        
        invoiceProduct.setProduct(ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .status(product.getStatus())
                .createdTime(product.getCreatedTime())
                .updatedTime(product.getUpdatedTime())
                .build());
        invoiceProduct.setPrice(price);
        invoiceProduct.setAmount(amount);
        
        invoiceAmount = invoiceAmount.add(amount);
    }
    
    invoiceDTO.setInvoiceAmount(invoiceAmount);
    invoiceDTO.setInvoiceDate(Timestamp.from(Instant.now()));
    invoiceDTO.setCreatedTime(Timestamp.from(Instant.now()));
    invoiceDTO.setUpdatedTime(Timestamp.from(Instant.now()));
    
    Customer customer = customerRepository.findById(invoiceDTO.getCustomer().getId())
            .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
    
    invoiceDTO.setCustomer(CustomerDTO.builder()
            .id(customer.getId())
            .name(customer.getName())
            .phoneNumber(customer.getPhoneNumber())
            .status(customer.getStatus())
            .createdTime(customer.getCreatedTime())
            .updatedTime(customer.getUpdatedTime())
            .build());

    Invoice invoice = invoiceDTO.toEntity();
    Invoice savedInvoice = invoiceRepository.save(invoice);
    
    return InvoiceDTO.builder()
            .id(savedInvoice.getId())
            .customer(invoiceDTO.getCustomer())
            .invoiceAmount(invoiceAmount)
            .invoiceDate(invoiceDTO.getInvoiceDate())
            .createdTime(invoiceDTO.getCreatedTime())
            .updatedTime(invoiceDTO.getUpdatedTime())
            .invoiceProducts(invoiceDTO.getInvoiceProducts())
            .build();
}



    @Override
    public InvoiceDTO editInvoice(String id, InvoiceDTO invoiceDTO) {
        Invoice existingInvoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));
        
        List<InvoiceProductDTO> invoiceProducts = invoiceDTO.getInvoiceProducts();
        
        BigDecimal invoiceAmount = BigDecimal.ZERO;
        
        for (InvoiceProductDTO invoiceProduct : invoiceProducts) {
            Product product = productRepository.findById(invoiceProduct.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            
            BigDecimal price = product.getPrice();
            int quantity = invoiceProduct.getQuantity();
            BigDecimal amount = price.multiply(BigDecimal.valueOf(quantity));
            
            invoiceProduct.setPrice(price);
            invoiceProduct.setAmount(amount);
            
            invoiceAmount = invoiceAmount.add(amount);
        }
        
        invoiceDTO.setInvoiceAmount(invoiceAmount);
        invoiceDTO.setUpdatedTime(Timestamp.from(Instant.now()));
        
        existingInvoice.setCustomer(invoiceDTO.getCustomer().toEntity());
        existingInvoice.setInvoiceAmount(invoiceAmount);
        existingInvoice.setInvoiceDate(invoiceDTO.getInvoiceDate());
        existingInvoice.setUpdatedTime(invoiceDTO.getUpdatedTime());
        existingInvoice.setInvoiceProducts(invoiceProducts.stream()
                .map(InvoiceProductDTO::toEntity)
                .collect(Collectors.toSet()));
        
        Invoice savedInvoice = invoiceRepository.save(existingInvoice);
        
        return InvoiceDTO.builder()
                .id(savedInvoice.getId())
                .customer(invoiceDTO.getCustomer())
                .invoiceAmount(invoiceAmount)
                .invoiceDate(invoiceDTO.getInvoiceDate())
                .createdTime(existingInvoice.getCreatedTime())
                .updatedTime(invoiceDTO.getUpdatedTime())
                .invoiceProducts(invoiceDTO.getInvoiceProducts())
                .build();
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
}
