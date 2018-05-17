function show_result(id){
    console.log("1");
    var doc = document.getElementsByClassName("doc");
    var name = document.getElementsByClassName("name");
    var courseNum;
    if(id == 1){
        for(var i=0;i<doc.length;i++){
            courseNum = name[i].innerHTML.substr(3,1);
            console.log(courseNum);
            //if(name[i].innerHTML)
        }
    }
}

function filter(id){
    var doc = document.getElementsByClassName("doc");
    var name = document.getElementsByClassName("name");
    var courseNum;
    if(id == 1){
        document.getElementById("select-icon-graduate").style.borderBottom = "3px solid #b1afaf";
        document.getElementById("select-icon-graduate").style.fontWeight = "normal";
        document.getElementById("select-icon-undergraduate").style.borderBottom = "3px solid #b1afaf";
        document.getElementById("select-icon-undergraduate").style.fontWeight = "normal";
        document.getElementById("select-icon-all").style.borderBottom = "3px solid #3f6f94";
        document.getElementById("select-icon-all").style.fontWeight = "bolder";
        for(var i=0;i<doc.length;i++){
            doc[i].style.display = "block";
        }
    }else if(id == 2){
        document.getElementById("select-icon-all").style.borderBottom = "3px solid #b1afaf";
        document.getElementById("select-icon-all").style.fontWeight = "normal";
        document.getElementById("select-icon-undergraduate").style.borderBottom = "3px solid #b1afaf";
        document.getElementById("select-icon-undergraduate").style.fontWeight = "normal";
        document.getElementById("select-icon-graduate").style.borderBottom = "3px solid #3f6f94";
        document.getElementById("select-icon-graduate").style.fontWeight = "bolder";
        for(var i=0;i<doc.length;i++){
            courseNum = name[i].innerHTML.substr(4,1);
            if(courseNum<6){
                doc[i].style.display = "none";
            }else{
                doc[i].style.display = "block";
            }
        }
    }else if(id == 3){
        document.getElementById("select-icon-all").style.borderBottom = "3px solid #b1afaf";
        document.getElementById("select-icon-all").style.fontWeight = "normal";
        document.getElementById("select-icon-graduate").style.borderBottom = "3px solid #b1afaf";
        document.getElementById("select-icon-graduate").style.fontWeight = "normal";
        document.getElementById("select-icon-undergraduate").style.borderBottom = "3px solid #3f6f94";
        document.getElementById("select-icon-undergraduate").style.fontWeight = "bolder";
        for(var i=0;i<doc.length;i++){
            courseNum = name[i].innerHTML.substr(4,1);
            if(courseNum<6){
                doc[i].style.display = "block";
            }else{
                doc[i].style.display = "none";
            }
        }
    }
}