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
	collection_tabs = db['tabs']
	collection_info = db['info']
	data_path = "data"
	tabs_path = os.path.join(data_path, "tabs")

	collection_tabs.create_index([("title", pymongo.ASCENDING), ("date", pymongo.DESCENDING)], name='search_index')
	collection_info.create_index([("title", pymongo.ASCENDING), ("date", pymongo.DESCENDING)], name='search_index')
	
	for file in os.listdir(tabs_path):
		tab_name = file.split('.')[0]
		file_ext = file.split('.')[1]
		if file_ext == "json":
			#Setup tab data to insert
			document = {
				"data"  : None,
				"date"  : time.time(),
				"title" : tab_name
			}
			with open(os.path.join(tabs_path,file), 'r', encoding='utf-8') as fo:
				file_data = json.load(fo)
				document["data"] = file_data

			#Insert document
			collection_tabs.insert_one(document)
	with open(os.path.join(data_path,"user_info.json"), 'r') as fo:
		file_data = json.load(fo)
		for idx,field in enumerate(file_data):
			document = field
			document["date"] = time.time()
			collection_info.insert_one(document)