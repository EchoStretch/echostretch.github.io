var ip=null;
var listUrl = "./list.json";
var PS4RTE = function(ip){
this.base = "http://" + ip + ":771/";
	this.GetProcessList = function(callback, failure){
		return $.get(this.base + "list", callback).fail(failure);
	};
	this.GetProcessInfo = function(pid, callback, failure){
		return $.get(this.base + "info?pid=" + pid, callback).fail(failure);
	};
	this.GetProcessMaps = function(pid, callback, failure){
		return $.get(this.base + "mapping?pid=" + pid, callback).fail(failure);
	};
	this.ReadMemory = function(pid, address, length, callback, failure){
		return $.get(this.base + "read?pid=" + pid + "&address=" + address + "&length=" + length, callback).fail(failure);
	};
	this.WriteMemory = function(pid, address, data, length, callback, failure){
		return $.get(this.base + "write?pid=" + pid + "&address=" + address + "&data=" + data + "&length=" + length, callback).fail(failure);
	};
	this.AllocateMemory = function(pid, length, callback, failure){
		return $.get(this.base + "alloc?pid=" + pid + "&length=" + length, callback).fail(failure);
	};
	this.FreeMemory = function(pid, address, length, callback, failure){
		return $.get(this.base + "free?pid=" + pid + "&address=" + address + "&length=" + length, callback).fail(failure);
	};
	this.PauseProcess = function(pid, callback, failure){
		return $.get(this.base + "pause?pid=" + pid, callback).fail(failure);
	};
	this.ResumeProcess = function(pid, callback, failure){
		return $.get(this.base + "resume?pid=" + pid, callback).fail(failure);
	};
	this.Notify = function(messageType, message, callback, failure){
		return $.get(this.base + "notify?messageType=" + messageType + "&message=" + btoa(message + "\x00"), callback).fail(failure);
	};
};

var ProcessList		= null;
var ProcessInfo		= null;
var ProcessMaps		= null;
var SelectedProcess	= null;
var PS4 = null;

function FailCallback(){
if (typeof ProcessList.reject == 'function') {ProcessList.reject();}
ProcessInfo.reject();
ProcessMaps.reject();
}

function GetProcessListCallback(data){
ProcessList.resolve(data);
}

function GetProcessInfoCallback(data){
ProcessInfo.resolve(data);
}

function GetProcessMapsCallback(data){
ProcessMaps.resolve(data);
}

function HexStringToBase64(str){
var result = [];
	while (str.length >= 2)
	{
	result.push(parseInt(str.substring(0, 2), 16));
	str = str.substring(2);
	}
return btoa(String.fromCharCode.apply(null, new Uint8Array(result)));
}

function zeroFill(number, width, swap){
width -= number.toString().length;
	if (width > 0) {
	return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
	}
	if(swap)
	{
	number = number.match(/.{2}/g);
	number = number.reverse().join("");
	}
return number + ""; // always return a string
}

function GetNthEntry(n){
if(ProcessMaps != null){return ProcessMaps[n].start;}
return null;
}

function FindBase(){
var base = null;
ProcessMaps.some(function(entry){
	if(entry.name === "executable" && entry.prot === 5){
	base = entry;
	return true;
	}
	return false;
});
	if(base != null){
	return base.start;
	}
	return null;
}

function FindProcess(name){
var proc = null;
	ProcessList.some(function(process){
	if(process.name === name)
	{
	proc = process;
	return true;
	}
	return false;
	});
	return proc;
}

function FillDialog(cheat, index){
var name = cheat.name;
var content;
var index = index;
if (MatchingGame=="yes"){
	var CheatOffset = cheat.memory[0].offset;
	var JsonCheatONvalue = HexStringToBase64(cheat.memory[0].on);
	var CheatBase = bigInt(FindBase());
	var CheatPID = SelectedProcess.pid;
	var CheatAddress = (CheatBase.add(parseInt(cheat.memory[0].offset,16)));
	var CheatLength = cheat.memory[0].on.length / 2;
	var leefulURL = "http://127.0.0.1:771/read?pid="+CheatPID+"&address="+CheatAddress+"&length="+CheatLength;
	var req = new XMLHttpRequest();
	switch(cheat.type)
	{
	case "checkbox":
		content = $('<div><label class="switch"><input class="chbox" id="' + index + '" type="checkbox"><span tabindex="1" class="slider"></span></label>' + name + '<script></script></div>');
		break;
	case "button":
		content = $('<div><label class="switch"><button tabindex="1" class="btn btn-primary" id="'+ index +'" type="button">'+ name +'</button></label></div>');
		break;
	}
	req.open("GET", leefulURL, true);
	req.send();
	req.onreadystatechange = function () {
	if (req.readyState == 4){
		if(JsonCheatONvalue==req.response){
		document.getElementById(index).checked = true;
		};
	}
	};
} else {
	switch(cheat.type)
	{
	case "checkbox":
		content = $('<div><label class="switch"><input disabled class="chbox" id="' + index + '" type="checkbox"><span tabindex="1" class="slider2"></span></label>' + name + '</div>');
		break;
	case "button":
		content = $('<div><label class="switch"><button tabindex="1" class="btn btn-primary" id="'+ index +'" type="button">'+ name +'</button></label></div>');
	break;
	}
}	
$("#mods").append(content);
$(".btn-danger").click(enableNAV);
}

