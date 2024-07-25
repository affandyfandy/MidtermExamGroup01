package com.fpt.MidtermG1.data.repository;

import com.fpt.MidtermG1.data.entity.InvoiceProduct;
import com.fpt.MidtermG1.data.entity.InvoiceProductId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface InvoiceProductRepository extends JpaRepository<InvoiceProduct, InvoiceProductId> {
    @Query("SELECT ip FROM InvoiceProduct ip WHERE ip.invoice.id = :invoiceId")
    List<InvoiceProduct> findByInvoiceId(@Param("invoiceId") String invoiceId);

    @Query("SELECT ip FROM InvoiceProduct ip JOIN ip.invoice i WHERE i.invoiceDate BETWEEN :startDate AND :endDate")
    List<InvoiceProduct> findByInvoiceDateBetween(@Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);
}
