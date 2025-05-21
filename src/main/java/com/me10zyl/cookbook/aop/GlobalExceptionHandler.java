package com.me10zyl.cookbook.aop;

import cn.hutool.json.JSONUtil;
import com.me10zyl.cookbook.dto.ReturnResult;
import com.me10zyl.cookbook.exception.ServiceException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler({ServiceException.class})
    public ResponseEntity<String> codeExceptionHandler(HttpServletRequest request, HttpServletResponse response, ServiceException e) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(MediaType.APPLICATION_JSON_UTF8_VALUE));
        return new ResponseEntity<>(JSONUtil.toJsonStr(ReturnResult.fail(e.getMessage())), headers, HttpStatus.OK);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<String> otherExceptionHandler(HttpServletRequest request, HttpServletResponse response, Exception e) {
        log.error("发生异常", e);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(MediaType.APPLICATION_JSON_UTF8_VALUE));
        return new ResponseEntity<>(JSONUtil.toJsonStr(ReturnResult.fail(e.getMessage())), headers, HttpStatus.OK);
    }
}
