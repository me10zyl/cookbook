package com.me10zyl.cookbook.bean;

import com.baomidou.mybatisplus.annotation.IEnum;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.deser.ContextualDeserializer;
import lombok.Setter;

import java.io.IOException;

public class IEnumJsonDeserializer extends JsonDeserializer<IEnum<?>> implements ContextualDeserializer {
    @Setter
    private Class<?> clazz;
    @Override
    public IEnum<?> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        String value = p.getText();
        // 获取目标类型
        Class<?> targetType = clazz;
        if (IEnum.class.isAssignableFrom(targetType) && targetType.isEnum()) {
            IEnum<?>[] enumConstants = (IEnum<?>[]) targetType.getEnumConstants();
            if (enumConstants != null) {
                for (IEnum<?> constant : enumConstants) {
                    if (constant.getValue().toString().equals(value)) {
                        return constant;
                    }
                }
            }
        }
        throw new IllegalArgumentException("No enum constant with value " + value + " for type " + targetType.getName());
    }

    @Override
    public JsonDeserializer<?> createContextual(DeserializationContext deserializationContext, BeanProperty beanProperty) throws JsonMappingException {
        Class<?> rawCls = deserializationContext.getContextualType().getRawClass();
        IEnumJsonDeserializer converter = new IEnumJsonDeserializer();
        converter.setClazz(rawCls);
        return converter;
    }
}
