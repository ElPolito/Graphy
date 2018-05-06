let colors = ["green", "yellow", "blue", "red", "purple"];
let areaColors = ["rgba(0,255,0,0.5)", "rgba(255,255,0,0.5)", "rgba(0,0,255,0.5)", "rgba(255,0,0,0.5)", "rgba(80,0,80,0.5)"];
let borderColors = ["darkgreen", "darkyellow", "darkblue", "darkred", "darkpurple"];

class Graphy{

	constructor(){
		this.marginLeft = 50;
		this.marginRight = 0;
		this.marginTop = 35;
		this.marginBottom = 50;	
		this.paddingLeft = 10;
		this.paddingRight = 10;
		this.paddingTop = 10;
		this.paddingBottom = 10;
	}

	getFromAndTo(newValue){
		let nbCol = parseInt(newValue[2].split(":")[1]);
		let index = nbCol+3;
		let from = newValue[index].split(": ")[1];
		let to = newValue[index+1].split(": ")[1];
		
		if(from == "lower\r" || to == "bigger\r"){
			let vals = [];
			for(var k = 0; k<index-3; k++){
				vals = vals.concat(newValue[3+k].split(": ")[1].split(","));
			}
			for(var l = 0; l<vals.length; l++){
				vals[l] = parseInt(vals[l]);
			}
			vals = vals.sort(function(a,b){return a-b;});
			if(from == "lower\r"){
				from = vals[0];
			}
			if(to == "bigger\r"){
				to = vals[vals.length-1];
			}
		}

		return [from, to];
	}

