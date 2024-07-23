package com.fpt.MidtermG1.dto;

import java.math.BigDecimal;

import com.fpt.MidtermG1.data.entity.InvoiceProduct;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceProductDTO {
    private String id;
    private InvoiceDTO invoice;
    private ProductDTO product;
    private int quantity;
    private BigDecimal price;
    private BigDecimal amount;

    public InvoiceProduct toEntity() {
        return InvoiceProduct.builder()
                .id(this.getId())
                .invoice(this.getInvoice() != null ? this.getInvoice().toEntity() : null)
                .product(this.getProduct() != null ? this.getProduct().toEntity() : null)
                .quantity(this.getQuantity())
                .price(this.getPrice())
                .amount(this.getAmount())
                .build();
    }
}
