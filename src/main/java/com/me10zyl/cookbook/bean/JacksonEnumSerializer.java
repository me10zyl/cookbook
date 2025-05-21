package com.me10zyl.cookbook.bean;

import com.baomidou.mybatisplus.annotation.IEnum;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class JacksonEnumSerializer extends JsonSerializer<IEnum> {


    @Override
    public void serialize(IEnum enumValue, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeObject(((IEnum<?>) enumValue).getValue());
    }
}
