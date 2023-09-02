import os
import json
import sys
PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PARENT_DIR)
from util import mydb_mgr

def parse(file_path):
    attraction_dict = {}
    mrt_stop_dict = {}
    with open(file_path, encoding="utf-8") as f:
        data_json = json.load(f)
        for list in data_json["result"]["results"]:
            attraction_dict["id"] = list["_id"]
            attraction_dict["name"] = list["name"]
            attraction_dict["category"] = list["CAT"]
            attraction_dict["description"] = list["description"]
            attraction_dict["address"] = list["address"]
            attraction_dict["mrt"] = list["MRT"]
            attraction_dict["lng"] = list["longitude"]
            attraction_dict["lat"] = list["latitude"]

            tokens = list["file"].lower().split("https")
            img_list = []
            for token in tokens:
                if token.endswith(".mp3") or token.endswith(".flv") or token=="":
                    continue
                img_list.append("https"+token)
            attraction_dict["images"] = img_list

            if list["MRT"] == None: continue
            if list["MRT"] not in mrt_stop_dict:
                mrt_stop_dict[list["MRT"]] = [list["name"]]
            else:
                mrt_stop_dict[list["MRT"]].append(list["name"])

if __name__=="__main__":
    file_path = os.path.join(PARENT_DIR, "data", "taipei-attractions.json")
    parse(file_path)
    flow = mydb_mgr()
    flow.reset()
    flow.show()