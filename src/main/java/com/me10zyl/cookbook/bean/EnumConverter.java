package com.me10zyl.cookbook.bean;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.IEnum;
import com.me10zyl.cookbook.exception.ServiceException;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.converter.Converter;

import java.util.EnumSet;

@AllArgsConstructor
public class EnumConverter implements Converter<String, IEnum<?>> {

    private Class<? extends IEnum<?>> targetType;

    @Override
    public IEnum<?> convert(String value) {
        IEnum<?>[] enumSet = targetType.getEnumConstants();
        for (IEnum constant : enumSet) {
            if (String.valueOf(constant.getValue()).equals(value)) {
                return constant;
            }
        }
        throw new ServiceException("非法参数");
    }
}
