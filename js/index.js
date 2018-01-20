// 获取所有的城市
let cities,weatherobj;

$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	success:function(obj){
		cities = obj.data;
		for(let i in cities){
              let section=document.createElement('section');
              let cities_title=document.createElement('h1');
              cities_title.className="cities_title";
              cities_title.innerHTML=i;
              section.appendChild(cities_title);
              for(let j in cities[i]){
              	let cities_list=document.createElement('ul');
              	cities_list.className="cities_list";
              	let li=document.createElement('li');
              	li.innerHTML=j;
              	cities_list.appendChild(li);
              	section.appendChild(cities_list);

              }
              $(".cities_box").append(section);
		}
	}
})
$.getScript("https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
    getFullWeather(remote_ip_info.city);
});

function getFullWeather(nowcity){
	$(".now_city").html(nowcity);
	$.ajax({
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
		dataType:"jsonp",
		success:function(obj){
				weatherobj = obj.data;
				console.log(weatherobj);

				// 当前的空气质量
				$(".now_air_quality").html(weatherobj.weather.quality_level);
				$(".now_temp_temp").html(weatherobj.weather.current_temperature);
				$(".now_wind").html(weatherobj.weather.wind_direction); 
				$(".now_wind_level").html(weatherobj.weather.wind_level+"级"); 
				$(".now_qing").html(weatherobj.weather.current_condition); 

				// 近期两天的天气信息
				// 今天的温度
				$(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
				$(".today_temp_min").html(weatherobj.weather.dat_low_temperature);
				$(".today_weather").html(weatherobj.weather.dat_condition);
				$(".today_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");

				// 明天的信息
				$(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
				$(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature);
				$(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);
				$(".tomorrow_img").attr('src',"img/"+weatherobj.weather.tomorrow_weather_icon_id+".png");

				// 未来24小时之内的天气信息
				let hours_array=weatherobj.weather.hourly_forecast;
				
				for(let i = 0;i < hours_array.length;i++)

				{
					// 创建元素并添加到页面中

						let hours_list=document.createElement('li');
						let hours_time=document.createElement('span');
						hours_time.className='hours_time';

						let hours_img=document.createElement('img');
						hours_img.className='hours_img';

						let hours_temp=document.createElement('temp');
						hours_temp.className='hours_temp';

						hours_list.appendChild(hours_time);
						hours_list.appendChild(hours_img);
						hours_list.appendChild(hours_temp);

						$('.hours_content').append(hours_list);

						// 当下的时间
						hours_time.innerHTML=hours_array[i].hour+":00"

						hours_img.setAttribute('src',"img/"+hours_array[i].weather_icon_id+".png");
						hours_temp.innerHTML=hours_array[i].temperature+"°";

				}

				// 未来一周的天气信息
				let week_array = weatherobj.weather.forecast_list;
				for(let j = 0;j<week_array.length;j++){

					// 创建元素并添加到页面中

					let week_list = document.createElement('li');
					let week_time = document.createElement('span');
					week_time.className = 'week_time';
					let week_weather = document.createElement('span');
					week_weather.className = 'week_weather';
					let week_img = document.createElement('img');
					week_img.className = 'week_img';
					let week_high = document.createElement('span');
					week_high.className = 'week_high';
					let week_low = document.createElement('span');
					week_low.className = 'week_low';
					
					let week_windc = document.createElement('span');
					week_windc.className = 'week_windc';
					let week_windl = document.createElement('span');
					week_windl.className = 'week_windl';

					

					week_list.appendChild(week_time);
					week_list.appendChild(week_weather);
					week_list.appendChild(week_img);
					week_list.appendChild(week_high);
					week_list.appendChild(week_low);
					week_list.appendChild(week_windc);
					week_list.appendChild(week_windl);
					


					$('.future_content').append(week_list);

					// 当下的时间week
					week_time.innerHTML = week_array[j].date.substring(5,7)+"/"+week_array[j].date.substring(8);
					week_weather.innerHTML=week_array[j].condition;
					week_img.setAttribute('src',"img/"+week_array[j].weather_icon_id+".png");
					week_high.innerHTML=week_array[j].high_temperature+"°";
					week_low.innerHTML=week_array[j].low_temperature+"°";	
					week_windc.innerHTML=week_array[j].wind_direction;
					week_windl.innerHTML=week_array[j].wind_level+"级";		
			}
		}
})
}
$(function(){
	$(".now_city").on("click",function(){
		$(".search").val("");
		$(".confirm").html("取消");	
		$(".cities").css("display","block");
		})

	$(".cities_list li").on("click",function(){
		let son = this.innerHTML;
		getFullWeather(son);
		$(".cities").css("display","none");
		})
					
//原生js加载$方法
// window.onload = function(){

// }
// 事件委派

	$("body").delegate(".cities_list li", "click", function() {
		let son = this.innerHTML;
		getFullWeather(son);
		$(".cities").css("display","none");
	})

	$("body").delegate(".cities_title li", "click", function() {
		let son = this.innerHTML;
		getFullWeather(son);
		$(".cities").css("display","none");
	})
	$(".search").on("focus",function(){
		$(".confirm").html('确认');
	})

	
	$(".confirm").on("click",function(){
		if(this.innerText=="取消"){
			$(".cities").css("display","none");
			
		}else if(this.innerText=="确认"){
			// console.log(this.innerText);
			let text=$(".search").val();
			for(let i in cities){
				if(text==i){
					getFullWeather(text);
					$(".cities").css("display","none");
					return;

				}else{
					for(let j in cities[i]){
						if(text==j){
							getFullWeather(text);
							$(".cities").css("display","none");
							return;
						}
					}
				}			
			}
			alert("输入地区有误");
			
		}
	})
			
		
	
})




// window.onload=function(){
