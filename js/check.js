function check_allDevice(){
	var mobileKeyWords = new Array('iPhone', 'iPad', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson'); //160625 device 목록에 ipad 추가
	var device_name = '';
	for (var word in mobileKeyWords){
		if (navigator.userAgent.match(mobileKeyWords[word]) != null){
			device_name = mobileKeyWords[word];
			break;
		}
	}

	return device_name;
}

function check_androidDevice(){
	var mobileKeyWords = new Array('BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
	var device_name = '';
	for (var word in mobileKeyWords){
		if (navigator.userAgent.match(mobileKeyWords[word]) != null){
			device_name = mobileKeyWords[word];
			break;
		}
	}

	return device_name;
}

function checkBrowser()
{
	var agt = navigator.userAgent.toLowerCase();
	var rv = -1; // Return value assumes failure.    
	if (navigator.appName == 'Microsoft Internet Explorer') {        
		var ua = navigator.userAgent;        
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
		if (re.exec(ua) != null)            
			rv = parseFloat(RegExp.$1);    

		//return "IE" + rv;
		return "InternetExplorer";
	}
	//alert("agt : " + agt);

	if (agt.indexOf("ucbrowser") != -1) return 'ucbrowser'; 
	if (agt.indexOf("chrome") != -1) return 'Chrome'; 
	if (agt.indexOf("opera") != -1) return 'Opera'; 
	if (agt.indexOf("staroffice") != -1) return 'StarOffice'; 
	if (agt.indexOf("webtv") != -1) return 'WebTV'; 
	if (agt.indexOf("beonex") != -1) return 'Beonex'; 
	if (agt.indexOf("chimera") != -1) return 'Chimera'; 
	if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
	if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
	if (agt.indexOf("firefox") != -1) return 'Firefox'; 
	if (agt.indexOf("safari") != -1) return 'safari'; 
	if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
	if (agt.indexOf("msie") != -1) return 'InternetExplorer'; 
	if (agt.indexOf("netscape") != -1) return 'Netscape'; 
	//if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
	if (agt.indexOf("mozilla/5.0") != -1) return 'InternetExplorer';

	//return 'InternetExplorer';
}


function viewportWidth() 
{  	
	if (typeof document.documentElement.clientWidth != 'undefined' && typeof window.innerWidth != 'undefined')  
	{
		if(document.documentElement.clientWidth > window.innerWidth)
			return document.documentElement.clientWidth;
		else
			return window.innerWidth;  
	}else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
	{
		return document.documentElement.clientWidth;  
	}else{
		return viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
	} 
}