function WriteMemory(memory, activated){
var base = null;
    if(memory.section === undefined || memory.section === 0){base = bigInt(FindBase());}
    else {base = bigInt(GetNthEntry(memory.section));}
var offset = bigInt(memory.offset, 16);
var address = (base.add(offset));
var hex;
    if (activated){hex = memory.on;}
    else {hex = memory.off;}
var data = HexStringToBase64(hex);
var length = hex.length / 2;
PS4.WriteMemory(SelectedProcess.pid, address.toString(10), data, length);
}

function HandleMasterCode(master, cheats){
PS4.AllocateMemory(SelectedProcess.pid, 0x1, function(data){
	if(master.challenged === undefined || master.challenged !== "yes")
	{
	var address =  bigInt(data.address).plus(8).toString(16);
	address = zeroFill(address, 16, true);
	cheats.forEach(function(cheat){
		cheat.memory.forEach(function(mem)
		{
		mem.on = mem.on.replace("{ALLOC}", address);
		});
	});
	master.memory.forEach(function(element){
	element.on = element.on.replace("{ALLOC}", address);
	});
	}
	master.memory.forEach(function(element)
	{
	WriteMemory(element, true);
	});
});
}

function HookMod(mod, index){
	var name = mod.name;
	var memory = mod.memory;
	switch(mod.type)
	{
	case "checkbox":
		$('#' + index).change(function() {
			var activated = this.checked;
			PS4.PauseProcess(SelectedProcess.pid, null, function(){
				if (memory.length !== undefined){
				memory.forEach(function(element, index){WriteMemory(element, activated);});
				PS4.ResumeProcess(SelectedProcess.pid);
				if (activated){PS4.Notify(222, name + ' | Enabled ');}
				else {PS4.Notify(222, name + ' | Disabled ');}
				}
			});
		});
	break;
	case "button":
		$('#' + index).click(function()
		{
			PS4.PauseProcess(SelectedProcess.pid, null, function()
				{
				if (memory.length !== undefined){
				memory.forEach(function(element, index){WriteMemory(element, true);});
				PS4.ResumeProcess(SelectedProcess.pid);
				PS4.Notify(222, name + ' | Enabled ');
				}
			});
		});
	break;
	}
}

function HandleTrainer(mods){
var good = true;
    if (SelectedProcess == null || typeof ProcessMaps.state == 'function' || typeof ProcessInfo.state == 'function') {
		if (sessionStorage.runningCUSA!=null){Message.innerHTML="<font color=#dc3545>CHEATS DISABLED!</font><br>This Is The Wrong Trainer For The Game That Is Running"}
        else {Message.innerHTML="<font color=#dc3545>TRAINER NOT ATTACHED!</font><br>Is The WebRTE Payload Loaded? Is A Game Running?";}
        good = false;
    }
    if (mods.length !== undefined)
    {
        mods.forEach(function(mod, index){
			FillDialog(mod,index);
            if(good){HookMod(mod, index);}
        });
    }
    if(good) {
		if (MatchingGame=="yes"){
        $("#Message").text("Trainer Attached. Select Your Cheats ...");
        //PS4.Notify(222, "Trainer Attached Successfully \nSelect Any Cheats You Require");
		}
    }
$("#trainer-dialog").modal("show");
HideLDR();
}

function CreateCard(trainer){
var cardTemplate = [
'<div class="trainer-card d-flex flex-wrap" source="'+trainer.url+'">',
	'<div class="TRNimg" tabindex="0">',
		'<img class="coverholder lazy" onerror="this.src=\'./css/error.png\';" data-src="./games/'+trainer.title+'.jpg">',
	'</div>',
	'<div class="TRNinfo">',
		'<div><small class="game">'+trainer.name+'</small></div>',
		'<div><small class="cusa">'+trainer.title+'</small></div>',
		'<div><small class="version"> v'+trainer.version+'</small></div>',
	'</div>',
'</div>'
];
return $(cardTemplate.join(''));
}