	getValue(path){
		this.treatAtt();
		var xhr;
		if(window.XMLHttpRequest){
			xhr = new XMLHttpRequest();
		}else if(window.ActiveXObject){
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		var that = this;
		xhr.onreadystatechange = function() {
			if((xhr.status == 0 || xhr.status == 200) && xhr.readyState == 4){
				let value = xhr.responseText;
				let newValue = value.split("\n");
				if(newValue[0].substr(0,5) == 'Title'){
					that.treatValue(value);
				}
			}
		};
		xhr.open("GET", path, true);
		xhr.send();
	}

	addTitle(newValue){
		//Big title
		let title = newValue[0].split(":")[1];
		let h = document.createElement("h2");
		h.innerHTML = title;
		this.element.appendChild(h);
	}

	addBottom(newValue){
		//Bottom
		let botcontain = document.createElement("div");
		botcontain.classList.add("graphy-bot-contain");
		this.element.appendChild(botcontain);
			//Bottom contain values
		let botcontainval = document.createElement("div");
		botcontainval.classList.add("graphy-bot-containval");
		botcontain.appendChild(botcontainval);
			//Bottom values
		let botVals = newValue[1].split(":")[1].split(",");
		for(var i = 0; i<botVals.length; i++){
			let j = document.createElement("i");
			j.innerHTML = botVals[i];
			botcontainval.appendChild(j);
		}
			//Bottom title
		let bottTit = newValue[1].split(":")[0];
		let h_bot = document.createElement("h3");
		h_bot.innerHTML = bottTit;
		h_bot.classList.add("graphy-tit-bot");
		botcontain.appendChild(h_bot);
	}
	
	addLeft(newValue){
		//Left
		let leftcontain = document.createElement("div");
		leftcontain.classList.add("graphy-left-contain");
		this.element.appendChild(leftcontain);
			//Left title
		let lefttitle = newValue[2].split(":")[0];
		let h_left = document.createElement("h3");
		h_left.innerHTML = lefttitle;
		h_left.classList.add("graphy-tit-left");
		h_left.style.width = leftcontain.offsetHeight + "px";
		leftcontain.appendChild(h_left);
			//Left contain values
		let leftcontainval = document.createElement("div");
		leftcontainval.classList.add("graphy-left-containval");
		leftcontain.appendChild(leftcontainval);
			//Left values
		let nbCol = parseInt(newValue[2].split(":")[1]);
		let index = nbCol+3;
		let from = newValue[index].split(": ")[1];
		let to = newValue[index+1].split(": ")[1];
		
		if(from == "lower\r" || to == "bigger\r"){
			let vals = [];
			for(var k = 0; k<index-3; k++){
				vals = vals.concat(newValue[3+k].split(": ")[1].split(","));
			}
			for(var l = 0; l<vals.length; l++){
				vals[l] = parseInt(vals[l]);
			}
			vals = vals.sort(function(a,b){return a-b;});
			if(from == "lower\r"){
				from = vals[0];
			}
			if(to == "bigger\r"){
				to = vals[vals.length-1];
			}
		}
		let step = parseInt(newValue[index+2].split(":")[1]);
		for(var m = to; m >= from; m -= step){
			let j = document.createElement("i");
			j.innerHTML = m + " ";
			leftcontainval.appendChild(j);
		}
	}

	addBackgroundHor(newValue, canvas){
		let nbCol = parseInt(newValue[2].split(":")[1]);
		let index = nbCol+3;
		let from = newValue[index].split(": ")[1];
		let to = newValue[index+1].split(": ")[1];
		let step = parseInt(newValue[index+2].split(":")[1]);
		if(from == "lower\r" || to == "bigger\r"){
			let vals = [];
			for(var k = 0; k<index-3; k++){
				vals = vals.concat(newValue[3+k].split(": ")[1].split(","));
			}
			for(var l = 0; l<vals.length; l++){
				vals[l] = parseInt(vals[l]);
			}
			vals = vals.sort(function(a,b){return a-b;});
			if(from == "lower\r"){
				from = vals[0];
			}
			if(to == "bigger\r"){
				to = vals[vals.length-1];
			}
		}
		let val = (to-from) / step + 1;
		var ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = this.gridColor;
		for(var i = 0; i < val; i++){
			let v = parseInt(from) + step * i;
			console.log(v);
			let up = to-from;
			let newJVal = v-from;
			let theval = newJVal*(100/up);
			let y = ((100-theval)*(canvas.offsetHeight-this.paddingTop-this.paddingBottom))/100;
			ctx.moveTo(0,y+this.paddingTop);
			ctx.lineTo(canvas.offsetWidth, y+this.paddingTop);
		}
		ctx.stroke();
		ctx.closePath();
	}

	addBackgroundVer(newValue, canvas){
		let val = newValue[1].split(": ")[1].split(",");
		var ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "rgba(0,0,0,0.5)";
		for(var i = 0; i < val.length; i++){
			let x = (canvas.offsetWidth-this.paddingLeft-this.paddingRight)/(val.length-1)*i;
			ctx.moveTo(x+this.paddingLeft,0);
			ctx.lineTo(x+this.paddingLeft, canvas.offsetHeight);
		}
		ctx.stroke();
		ctx.closePath();
	}

	treatAtt(){
		let  e = this.element;
		if(e.getAttribute("gr-grid") != null){
			this.grid = true;
		}else{
			this.grid = false;
		}

		if(e.getAttribute("gr-grid-ver") != null){
			this.grid_ver = true;
		}else{
			this.grid_ver = false;
		}

		if(e.getAttribute("gr-grid-hor") != null){
			this.grid_hor = true;
		}else{
			this.grid_hor = false;
		}

		if(e.getAttribute("gr-colors") != null){
			this.colors = e.getAttribute("gr-colors").split(";");
		}else{
			this.colors = colors;
		}

		if(e.getAttribute("gr-points") != null){
			this.point = true;
		}else{
			this.point = false;
		}

		if(e.getAttribute("gr-area-colors") != null){
			this.areaColors = e.getAttribute("gr-area-colors").split(";");
		}else{
			this.areaColors = areaColors;
		}

		if(e.getAttribute("gr-curve") != null){
			this.curve = true;
		}else{
			this.curve = false;
		}

		if(e.getAttribute("gr-area") != null){
			this.area = true;
		}else{
			this.area = false;
		}

		if(e.getAttribute("gr-spider") != null){
			this.spider = true;
		}else{
			this.spider = false;
		}

		if(e.getAttribute("gr-curve-weight") != null){
			this.curveWeight = parseInt(e.getAttribute("gr-curve-weight"));
		}else{
			this.curveWeight = 4;
		}

		if(e.getAttribute("gr-shape-size") != null){
			this.shapeSize = parseInt(e.getAttribute("gr-shape-size"));
		}else{
			this.shapeSize = 10;
		}

		if(e.getAttribute("gr-pie-radius") != null){
			this.pieRadius = parseInt(e.getAttribute("gr-pie-radius"));
		}else{
			this.pieRadius = 150;
		}

		if(e.getAttribute("gr-ring-radius") != null){
			this.ringRadius = parseInt(e.getAttribute("gr-ring-radius"));
		}else{
			this.ringRadius = 100;
		}

		if(e.getAttribute("gr-ring-weight") != null){
			this.ringWeight = parseInt(e.getAttribute("gr-ring-weight"));
		}else{
			this.ringWeight = 50;
		}

		if(e.getAttribute("gr-border-weight") != null){
			this.borderWeight = parseInt(e.getAttribute("gr-border-weight"));
		}else{
			this.borderWeight = 0;
		}

		if(e.getAttribute("gr-border-colors") != null){
			this.borderColors = e.getAttribute("gr-border-colors").split(";");
		}else{
			this.borderColors = borderColors;
		}

		if(e.getAttribute("gr-margin-left") != null){
			this.marginLeft = parseInt(e.getAttribute("gr-margin-left"));
		}else{
			//this.marginLeft = 0;
		}

		if(e.getAttribute("gr-margin-right") != null){
			this.marginRight = parseInt(e.getAttribute("gr-margin-right"));
		}else{
			//this.marginRight = 0;
		}

		if(e.getAttribute("gr-margin-top") != null){
			this.marginTop = parseInt(e.getAttribute("gr-margin-top"));
		}else{
			//this.marginTop = 0;
		}

		if(e.getAttribute("gr-margin-bottom") != null){
			this.marginBottom = parseInt(e.getAttribute("gr-margin-bottom"));
		}else{
			//this.marginBottom = 0;
		}

		if(e.getAttribute("gr-padding-left") != null){
			this.paddingLeft = parseInt(e.getAttribute("gr-padding-left"));
		}else{
			//this.paddingLeft = 0;
		}

		if(e.getAttribute("gr-padding-right") != null){
			this.paddingRight = parseInt(e.getAttribute("gr-padding-right"));
		}else{
			//this.paddingRight = 0;
		}

		if(e.getAttribute("gr-padding-top") != null){
			this.paddingTop = parseInt(e.getAttribute("gr-padding-top"));
		}else{
			//this.paddingTop = 0;
		}

		if(e.getAttribute("gr-padding-bottom") != null){
			this.paddingBottom = parseInt(e.getAttribute("gr-padding-bottom"));
		}else{
			//this.paddingBottom = 0;
		}

		if(e.getAttribute("gr-spider-radius") != null){
			this.spiderRadius = parseInt(e.getAttribute("gr-spider-radius"));
		}else{
			this.spiderRadius = 150;
		}
	}

	createCanvas(newValue){
		let centerContain = document.createElement("canvas");
		centerContain.classList.add("graphy-center-contain");
		this.element.appendChild(centerContain);
		centerContain.height=this.element.offsetHeight-this.marginBottom-this.marginTop;
		centerContain.width=this.element.offsetWidth-this.marginLeft-this.marginRight;
		centerContain.style.left = this.marginLeft + "px";
		centerContain.style.top = this.marginTop + "px";
		if(this.grid){
			this.addBackgroundHor(newValue, centerContain);
			this.addBackgroundVer(newValue, centerContain);
		}else if(this.grid_ver){
			this.addBackgroundVer(newValue, centerContain);
		}else if(this.grid_hor){
			this.addBackgroundHor(newValue, centerContain);
		}

		return centerContain;
	}
}

class Graphy_histogram extends Graphy{

