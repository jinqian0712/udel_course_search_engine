function search(){
    var $search_key = document.getElementById("major").value;
    document.getElementById("major").value = "";
    if($search_key != ""){
        window.location.href = "../search/?query="+$search_key;
    }
}

function item_click(id){
    var item_value = document.getElementById(id).innerHTML;
    document.getElementById("major").value = item_value;
    search();
}

function searchRecommand(){
    var search_key = document.getElementById("major").value;
    var relv = document.getElementById("rlvn");
    if(search_key != ""){
        var xhr = new XMLHttpRequest();
        xhr.open("POST","../web_code/search_recommend.php",true);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.onload = function(){
            if(this.status == 200){
                var result = JSON.parse(this.response);
                if(result.length!=0){
                    relv.innerHTML = "";
                    relv.style.display = "block";
                    for(var i=0;i<result.length;i++){
                        var result_item = document.createElement("div");
                        result_item.setAttribute("class","items");
                         result_item.setAttribute('id', i);
                        result_item.setAttribute('onclick', "item_click('"+i+"')");
                        result_item.innerHTML = result[i].courseName;
                        relv.appendChild(result_item);
                    }
                }else{
                    relv.style.display = "none";
                }
            }
        };
        xhr.send(JSON.stringify({"search_key":search_key}));
    }
}
function change_items_style(trace,items){
    for(var i=0;i<items.length;i++){
        if(i == trace){
            items[i].style.backgroundColor = "#ececec";
        }else{
            items[i].style.backgroundColor = "white";
        }
    }
}
var trace = -1;
document.getElementById("major").addEventListener('keyup',function(evt){
    var key = evt.keyCode;
    var search_key = document.getElementById("major").value;
    var items = document.getElementsByClassName("items");
    if(key == 38){
        if(items.length != 0){
            if(trace == 0){
                trace = items.length-1;
            }else{
                if(trace == -1){
                    trace = items.length - 1;
                }else{
                    trace = trace - 1;
                }
            }
            change_items_style(trace,items);
        }
    }else if(key == 40){
        if(items.length != 0){
            if(trace == items.length-1){
                trace = 0;
            }else{
                if(trace == -1){
                    trace = 0;
                }else{
                    trace = trace + 1;
                }
            }
            change_items_style(trace,items);
        }
    }else if(key == 13){
        if(items.length !=0 && trace != -1){
            document.getElementById("major").value = items[trace].innerHTML;
            document.getElementById("rlvn").innerHTML = "";
            document.getElementById("rlvn").style.display="none";
            trace = -1;
        }
        search();
    }else{
        searchRecommand();
    }
});

document.body.onclick = function(){
    document.getElementById("rlvn").innerHTML = "";
    document.getElementById("rlvn").style.display="none";
    trace = -1;
};