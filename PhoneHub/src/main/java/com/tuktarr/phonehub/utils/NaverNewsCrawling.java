package com.tuktarr.phonehub.utils;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.tuktarr.phonehub.model.NewsEntity;

@Component
public class NaverNewsCrawling {

	public static List<NewsEntity> naverNewsCrawling(String title) throws IOException {

		List<NewsEntity> data = new ArrayList<NewsEntity>();
		List<String> days = new ArrayList<String>();
		String firstTitle = "";
		boolean stop = true;
		boolean pageStop = true;
		int page = 1;

		for (int i = 0; i < 14; i++) {
			Calendar cal = Calendar.getInstance();
			String format = "yyyyMMdd";
			SimpleDateFormat sdf = new SimpleDateFormat(format);
			cal.add(Calendar.DAY_OF_MONTH, -i);
			String date = sdf.format(cal.getTime());
			days.add(date);
		}

		for (String day : days) {
			pageStop = true;
			System.out.println(day);
			while (pageStop) {
				System.out.println(page);
				String url = "https://news.naver.com/main/list.nhn?mode=LS2D&mid=shm&sid2=731&sid1=105&date=" + day
						+ "&page=" + (page++);
				Document doc = Jsoup.connect(url).header("Content-Type", "application/json;charset=UTF-8").get();
				Elements newsBoxs = doc.select(".newsflash_body > ul > li > dl");

				for (int i = 0; i < newsBoxs.size(); i++) {
					NewsEntity newsEntity = new NewsEntity();

					String nTitle = newsBoxs.get(i).select("dt > a").text();
					if (nTitle.equals(firstTitle)) {
						page = 1;
						pageStop = false;
						break;
					}
					
					firstTitle = newsBoxs.get(0).select("dt > a").text();
					newsEntity.setTitle(nTitle);

					if (title.equals(nTitle)) {
						stop = false;
						pageStop = false;
						break;
					}
					
					newsEntity.setContent(newsBoxs.get(i).select(".lede").text());
					newsEntity.setWriter(newsBoxs.get(i).select(".writing").text());
					newsEntity.setImg(newsBoxs.get(i).select("dt > a > img").attr("src"));
					newsEntity.setUrl(newsBoxs.get(i).select("dt > a").attr("href"));
					newsEntity.setRegDt(day);

					data.add(newsEntity);
				}
			}
			if (stop == false) {
				break;
			}
		}
		return data;
	}

}