	static bind(selector){
		document.querySelectorAll(selector).forEach(element => new Graphy_histogram(element));
	}

	constructor(element){
		super();
		this.element = element;
		if(element.getAttribute("Graphy-link") != null){
			let path = element.getAttribute("Graphy-link");
			this.getValue(path);
		}
	}
	treatValue(value){
		let element = this.element;
		let newValue = value.split("\n");
		this.addTitle(newValue);
		this.addBottom(newValue);
		this.addLeft(newValue);


		let nbCol = parseInt(newValue[2].split(":")[1]);
		let index = nbCol+3;
		let from = newValue[index].split(": ")[1];
		let to = newValue[index+1].split(": ")[1];
		if(from == "lower\r" || to == "bigger\r"){
			let vals = [];
			for(var k = 0; k<index-3; k++){
				vals = vals.concat(newValue[3+k].split(": ")[1].split(","));
			}
			for(var l = 0; l<vals.length; l++){
				vals[l] = parseInt(vals[l]);
			}
			vals = vals.sort(function(a,b){return a-b;});
			if(from == "lower\r"){
				from = vals[0];
			}
			if(to == "bigger\r"){
				to = vals[vals.length-1];
			}
		}


		//Center
		let centerContain = this.createCanvas(newValue);
		let ctx = centerContain.getContext("2d");
		
		let nbvalues = newValue[3].split(": ")[1].split(",").length;
		for(var n = 0; n<nbvalues; n++){
			for(var o = 0; o < nbCol; o++){
				let jVal = newValue[3+o].split(": ")[1].split(",")[n];
				let up = to-from;
				let newJVal = jVal-from;
				let theval = newJVal*(100/up);
				
				let x = (centerContain.offsetWidth-this.paddingLeft-this.paddingRight)/(nbvalues*nbCol)*(n*nbCol+o);
				let h = (centerContain.offsetWidth-this.paddingLeft-this.paddingRight)/(nbvalues*nbCol);
				let w = (centerContain.offsetHeight-this.paddingTop-this.paddingBottom)*theval/100;
				ctx.beginPath();
				ctx.fillStyle = this.colors[o];
				ctx.rect(x+this.paddingLeft, centerContain.offsetHeight-this.paddingTop-w,h, w)
				ctx.fill();
				if(this.borderWeight > 0){
					ctx.lineWidth = this.borderWeight;
					ctx.strokeStyle = this.borderColors[o];
					ctx.stroke();	
				}
			}
		}
	}
}

class Graphy_curve extends Graphy{

