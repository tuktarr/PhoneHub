package com.tuktarr.phonehub.utils;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.tuktarr.phonehub.model.NewsEntity;

@Component
public class NaverNewsCrawling {

	public List<NewsEntity> naverNewsCrawling(String title) throws IOException {

		List<NewsEntity> data = new ArrayList<NewsEntity>();
		List<String> days = new ArrayList<String>();
		boolean stop = true;

		for (int i = 0; i < 14; i++) {
			Calendar cal = Calendar.getInstance();
			String format = "yyyyMMdd";
			SimpleDateFormat sdf = new SimpleDateFormat(format);
			cal.add(Calendar.DAY_OF_MONTH, -i);
			String date = sdf.format(cal.getTime());
			days.add(date);
		}

		for (String day : days) {
			String url = "https://news.naver.com/main/list.nhn?mode=LS2D&mid=shm&sid2=731&sid1=105&date=" + day;
			Document doc = Jsoup.connect(url).header("Content-Type", "application/json;charset=UTF-8").get();
			Elements newsBoxs = doc.select(".newsflash_body > ul > li > dl");

			for (Element content : newsBoxs) {
				NewsEntity newsEntity = new NewsEntity();
				
				String nTitle = content.select("dt > a").text();
				System.out.println(nTitle);
				System.out.println(title);
				newsEntity.setTitle(nTitle);
				if (title.equals(nTitle)) {
					stop = false;
					break;
				}
				newsEntity.setContent(content.select(".lede").text());
				newsEntity.setWriter(content.select(".writing").text());
				newsEntity.setImg(content.select("dt > a > img").attr("src"));
				newsEntity.setUrl(content.select("dt > a").attr("href"));
				newsEntity.setRegDt(day);

				data.add(newsEntity);
			}
			if(stop == false) {
				break;
			}
		}
		return data;
	}
}
