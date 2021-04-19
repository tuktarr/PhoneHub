package com.tuktarr.phonehub.user;

import org.apache.ibatis.annotations.Mapper;

import com.tuktarr.phonehub.model.UserEntity;

@Mapper
public interface UserMapper {
	int insUser(UserEntity p);
	UserEntity selUser(UserEntity p);
}
