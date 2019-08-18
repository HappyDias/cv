import os
import json
import pymongo
import datetime
import time
import html

conn_file = open('.env.local', 'r')
conn_file.readline() #First line
conn_str = conn_file.readline() #Second line, the one I want
conn_str = conn_str.split("=")[1]
conn_file.close()

if __name__ == "__main__":
	client = pymongo.MongoClient(conn_str)
	db = client['cv_adias']
	collection = db['tabs']
	tabsPath = os.path.join("data", "tabs")

	collection.create_index([("title", pymongo.ASCENDING), ("date", pymongo.DESCENDING)], name='search_index')
	
	for file in os.listdir(tabsPath):
		tab_name = file.split('.')[0]
		file_ext = file.split('.')[1]
		if file_ext == "json":
			#Setup tab data to insert
			document = {
				"data"  : None,
				"date"  : time.time(),
				"title" : tab_name
			}
			fo = open(os.path.join(tabsPath,file), 'r', encoding='utf-8')
			file_data = json.load(fo)
			fo.close()
			document["data"] = file_data

			#Insert document
			collection.insert_one(document)