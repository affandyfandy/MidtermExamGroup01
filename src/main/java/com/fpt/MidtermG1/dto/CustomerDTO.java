package com.fpt.MidtermG1.dto;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.fpt.MidtermG1.common.Status;
import com.fpt.MidtermG1.data.entity.Customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerDTO {
    private String id;
    private String name;
    private String phoneNumber;
    private Status status;
    private Timestamp createdTime;
    private Timestamp updatedTime;
    private List<InvoiceDTO> invoices;

    public Customer toEntity() {
        return Customer.builder()
                .id(this.getId())
                .name(this.getName())
                .phoneNumber(this.getPhoneNumber())
                .status(this.getStatus())
                .createdTime(this.getCreatedTime())
                .updatedTime(this.getUpdatedTime())
                .invoices(Optional.ofNullable(this.getInvoices())
                                .map(invoice -> invoice.stream()
                                .map(InvoiceDTO::toEntity)
                                .collect(Collectors.toSet()))
                                .orElse(Collections.emptySet()))
                .build();
    }
}
