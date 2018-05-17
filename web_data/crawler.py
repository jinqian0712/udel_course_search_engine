import time
import sqlite3
from bs4 import BeautifulSoup
import urllib
r = urllib.urlopen('https://udapps.nss.udel.edu/CoursesSearch/search-results?term=2188&search_type=A&course_sec=&session=All&course_title=&instr_name=&text_info=All&instrtn_mode=All&time_start_hh=&time_start_ampm=&credit=Any&keyword=&subj_area_code=&college=')
soup = BeautifulSoup(r)
next_herf = soup.find_all("button",{"id": "searchNxtBtn"})
page_url = next_herf[0]["onclick"][15:-2]
prefix = "https://udapps.nss.udel.edu/CoursesSearch/"
page_url = prefix + page_url
conn = sqlite3.connect("class_info.db")
c = conn.cursor()
conn.text_factory = str
i=0
while (page_url != ""):
    herf1 = soup.find_all("a",class_="coursenum")
    for i in range(0,len(herf1)):
        url = prefix+herf1[i]["href"]
        r2 = urllib.urlopen(url)
        soup1 = BeautifulSoup(r2)
        content = str(soup1.find_all("h2",class_="itwd-title"))
        courseName =  content[24:-6]
        if (courseName == "No results"):
            continue
        instructor = soup1.find_all("div",{"id": "instructor"})
        instructor = str(instructor[0])
        schedule = soup1.find_all("div",{"id": "schedule"})
        schedule = str(schedule[0])
        p = soup1.find_all("p")
        credit = str(p[0])[3:-4]
        describe =  str(p[1])
        resource =  soup1.find_all("p",{"id": "resources"})
        resource = str(resource[0])
        for j in range(0,len(p)):
            if (str(p[j]).find("College:") != -1):
                college = str(p[j])
            if (str(p[j]).find("Department:") != -1):
                department = str(p[j])
        c.execute("INSERT INTO courses (courseName, instructor, schedule, credit, resource, college, department, describe,url) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)",
                   (courseName, instructor, schedule, credit, resource, college, department, describe,url))
        conn.commit()
        time.sleep(1)
        i = i + 1
        print i;
        print "\n"
    r = urllib.urlopen(page_url)
    soup = BeautifulSoup(r)
    next_herf = soup.find_all("button",{"id": "searchNxtBtn"})
    if (next_herf[0] != ""):
        page_url = next_herf[0]["onclick"][15:-2]
    else:
        page_url = ""
    prefix = "https://udapps.nss.udel.edu/CoursesSearch/"
    page_url = prefix + page_url
c.close
conn.close()
