package com.me10zyl.cookbook.dto;

import lombok.Data;

@Data
public class ReturnResult<T> {
    private String message;
    private boolean success;
    private T data;

    public static <T> ReturnResult<T> success(T data) {
        ReturnResult<T> tReturnResult = new ReturnResult<>();
        tReturnResult.success = true;
        tReturnResult.data = data;
        return tReturnResult;
    }

    public static <T> ReturnResult<T> fail(String data) {
        ReturnResult<T> tReturnResult = new ReturnResult<>();
        tReturnResult.success = false;
        tReturnResult.message = data;
        return tReturnResult;
    }
}