function ShowALL(data){//Sort By Newest order
	data.games.sort(function(a,b){//Sort By CUSA order
		if (a.name.toUpperCase() > b.name.toUpperCase()){return 1;}
		else if(a.name.toUpperCase() < b.name.toUpperCase()){return -1;}    
		return 0; 
	});
	container.innerHTML="";
	$.each(data.games, function(i, trainer){
		var card = CreateCard(trainer);
		$('#container').append(card);
	});	
	$(".trainer-card").click(TrainerClickCallback);
observer.update();
Sza.style.display="block";Saz.style.display="none";
sessionStorage.currentSort="null";
document.getElementById('search-input').value = '';
totalALL=$('div.trainer-card').length;tot1.innerHTML=totalALL;
}

function SortNEW(data){//Sort By Newest order
	data.games.sort(function(a,b){   
		return (+b < +a ? 1 : -1); 
	});
	container.innerHTML="";
	$.each(data.games, function(i, trainer){
		var card = CreateCard(trainer);
		$('#container').append(card);
	});	
	$(".trainer-card").click(TrainerClickCallback);
observer.update();
Sza.style.display="none";Saz.style.display="block";
sessionStorage.currentSort="null";
document.getElementById('search-input').value = '';
totalALL=$('div.trainer-card').length;tot1.innerHTML=totalALL;
}

function SortAZ(data){
	data.games.sort(function(a,b){//Sort By CUSA order
		if (a.name.toUpperCase() > b.name.toUpperCase()){return 1;}
		else if(a.name.toUpperCase() < b.name.toUpperCase()){return -1;}    
		return 0; 
	});
	container.innerHTML="";
	$.each(data.games, function(i, trainer){
		var card = CreateCard(trainer);
		$('#container').append(card);
	});	
	$(".trainer-card").click(TrainerClickCallback);
observer.update();
Saz.style.display="none";Sza.style.display="block";
sessionStorage.currentSort="null";
document.getElementById('search-input').value = '';
totalALL=$('div.trainer-card').length;tot1.innerHTML=totalALL;
}

function SortZA(data){
	data.games.sort(function(a,b){//Sort By CUSA order
		if (a.name.toUpperCase() < b.name.toUpperCase()){return 1;}
		else if(a.name.toUpperCase() > b.name.toUpperCase()){return -1;}    
		return 0; 
	});
	container.innerHTML="";
	$.each(data.games, function(i, trainer){
		var card = CreateCard(trainer);
		$('#container').append(card);
	});	
	$(".trainer-card").click(TrainerClickCallback);
observer.update();
Sza.style.display="none";Saz.style.display="block";
sessionStorage.currentSort="null";
document.getElementById('search-input').value = '';
totalALL=$('div.trainer-card').length;tot1.innerHTML=totalALL;
}

function SortCUSA(data){
if (sessionStorage.currentSort!="cusa"){sessionStorage.currentSort="cusa";
	data.games.sort(function(a,b){//Sort By CUSA order 0 > 9
		if (a.title.toUpperCase() > b.title.toUpperCase()){return 1;}
		else if(a.title.toUpperCase() < b.title.toUpperCase()){return -1;}    
		return 0; 
	});
}
else {sessionStorage.currentSort="null";
	data.games.sort(function(a,b){//Sort By CUSA order 9 > 0
		if (a.title.toUpperCase() < b.title.toUpperCase()){return 1;}
		else if(a.title.toUpperCase() > b.title.toUpperCase()){return -1;}    
		return 0; 
	});	
}
container.innerHTML="";
$.each(data.games, function(i, trainer){
var card = CreateCard(trainer);
$('#container').append(card);
});	
$(".trainer-card").click(TrainerClickCallback);
observer.update();
if(Saz.style.display!="block")Sza.style.display="none";Saz.style.display="block";
document.getElementById('search-input').value = '';
totalALL=$('div.trainer-card').length;tot1.innerHTML=totalALL;
}

function ListCallback(data){
	data.games.sort(function(a,b){//Sort By Name A > Z
		if (a.name.toUpperCase() > b.name.toUpperCase()){return 1;}
		else if(a.name.toUpperCase() < b.name.toUpperCase()){return -1;}    
		return 0; 
	});
	$.each(data.games, function(i, trainer){
		var card = CreateCard(trainer);
		$('#container').append(card);
	}); 
totalALL=$('div.trainer-card').length;tot1.innerHTML=totalALL;
}

