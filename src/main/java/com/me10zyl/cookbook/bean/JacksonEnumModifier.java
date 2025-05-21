package com.me10zyl.cookbook.bean;

import com.baomidou.mybatisplus.annotation.IEnum;
import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.DeserializationConfig;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.deser.BeanDeserializerModifier;

public class JacksonEnumModifier extends BeanDeserializerModifier {


    @Override
    public JsonDeserializer<?> modifyEnumDeserializer(DeserializationConfig config, JavaType type, BeanDescription beanDesc, JsonDeserializer<?> deserializer) {
        if (IEnum.class.isAssignableFrom(beanDesc.getBeanClass())) {
            return new IEnumJsonDeserializer();
        }
        return deserializer;
    }
}
