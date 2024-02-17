
// Payloads

// Dumpers

function load_AppDumper(){
    PLfile = "../Bins/Dumper/appdumper.bin";
    LoadpaylodsGhen20(PLfile);
}

function load_KernelDumper(){
    PLfile = "../Bins/Dumper/kerneldumper.bin";
    LoadpaylodsGhen20(PLfile);
}

function load_VTXDumper(){
    if (firm == "755" || firm == "702" || firm == "672" || firm == "505" ) {
        PLfile = `../Bins/Dumper/ps4-dumper-vtx-${firm}.bin`;
        LoadpaylodsGhen20(PLfile);
    } else {
        PLfile = "../Bins/Dumper/ps4-dumper-vtx-900.bin";
        LoadpaylodsGhen20(PLfile);
    }
}


// Tools

function load_PS4Debug(){
    PLfile = "../Bins/Tools/ps4debug.bin";
    Pay = PLfile;
    LoadpaylodsGhen20(PLfile);
}

function load_App2USB(){
    PLfile = "../Bins/Tools/app2usb.bin";
    Pay = PLfile;
    LoadpaylodsGhen20(PLfile);
}


function load_BackupDB(){
    PLfile = "../Bins/Tools/backupdb.bin";
    LoadpaylodsGhen20(PLfile);
}

function load_RestoreDB(){
    PLfile = "../Bins/Tools/exitidu.bin";
    LoadpaylodsGhen20(PLfile);
}

function load_DisableASLR(){
    PLfile = "../Bins/Tools/disableaslr.bin";
    LoadpaylodsGhen20(PLfile);
}

function load_DisableUpdates(){
    PLfile = "../Bins/Tools/disableupdates.bin";
    LoadpaylodsGhen20(PLfile);
}

function load_EnableUpdates(){
    PLfile = "../Bins/Tools/enbaleupdates.bin";
    LoadpaylodsGhen20(PLfile);
}

function load_ExitIDU(){
    PLfile = "../Bins/Tools/exitidu.bin";
    LoadpaylodsGhen20(PLfile);
}
  
function load_FTP(){
    PLfile = "../Bins/Tools/ftp.bin";
    LoadpaylodsGhen20(PLfile);
}
  
function load_HistoryBlocker(){
    PLfile = "../Bins/Tools/historyblocker.bin";
    LoadpaylodsGhen20(PLfile);
}
  
function load_RIFRenamer(){
    PLfile = "../Bins/Tools/rifrenamer.bin";
    LoadpaylodsGhen20(PLfile);
}
  
function load_Orbis(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/Tools/Orbis-Toolbox-${firm}.bin`;
    LoadpaylodsGhen20(PLfile);
}

function load_WebrRTE(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/Tools/WebRTE_${firm}.bin`;
    LoadpaylodsGhen20(PLfile);
}

function load_ToDex(){
    PLfile = `../Bins/Tools/ToDex.bin`;
    LoadpaylodsGhen20(PLfile);
}


// Linux

function load_Linux(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/Linux/LinuxLoader-${firm}.bin`;

    LoadpaylodsGhen20(PLfile);

}

function load_Linux2gb(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/Linux/LinuxLoader-${firm}-2gb.bin`;
    LoadpaylodsGhen20(PLfile);


}

function load_Linux3gb(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/Linux/LinuxLoader-${firm}-3gb.bin`;

    LoadpaylodsGhen20(PLfile);  

}

function load_Linux4gb(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/Linux/LinuxLoader-${firm}-4gb.bin`;

    LoadpaylodsGhen20(PLfile);  

}

function load_Linux5gb(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/Linux/LinuxLoader-${firm}-5gb.bin`;

    LoadpaylodsGhen20(PLfile);  

}

function load_Linux_720p(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/Linux/LinuxLoader-720-${firm}.bin`;

    LoadpaylodsGhen20(PLfile);

}

function load_Linux2gb_720p(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/Linux/LinuxLoader-720-${firm}-2gb.bin`;
    LoadpaylodsGhen20(PLfile);


}

function load_Linux3gb_720p(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/Linux/LinuxLoader-720-${firm}-3gb.bin`;

    LoadpaylodsGhen20(PLfile);  

}

function load_Linux4gb_720p(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/Linux/LinuxLoader-720-${firm}-4gb.bin`;

    LoadpaylodsGhen20(PLfile);  

}

function load_Linux5gb_720p(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/Linux/LinuxLoader-720-${firm}-5gb.bin`;

    LoadpaylodsGhen20(PLfile);  

}

// Mod Menu

// GTA

function load_GTAArbic(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    if (firm == "755" || firm == "702") {
        PLfile = `../Bins/GTA/gtava1-${firm}.bin`;
        LoadpaylodsGhen20(PLfile);
    } else {
        PLfile = `../Bins/GTA/ArabicGuy-1.0-1.27-rfoodxmodz.bin`;
        LoadpaylodsGhen20(PLfile);
    }
}

function load_GTAArbic3(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    if (firm == "755" || firm == "702") {
        PLfile = `../Bins/GTA/gtava3-${firm}.bin`;
        LoadpaylodsGhen20(PLfile);
    } else {
        PLfile = `../Bins/GTA/ArabicGuy-1.0-1.32-rfoodxmodz.bin`;
        LoadpaylodsGhen20(PLfile);
    }

}

function load_GTAArbic33(){
    PLfile = `../Bins/GTA/ArabicGuy-1.0-1.33-rfoodxmodz.bin`;
    LoadpaylodsGhen20(PLfile);
}

function load_GTAL(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/GTA/gtavl-${firm}.bin`;
    LoadpaylodsGhen20(PLfile);
}

function load_GTABQ(){
    var firm = document.getElementById("cb").value;
    firm = firm.replace('.', '');
    firm = firm.replace("layStation 4/","")
    PLfile = `../Bins/GTA/gtavbq133-${firm}.bin`;
    LoadpaylodsGhen20(PLfile);
}

// RDR2

function load_Oysters100(){
    PLfile = `../Bins/RDR2/OystersMenu-1.00-FREE.bin`;
    LoadpaylodsGhen20(PLfile);
}


function load_Oysters113(){
    PLfile = `../Bins/RDR2/OystersMenu-1.13-FREE.bin`;
    LoadpaylodsGhen20(PLfile);
}

function load_Oysters119(){
    PLfile = `../Bins/RDR2/OystersMenu-1.19-FREE.bin`;
    LoadpaylodsGhen20(PLfile);
}

function load_Oysters124(){
    PLfile = `../Bins/RDR2/OystersMenu-1.24-FREE.bin`;
    LoadpaylodsGhen20(PLfile);
}