package com.me10zyl.cookbook.bean;

import com.baomidou.mybatisplus.annotation.IEnum;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterFactory;

public class EnumConverterFactory implements ConverterFactory<String, IEnum<?>> {

    @Override
    public <T extends IEnum<?>> Converter<String, T> getConverter(Class<T> targetType) {
        return (Converter<String, T>) new EnumConverter(targetType);
    }
}
