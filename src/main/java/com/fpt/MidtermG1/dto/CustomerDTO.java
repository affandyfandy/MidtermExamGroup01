package com.fpt.MidtermG1.dto;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.fpt.MidtermG1.common.Status;
import com.fpt.MidtermG1.data.entity.Customer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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

    @NotBlank(message = "Name is mandatory")
    @Size(max = 255, message = "Name can be up to 255 characters long")
    private String name;

    @NotBlank(message = "Phone number is mandatory")
    @Size(max = 20, message = "Phone number can be up to 20 characters long")
    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Phone number is invalid")
    private String phoneNumber;

    @NotNull(message = "Status is mandatory")
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
