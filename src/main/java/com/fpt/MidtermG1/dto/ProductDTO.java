package com.fpt.MidtermG1.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.fpt.MidtermG1.common.Status;
import com.fpt.MidtermG1.data.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private String id;
    private String name;
    private BigDecimal price;
    private Status status;
    private Timestamp createdTime;
    private Timestamp updatedTime;
    private List<InvoiceProductDTO> invoiceProducts;

    public Product toEntity() {
        return Product.builder()
                .id(this.getId())
                .name(this.getName())
                .price(this.getPrice())
                .status(this.getStatus())
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
