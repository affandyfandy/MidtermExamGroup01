package com.fpt.MidtermG1.dto;

import java.math.BigDecimal;

import com.fpt.MidtermG1.data.entity.InvoiceProduct;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceProductDTO {
    private InvoiceDTO invoice;
    private ProductDTO product;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    @NotNull(message = "Price is mandatory")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;

    @NotNull(message = "Amount is mandatory")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
    private BigDecimal amount;

    public InvoiceProduct toEntity() {
        return InvoiceProduct.builder()
                .invoice(this.getInvoice() != null ? this.getInvoice().toEntity() : null)
                .product(this.getProduct() != null ? this.getProduct().toEntity() : null)
                .quantity(this.getQuantity())
                .price(this.getPrice())
                .amount(this.getAmount())
                .build();
    }
}