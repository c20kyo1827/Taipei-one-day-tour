import os
import json
import sys
PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PARENT_DIR)
from util import mydb_mgr

def parse(file_path):
    dist_set = ["北投區","士林區","中山區","內湖區","大同區","松山區","萬華區","中正區","大安區","信義區","南港區","文山區"]
    attraction = []
    mrt_stop_dict = {}
    with open(file_path, encoding="utf-8") as f:
        data_json = json.load(f)
        for list in data_json["result"]["results"]:
            attraction_row = []
            attraction_row.append(list["name"])
            for dist in dist_set:
                word = list["address"].encode('utf8')[3:].decode('utf8')
                if word.find(dist) != -1:
                    attraction_row.append(dist)
            attraction_row.append(list["longitude"])
            attraction_row.append(list["latitude"])

            tokens = list["file"].lower().split("https")
            img_list = []
            for token in tokens:
                if token.endswith(".mp3") or token.endswith(".flv") or token=="":
                    continue
                img_list.append("https"+token)
            attraction_row.append(img_list)

            attraction.append(attraction_row)

            if list["MRT"] == None: continue
            if list["MRT"] not in mrt_stop_dict:
                mrt_stop_dict[list["MRT"]] = [list["name"]]
            else:
                mrt_stop_dict[list["MRT"]].append(list["name"])
    # print(attraction)
    # print(mrt_stop_dict)

if __name__=="__main__":
    file_path = os.path.join(PARENT_DIR, "data", "taipei-attractions.json")
    parse(file_path)