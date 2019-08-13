import os
import json
import pymongo
import datetime
import time

conn_file = open('mdb_str.txt', 'r')
conn_str = conn_file.readline()
conn_file.close()

if __name__ == "__main__":
	client = pymongo.MongoClient(conn_str)
	db = client['cv_adias']
	collection = db['tabs']
	
	for file in os.listdir('tabs'):
		tab_name = file.split('.')[0]
		file_ext = file.split('.')[1]
		if file_ext == 'json':
			#Setup tab data to insert
			document = {
				"data"  : None,
				"date"  : time.time(),
				"title" : tab_name
			}
			fo = open(os.path.join('tabs',file))
			file_data = json.load(fo)
			fo.close()
			document["data"] = file_data

			#Insert document
			collection.insert_one(document)