	static bind(selector){
		document.querySelectorAll(selector).forEach(element => new Graphy_curve(element));
	}

	constructor(element){
		super();
		this.element = element;
		if(element.getAttribute("Graphy-link") != null){
			let path = element.getAttribute("Graphy-link");
			this.getValue(path);
		}
	}

	treatValue(value){
		let element = this.element;
		let newValue = value.split("\n");
		this.addTitle(newValue);
		this.addBottom(newValue);
		this.addLeft(newValue);

		let nbCol = parseInt(newValue[2].split(":")[1]);
		let index = nbCol+3;
		let from = newValue[index].split(": ")[1];
		let to = newValue[index+1].split(": ")[1];

		//Center
		let centerContain = this.createCanvas(newValue);
		var ctx = centerContain.getContext("2d");
		for(var n = 0; n < nbCol; n++){
			let x = 0;
			let val = newValue[n+3].split(":")[1].split(",");
			ctx.beginPath();
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			ctx.lineWidth = this.curveWeight;
			ctx.strokeStyle = this.colors[n];
			ctx.fillStyle = this.colors[n];
			for(var o = 0; o < val.length; o++){
				let v = parseInt(val[o]);
				let up = to-from;
				let newJVal = v-from;
				let theval = newJVal*(100/up);
				x = ((centerContain.offsetWidth-this.paddingLeft-this.paddingRight)/(val.length-1)) * o;
				let y = ((100-theval)*(centerContain.offsetHeight-this.paddingTop-this.paddingBottom))/100;
				
				if(o != 0){
					ctx.lineTo(x+this.paddingLeft,y+this.paddingTop);
				}else{
					ctx.moveTo(x+this.paddingLeft,y+this.paddingTop);
				}

				if(this.point){
					ctx.arc(x+this.paddingLeft,y+this.paddingTop, this.shapeSize, 0, 2*Math.PI, false);
					ctx.moveTo(x+this.paddingLeft,y+this.paddingTop);
				}
			}
			ctx.stroke();
			if(this.area){
				ctx.lineTo(x+this.paddingLeft, centerContain.offsetHeight-this.paddingBottom);
				ctx.lineTo(this.paddingLeft,centerContain.offsetHeight-this.paddingBottom);
			}
			ctx.closePath();
			if(this.area){
				ctx.fillStyle = this.areaColors[n];
				ctx.fill();	
			}
		}
	}
}

class Graphy_pie extends Graphy{

	static bind(selector){
		document.querySelectorAll(selector).forEach(element => new Graphy_pie(element));
	}

	constructor(element){
		super();
		this.element = element;
		if(element.getAttribute("Graphy-link") != null){
			let path = element.getAttribute("Graphy-link");
			this.getValue(path);
		}
	}

