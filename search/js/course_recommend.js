function recommend(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST","../web_code/coursera.php",true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function(){
        if(this.status == 200){
            var area = document.getElementById("show-r");
            var call_back = JSON.parse(this.response);
            if(call_back.length != 0){
                for(var i=0;i<call_back.length;i++){
                    var item = document.createElement("div");
                    item.setAttribute("class","r-item");
                    item.setAttribute("onclick","go_rurl('"+"https://online.stanford.edu/"+call_back[i][0]+"')");
                    var img_area = document.createElement("div");
                    img_area.setAttribute("class","r-l");
                    var img = document.createElement("img");
                    img.setAttribute("style","width:50px;height:50px");
                    img.src = "https://online.stanford.edu"+call_back[i][2];
                    img_area.appendChild(img);
                    var text_area = document.createElement("div");
                    text_area.setAttribute("class","r-r");
                    var course_name = document.createElement("div");
                    course_name.setAttribute("class","c-n");
                    course_name.innerHTML = call_back[i][3];
                    var department_name = document.createElement("div");
                    department_name.setAttribute("class","d-n");
                    var department = call_back[i][1].replace(/[^a-zA-Z ]/g, "");
                    department = department.substring(1,department.length-1);
                    department_name.innerHTML = department;
                    text_area.appendChild(course_name);
                    text_area.appendChild(department_name);
                    item.appendChild(img_area);
                    item.appendChild(text_area);
                    area.appendChild(item);
                }
            }else{
                document.querySelector(".r-none").style.display="block";
            }
        }
    };
    xhr.send();
}

function go_rurl(url){
    window.open(url);
}
recommend();