function TrainerClickCallback(){
ShowLDR();
disableNAV();
    var trainerUrl = $(this).attr('source');
	var cusa = $(this).find(".cusa").text();	
if (sessionStorage.TrainerAvailable=="yes"){ip="127.0.0.1";}
if (cusa!=sessionStorage.runningCUSA){ip=null;}
    PS4 = new PS4RTE(ip);   
    $("#cover").attr('data-src', "./games/" + cusa + ".jpg");
    observer.load($("#cover").get(0), true);
    ProcessList		= $.Deferred();
    ProcessInfo		= $.Deferred();
    ProcessMaps		= $.Deferred();
    SelectedProcess	= null;	
if(cusa==sessionStorage.runningCUSA){MatchingGame="yes";}else{MatchingGame="no";}
    $.get(trainerUrl, function(data){
        var mods = data.mods;
        $("#game").attr('process', data.process).text(data.name);
        $("#cusa").text(data.id);
        $("#version").text('v' + data.version);
        $("#credits").text(data.credits);
        $("#mods").empty();
        PS4.GetProcessList(GetProcessListCallback, FailCallback);
        $.when(ProcessList).done(function (v1){
            ProcessList = v1;
            SelectedProcess = (FindProcess(data.process));
            PS4.GetProcessMaps(SelectedProcess.pid, GetProcessMapsCallback, FailCallback);
            PS4.GetProcessInfo(SelectedProcess.pid, GetProcessInfoCallback, FailCallback);
            $.when(ProcessMaps, ProcessInfo).done(
                function(v2 , v3){
                    ProcessMaps = v2;
                    ProcessInfo = v3;
                    var master = data.master;
                    if(master !== undefined && master.memory.length !== undefined && v1 != null){HandleMasterCode(master, mods);}
                }).always(function(){HandleTrainer(mods)});
        }).fail(function(){HandleTrainer(mods)});
    });
}

function SearchFromForm(){
    var input = $("#search-input").val().toLowerCase();
    $(".trainer-card").each(function(){
		if(input.startsWith("cusa"))var source = $(this).find("small").eq(1).html().toLowerCase();
		else var source = $(this).find("small").eq(0).html().toLowerCase();
        $(this).removeClass("d-flex");
        $(this).removeClass("d-flex");
        if (source.indexOf(input) > -1){
			$(this).addClass("d-flex");
            $(this).show();
        }
        else {$(this).hide();}
    });
observer.update();
totalSRCH=$('div.d-flex').length-2;tot1.innerHTML=totalSRCH;
sessionStorage.currentSort="null";
}

function SearchRunningGame(){
var input = sessionStorage.runningCUSA.toLowerCase();
	$(".trainer-card").each(function(){
	var source = $(this).find(".cusa").eq(0).html().toLowerCase();
	$(this).removeClass("d-flex");$(this).removeClass("d-flex");
	if (source.indexOf(input) > -1){$(this).addClass("d-flex");$(this).show();}
	else {$(this).hide();}
    });
observer.update();
trainerYN = $('div.d-flex').length-2;tot1.innerHTML=trainerYN;
if(trainerYN==0){
	alert("Sorry, There Are Currently No Trainers Available For This Game");
	document.getElementById('search-input').value = '';
	SearchFromForm();}
if(trainerYN!=0){sessionStorage.TrainerAvailable="yes";}
}

function GetRunningCUSA(){
PS4 = new PS4RTE("127.0.0.1");
ProcessList		= $.Deferred();
ProcessInfo		= $.Deferred();
ProcessMaps		= $.Deferred();
SelectedProcess	= null;	
PS4.GetProcessList(GetProcessListCallback, FailCallback);
	$.when(ProcessList).done(function (pl){
		ProcessList = pl;
		$(ProcessList).each(function(ix,process){	
	var defer = PS4.GetProcessInfo(process.pid, GetProcessInfoCallback, FailCallback),filtered = defer.then(function (pi){
	var tid = pi.titleid.trim();
		if(tid.startsWith("CUSA")){
		sessionStorage.runningCUSA=tid;
		gameSTAT.innerHTML="Running Game ID: "+tid;
		setTimeout(SearchRunningGame,50);}
	});
});
}).fail(function(){sessionStorage.WebRTE="no";rteSTAT.innerHTML="WebRTE Payload: <font color=#dc3545>Not Loaded";});
setTimeout(WebRTEchecker,3000);
}

var observer;
$(document).ready(function(){
    $.get(listUrl, ListCallback).then(function(){
        $("#search-input").on("keyup", SearchFromForm);
        $(".trainer-card").click(TrainerClickCallback);
        observer = new LazyLoad({elements_selector: ".lazy",to_webp: false});
    });
GetRunningCUSA();
setTimeout(function(){if(sessionStorage.runningCUSA==null){gameSTAT.innerHTML="Running Game ID: <font color=#dc3545>None Running";}},2000);
});
