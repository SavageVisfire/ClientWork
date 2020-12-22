import pandas as pd
import requests
import csv
import os
import re
from bs4 import BeautifulSoup
def extract_number(f):
    f = f[0:-4]
    s = re.findall("\d+$",f)
    return (int(s[0]) if s else -1,f)
headers = requests.utils.default_headers()
headers.update({
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
})
def GetData(number):
    SavedData = os.listdir(".\\user_data")
    BigNum = extract_number(max(SavedData,key=extract_number))
    BigNum = BigNum[0]
    URL = "https://www.goodreads.com/review/list_rss/"+str(number)+"?shelf=read"
    page = requests.get(URL,headers = headers)
    soup = BeautifulSoup(page.content, 'html.parser')
    books = soup.findAll("item")
    for book in books:
        title = book.find("title").text
        StarsRated = book.find("user_rating").text
        ReviewText = book.find("user_review").text
        DateAdded = book.find("user_date_added").text
        DateRead = book.find("user_read_at").text
        bookid = book.find("book_id").text
        bookUrl = "https://www.goodreads.com/book/show/" + str(bookid)
        Bookpage = requests.get(bookUrl,headers = headers)
        bookSoup = BeautifulSoup(Bookpage.content,"html.parser")
        TRUEISBN = "N/A"
        TRUEISBN13 = "N/A"
        try:
            isbns = bookSoup.findAll("div",class_="clearFloats")
            for isbn in isbns:
                twoISBN = isbn.findAll(class_ = "infoBoxRowTitle")
                for iisbn in twoISBN:    
                    if iisbn.text == "ISBN":
                        TRUEISBN = isbn.find(class_="infoBoxRowItem").text.strip()
                        TRUEISBN13= TRUEISBN.split('(')
                        TRUEISBN = TRUEISBN[0:10]
                        TRUEISBN13 = TRUEISBN13[1][8:21]
                        break
        except:
            pass
        df = pd.DataFrame({"Title":title,"Stars Given":StarsRated,"Review":ReviewText,"Date Added":DateAdded,"Date Read":DateRead,"Book ID": bookid,"User ID":number,"ISBN":TRUEISBN,"ISBN13":TRUEISBN13},index =[number])
        print(df)
        #data = df.to_csv(sep='\t')
        size = os.stat(".\\user_data\\output"+str(BigNum)+".tsv").st_size
        if size > 1000000:
            df.to_csv('.\\user_data\\output'+ str(BigNum + 1) + '.tsv',sep = "\t",mode = 'a')
            BigNum = BigNum + 1
        else:
            df.to_csv('.\\user_data\\output'+ str(BigNum) + '.tsv',sep = "\t",mode = 'a')
StartNumber = input("Starting User ID: ")
EndingNumber = input("Ending User ID or type no: ")
if EndingNumber != "no":
    number = int(StartNumber)
    while number < int(EndingNumber):
        GetData(number)
        number = number + 1
else:
    number = int(StartNumber)
    while True:
        GetData(number)
        number = number + 1