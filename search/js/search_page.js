function title_info(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST","../web_code/search_page_info.php",true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function(){
        if(this.status == 200){
            var call_back = JSON.parse(this.response);
            document.getElementById("pageTitle").innerHTML = call_back.title;
            document.getElementById("major").value = call_back.title;
            document.getElementById("none-query").innerHTML = call_back.title;
            document.getElementById("none-query-1").innerHTML = call_back.title;
        }
    };
    xhr.send();
}

function show_result(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST","../web_code/display_doc.php",true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function(){
        if(this.status == 200){
            var area = document.getElementById("display-doc");
            var call_back = JSON.parse(this.response);
            var len = call_back.length;
            if(len != 0){
                var previousCourseName = "            ";
                var previousLen = previousCourseName.length;
                for(var i=0;i<len;i++){
                    var courseName = call_back[i].courseName;
                    var nameLen = courseName.length;
                    if(courseName.substring(10,nameLen) == previousCourseName.substring(10,previousLen)){
                        var releative = document.createElement("div");
                        releative.setAttribute("class","relative");
                        var name = document.createElement("div");
                        name.setAttribute("class","r-n");
                        var direct_url = call_back[i].url;
                        name.setAttribute("onclick","go_doc_page('"+direct_url+"')");
                        name.innerHTML = courseName;
                        var department = document.createElement("div");
                        department.setAttribute("class","r-d");
                        department.innerHTML = call_back[i].department;
                        releative.appendChild(name);
                        releative.appendChild(department);
                        doc.appendChild(releative);
                    }else{
                        var doc = document.createElement("div");
                        doc.setAttribute("class","doc");
                        var direct_url = call_back[i].url;
                        var name = document.createElement("div");
                        name.setAttribute("class","name");
                        name.setAttribute("onclick","go_doc_page('"+direct_url+"')");
                        name.innerHTML = call_back[i].courseName;
                        var url = document.createElement("div");
                        url.setAttribute("class","url");
                        url.innerHTML = direct_url;
                        var discription = document.createElement("div");
                        discription.setAttribute("class","discription");
                        var describe_text = call_back[i].describe;
                        var dis_cotent = describe_text.substring(0,265) + "..." + "</p>";
                        discription.innerHTML = dis_cotent;
                        var instructor = document.createElement("div");
                        instructor.setAttribute("class","instructor");
                        var img = document.createElement("img");
                        img.setAttribute("src","../img/mailto.png");
                        instructor.appendChild(img);
                        instructor.innerHTML = instructor.innerHTML + call_back[i].instructor;
                        doc.appendChild(name);
                        doc.appendChild(url);
                        doc.appendChild(discription);
                        doc.appendChild(instructor);
                        area.appendChild(doc);
                    }
                    previousCourseName = courseName;
                    previousLen = previousCourseName.length;
                }
            }else{
                document.querySelector(".none").style.display = "block";
            }
        }
    };
    xhr.send();
}

function go_doc_page(url){
    window.open(url);
};

title_info();
show_result();