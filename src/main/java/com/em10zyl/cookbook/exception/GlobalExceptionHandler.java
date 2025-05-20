package com.em10zyl.cookbook.exception;

import cn.hutool.json.JSONUtil;
import com.em10zyl.cookbook.dto.ReturnResult;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({ServiceException.class})
    public ResponseEntity<String> codeExceptionHandler(HttpServletRequest request, HttpServletResponse response, ServiceException e) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(MediaType.APPLICATION_JSON_UTF8_VALUE));
        return new ResponseEntity<>(JSONUtil.toJsonStr(ReturnResult.fail(e.getMessage())), headers, HttpStatus.OK);
    }
}
