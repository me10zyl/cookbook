package com.me10zyl.cookbook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Step {
    private int stepNumber;
    private String description;
}
