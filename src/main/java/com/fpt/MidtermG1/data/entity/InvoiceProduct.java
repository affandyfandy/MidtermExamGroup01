package com.fpt.MidtermG1.data.entity;

import java.math.BigDecimal;

import com.fpt.MidtermG1.dto.InvoiceProductDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
public class InvoiceProduct {
    @Id
    @Column(length = 36)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private BigDecimal amount;

    public InvoiceProductDTO toDTO() {
        return InvoiceProductDTO.builder()
                .id(this.getId())
                .invoice(this.getInvoice() != null ? this.getInvoice().toDTO() : null)
                .product(this.getProduct() != null ? this.getProduct().toDTO() : null)
                .quantity(this.getQuantity())
                .price(this.getPrice())
                .amount(this.getAmount())
                .build();
    }
}

