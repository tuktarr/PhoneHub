package com.tuktarr.phonehub.phone;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tuktarr.phonehub.model.PhoneInfoDTO;

@Controller
public class PhoneController {
	
	@Autowired
	private PhoneService pService;
	
	@GetMapping("rank")
	public String rank() {
		return "rank/rank";
	}
	
	@ResponseBody
	@GetMapping("/phonerankings")
	public Map<String, Object> selPhoneRanking() {
		Map<String, Object> phoneRankings = new HashMap<String, Object>();
		phoneRankings.put("performanceRankings", pService.selPerformanceRanking());
		phoneRankings.put("cost_Effectivenes", pService.selCost_Effectiveness());
		
		return phoneRankings;
	}
	
	@ResponseBody
	@GetMapping("/performancerankings")
	public Map<String, Object> selPerformanceRanking() {
		Map<String, Object> phoneRankings = new HashMap<String, Object>();
		phoneRankings.put("performanceRankings", pService.selPerformanceRanking());
		
		return phoneRankings;
	}
	
	@GetMapping("/phonedetail")
	public String selPhoneDetail(PhoneInfoDTO param, Model model) {
		model.addAttribute("data", pService.selPhoneDetail(param));
		model.addAttribute("usebleTip", pService.selUsebleTip());
		
		return "phone/phonedetail";
	}
	
}