	treatValue(value){
		let element = this.element;
		let newValue = value.split("\n");
		this.addTitle(newValue);

		//Center
		let centerContain = this.createCanvas(newValue);
		var ctx = centerContain.getContext("2d");
		let values = newValue[2].split(",");
		let x = centerContain.width/2-10;
		let y = centerContain.height/2-10;
		let radius = this.pieRadius;
		let startAngle = -0.5 * Math.PI;
		let endAngle = startAngle;
		let hl = null;
		if(newValue[3].split(":")[1] != null){
			hl = newValue[3].split(": ")[1];
		}
		let leg = newValue[1].split(",");
		for(var n = 0; n < values.length; n++){
			ctx.beginPath();
			endAngle = startAngle+(values[n]/100)*(2*Math.PI);
			/*if(leg[n] == hl){
				ctx.arc(x+10,y,radius+5, startAngle, endAngle, false);	
				ctx.lineWidth = 0;
				ctx.lineTo(x+10,y);
			}else{*/
				ctx.arc(x,y,radius, startAngle, endAngle, false);
				ctx.lineWidth = this.borderWeight;
				ctx.lineTo(x,y);
			//}
			
			
			ctx.closePath();
			ctx.fillStyle = this.colors[n];
			ctx.fill();
			if(this.borderWeight > 0){
				ctx.strokeStyle = this.borderColors[n];
				ctx.stroke();
			}
			startAngle = endAngle;
		}
		let l = document.createElement("div");
		l.classList.add("graphy-leg-contain");
		element.appendChild(l);
		for(var o = 0; o < leg.length; o++){
			let a = document.createElement("span");
			a.classList.add("graphy-leg-item");
			l.appendChild(a);
			let c = document.createElement("div");
			c.style.backgroundColor = this.colors[o];
			a.appendChild(c);
			let s = document.createElement("i");
			s.innerHTML = leg[o];
			a.appendChild(s);
		}
	}
}

class Graphy_ring extends Graphy{

	static bind(selector){
		document.querySelectorAll(selector).forEach(element => new Graphy_ring(element));
	}

	constructor(element){
		super();
		this.element = element;
		if(element.getAttribute("Graphy-link") != null){
			let path = element.getAttribute("Graphy-link");
			this.getValue(path);
		}
	}

	treatValue(value){
		let element = this.element;
		let newValue = value.split("\n");
		this.addTitle(newValue);

		//Center
		let centerContain = this.createCanvas(newValue);
		var ctx = centerContain.getContext("2d");
		let values = newValue[2].split(",");
		let x = centerContain.width/2;
		let y = centerContain.height/2;
		let radius = this.ringRadius;
		let startAngle = -0.5 * Math.PI;
		let endAngle = startAngle;
		for(var n = 0; n < values.length; n++){
			ctx.beginPath();
			endAngle = startAngle+(values[n]/100)*(2*Math.PI);
			ctx.arc(x,y,radius, startAngle, endAngle, false);
			ctx.lineWidth = this.ringWeight;
			ctx.strokeStyle = this.colors[n];
			ctx.stroke();
			startAngle = endAngle;
		}
		let leg = newValue[1].split(",");
		let l = document.createElement("div");
		l.classList.add("graphy-leg-contain");
		element.appendChild(l);
		for(var o = 0; o < leg.length; o++){
			let a = document.createElement("span");
			a.classList.add("graphy-leg-item");
			l.appendChild(a);
			let c = document.createElement("div");
			c.style.backgroundColor = this.colors[o];
			a.appendChild(c);
			let s = document.createElement("i");
			s.innerHTML = leg[o];
			a.appendChild(s);
		}
	}
}

class Graphy_spider extends Graphy{

	static bind(selector){
		document.querySelectorAll(selector).forEach(element => new Graphy_spider(element));
	}

	constructor(element){
		super();
		this.element = element;
		if(element.getAttribute("Graphy-link") != null){
			let path = element.getAttribute("Graphy-link");
			this.getValue(path);
		}
	}

