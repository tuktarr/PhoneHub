package com.tuktarr.phonehub.test;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testcontroller {
	    @RequestMapping("/")
	    public String hello() {
	        return "Hello World!";
	    }
}
