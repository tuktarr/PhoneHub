package com.tuktarr.phonehub.phone;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class PhoneController {
	
	@Autowired
	private PhoneService pService;
	
	@ResponseBody
	@GetMapping("/phoneRankings")
	public Map<String, Object> selPhoneRanking() {
		
		Map<String, Object> phoneRankings = new HashMap<String, Object>();
		phoneRankings.put("performanceRankings", pService.selPerformanceRanking());
		
		return phoneRankings;
	}
	
}
