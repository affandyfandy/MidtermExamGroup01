package com.fpt.MidtermG1.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpt.MidtermG1.data.entity.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, String> {
}