	treatValue(value){
		let element = this.element;
		let newValue = value.split("\n");
		this.addTitle(newValue);

		//Center
		let centerContain = this.createCanvas(newValue);
		let ctx = centerContain.getContext("2d");
		
		//Axes
		let legTop = newValue[1].split(",");
		let x = centerContain.width/2-25;
		let y = centerContain.height/2+8;
		let radius = this.spiderRadius;
		let startAngle = -0.5 * Math.PI;
		let endAngle = startAngle;
		ctx.font = "10px Helvetica";
		ctx.textAlign = "center";
		for(var i = 0; i < legTop.length; i++){
			var coeffY = 0;
			var coeffX = 0;
			ctx.beginPath();
			endAngle = startAngle+(2*Math.PI)/legTop.length;
			ctx.lineWidth = 0;
			ctx.arc(x,y,radius, startAngle, startAngle, false);
			ctx.lineTo(x,y);
			ctx.lineWidth = 2;
			ctx.stroke();
			if(startAngle == -0.5*Math.PI){
				var coeffY = -20;
			}else if(startAngle > 0.48*Math.PI && startAngle < 0.52*Math.PI){
				var coeffY = 10;
			}
			if(startAngle > -0.5*Math.PI && startAngle < 0.48*Math.PI){
				ctx.textAlign = "start";
				coeffX = 10;
			}else if(startAngle > 0.52*Math.PI || startAngle < -0.5*Math.PI){
				ctx.textAlign = "end";
				coeffX = -10;
			}else{
				ctx.textAlign = "center";
			}
			ctx.fillText(legTop[i], x+Math.cos(startAngle)*150+coeffX, y+Math.sin(startAngle)*150+coeffY);
			startAngle = endAngle;
		}

		let fromTo = this.getFromAndTo(newValue);
		let nbCol = parseInt(newValue[2].split(":")[1]);
		let index = nbCol+3;
		let step = parseInt(newValue[index+2].split(":")[1]);
		let nbSteps = (fromTo[1]-fromTo[0])/step;

		//Araignee
		if(this.spider){
			startAngle = -0.5 * Math.PI;
			for(var j = 1; j <= nbSteps; j++){
				ctx.beginPath();
				radius = (this.spiderRadius/nbSteps)*j;
				for(var k = 0; k < legTop.length; k++){
					endAngle = startAngle+(2*Math.PI)/legTop.length;
					ctx.lineWidth = 0;
					ctx.arc(x,y,radius, startAngle, startAngle, false);
					startAngle = endAngle;
					ctx.arc(x,y,radius, startAngle,startAngle,false);
					ctx.lineWidth = 2;
					ctx.stroke();
				}
			}	
		}
		

		//Valeurs
		startAngle = -0.5 * Math.PI;
		let nbPath = parseInt(newValue[2].split(": ")[1]);
		for(var l = 0; l < nbPath; l++){
			let val = newValue[3+l].split(": ")[1].split(",");
			ctx.beginPath();
			ctx.strokeStyle = this.borderColors[l];
			ctx.lineWidth = this.borderWeight;
			for(var m = 0; m < val.length; m++){
				radius = (val[m]-fromTo[0])*(100/(fromTo[1]-fromTo[0]))*this.spiderRadius/100;
				endAngle = startAngle+(2*Math.PI)/val.length;
				ctx.arc(x,y, radius, startAngle, startAngle, false);
				startAngle = endAngle;
			}
			ctx.closePath();
			if(this.borderWeight > 0){
				ctx.stroke();
			}
			if(this.area){
				ctx.fillStyle =this.areaColors[l];
				ctx.fill();
			}
		}

		//Legende Axes
		ctx.fillStyle = "black";
		ctx.textAlign = "start";
		for(var h = 0; h <= nbSteps; h++){
			ctx.font = "12px Helvetica";
			var txt = parseInt(fromTo[0])+(h*step);
			ctx.fillText(txt, x+5,y-h*(150/nbSteps));
		}
	}
}


window.onload = () => {
	Graphy_histogram.bind('*[graphy-histo]');
	Graphy_curve.bind('*[graphy-curve]');
	Graphy_pie.bind('*[graphy-pie]');
	Graphy_ring.bind('*[graphy-ring]');
	Graphy_spider.bind('*[graphy-spider]')
};

/*
### Commands ###

gr-grid
gr-grid-ver
gr-grid-hor
gr-colors
gr-points
gr-area-colors
gr-curve
gr-area
gr-spider
gr-curve-weight
gr-shape-size
gr-margin-left
gr-margin-right
gr-margin-top
gr-margin-bottom
gr-padding-left
gr-padding-right
gr-padding-top
gr-padding-bottom
gr-pie-radius
gr-ring-radius
gr-ring-weight

gr-border-weight
gr-border-colors

*/