package com.fpt.MidtermG1.data.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.fpt.MidtermG1.data.entity.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, String>, JpaSpecificationExecutor<Invoice> {
    Page<Invoice> findByCustomerIdAndInvoiceDateYearAndInvoiceDateMonth(String customerId, int year, int month, Pageable pageable);
}
