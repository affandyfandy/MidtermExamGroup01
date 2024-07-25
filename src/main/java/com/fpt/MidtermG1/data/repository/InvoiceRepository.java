package com.fpt.MidtermG1.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.fpt.MidtermG1.data.entity.Invoice;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, String>, JpaSpecificationExecutor<Invoice> {
    List<Invoice> findByInvoiceDateBetween(Timestamp startDate, Timestamp endDate);

    @Query("SELECT i FROM Invoice i LEFT JOIN FETCH i.invoiceProducts WHERE i.id = :id")
    Invoice findByIdWithInvoiceProducts(String id);
}