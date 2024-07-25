package com.fpt.MidtermG1.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceProductId implements Serializable {
    private String invoice_id;
    private int product_id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InvoiceProductId that = (InvoiceProductId) o;
        return product_id == that.product_id && Objects.equals(invoice_id, that.invoice_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(invoice_id, product_id);
    }
}
