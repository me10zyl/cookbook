package com.me10zyl.cookbook.util;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import com.me10zyl.cookbook.exception.ServiceException;

import java.lang.reflect.Method;
import java.util.Arrays;

public class ParamUtil {
    public static void checkBlank(Object o, boolean reverse, String... fields){
        Method[] gets = ReflectUtil.getMethods(o.getClass(), method -> {
            boolean b = method.getName().startsWith("get");
            if(fields == null || fields.length == 0){
                return b;
            }
            if(reverse){
                return b && Arrays.stream(fields).noneMatch(f->("get" + StrUtil.upperFirst(f)).equals(method.getName()));
            }
            return b && Arrays.stream(fields).anyMatch(f->("get" + StrUtil.upperFirst(f)).equals(method.getName()));
        });
        for (Method get : gets) {
            Object invoke = ReflectUtil.invoke(o, get);
            if(ObjectUtil.isEmpty(invoke) || StrUtil.isBlankIfStr(invoke)){
                throw new ServiceException("参数不能为空:" + StrUtil.lowerFirst(get.getName().substring(3)));
            }
        }
    }
}
