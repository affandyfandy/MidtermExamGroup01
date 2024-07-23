package com.fpt.MidtermG1.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.fpt.MidtermG1.data.entity.Invoice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceDTO {
    private String id;
    private CustomerDTO customer;
    private BigDecimal invoiceAmount;
    private Timestamp invoiceDate;
    private Timestamp createdTime;
    private Timestamp updatedTime;
    private List<InvoiceProductDTO> invoiceProducts;

    public Invoice toEntity() {
        return Invoice.builder()
                .id(this.getId())
                .customer(this.getCustomer() != null ? this.getCustomer().toEntity() : null)
                .invoiceAmount(this.getInvoiceAmount())
                .invoiceDate(this.getInvoiceDate())
                .createdTime(this.getCreatedTime())
                .updatedTime(this.getUpdatedTime())
                .invoiceProducts(Optional.ofNullable(this.getInvoiceProducts())
                                .map(invoice -> invoice.stream()
                                .map(InvoiceProductDTO::toEntity)
                                .collect(Collectors.toSet()))
                                .orElse(Collections.emptySet()))
                .build();
    }
}
