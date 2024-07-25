package com.fpt.MidtermG1.exception;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorDetails {
    private final int status;
    private final List<String> messages;
}
