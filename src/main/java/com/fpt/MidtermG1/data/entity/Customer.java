package com.fpt.MidtermG1.data.entity;

import java.sql.Timestamp;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.fpt.MidtermG1.common.Status;
import com.fpt.MidtermG1.dto.CustomerDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Customer")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {
    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "created_time", nullable = false, updatable = false)
    private Timestamp createdTime;

    @Column(name = "updated_time", nullable = false)
    private Timestamp updatedTime;

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY)
    private Set<Invoice> invoices;

    public CustomerDTO toDTO() {
        return CustomerDTO.builder()
                .id(this.getId())
                .name(this.getName())
                .phoneNumber(this.getPhoneNumber())
                .status(this.getStatus())
                .createdTime(this.getCreatedTime())
                .updatedTime(this.getUpdatedTime())
                .invoices(Optional.ofNullable(this.getInvoices())
                        .map(invoice -> invoice.stream()
                                .map(Invoice::toDTO)
                                .collect(Collectors.toList()))
                        .orElse(null))
                .build();
    }
}