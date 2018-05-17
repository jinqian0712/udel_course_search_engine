import time
import sqlite3
from bs4 import BeautifulSoup
import urllib
import json
import sys
url = sys.argv[1]
page_url = url
herf1 = urllib.urlopen(page_url)
soup = BeautifulSoup(herf1)
herf = soup.find_all("a",class_="node node--type-course")
name = soup.find_all("div",class_="field title")
prefix = "https://online.stanford.edu"
img = []
courseName = []
call_back =  [[] for _ in range(len(herf))]
for i in range(0,len(herf)):
    call_back[i].append(str(herf[i]["href"]))
    img_div = herf[i].find_all("div",class_="field field-media")
    img.append(herf[i].find_all("img"))
    department = herf[i].find_all("h4")
    call_back[i].append(str(department))
    courseName.append(name[i].find_all("h3"))
    call_back[i].append(str(img[i][0]["src"]))
    call_back[i].append(str(courseName[i][0]))

print json.dumps(call_back)