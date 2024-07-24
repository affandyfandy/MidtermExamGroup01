package com.fpt.MidtermG1.data.entity;

import java.math.BigDecimal;

import com.fpt.MidtermG1.dto.InvoiceProductDTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "InvoiceProduct")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(InvoiceProductId.class)
public class InvoiceProduct {
    @Id
    @Column(name = "invoice_id")
    private String invoice_id;

    @Id
    @Column(name = "product_id")
    private int product_id;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private BigDecimal amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public InvoiceProductDTO toDTO() {
        return InvoiceProductDTO.builder()
                .invoice(this.getInvoice() != null ? this.getInvoice().toDTO() : null)
                .product(this.getProduct() != null ? this.getProduct().toDTO() : null)
                .quantity(this.getQuantity())
                .price(this.getPrice())
                .amount(this.getAmount())
                .build();
    }
}

