import os
from flask import request, jsonify, make_response
from flask import Flask, render_template, url_for, template_rendered
from pymongo import MongoClient
import urllib.parse
import json
from bson import json_util, ObjectId
import requests
import csv


# ===========================================
# Connect to MongoDB Atlas
username = urllib.parse.quote_plus('mongo')
password = urllib.parse.quote_plus('mongo')
client = MongoClient(
    'mongodb+srv://%s:%s@cluster0-8yire.mongodb.net/test?retryWrites=true&w=majority' % (username, password))

# Connect to the "nobel" database
db = client.nobel
# ================================


# Create an instance of Flask
app = Flask(__name__)


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    facts = db.facts.find_one()

    # Return template and data
    return render_template("index.html", facts=facts)


@app.route('/prizes')
def prizes():
    docs = []
    for doc in db.prizes.find():
        doc.pop('_id')
        docs.append(doc)
        res = jsonify(docs)

    # with open('prizes.json', 'w') as json_file:
    #     json.dump(docs, json_file)

    return res

# Working!
@app.route('/data')
def get_data():
    prize = db.prizes.find_one()

    data = json.dumps(prize,  default=str)
    return data


# @app.route("/get-data", methods=['GET', 'POST'])
# def returnProdData():
#     f = db.prizes.find_one()

#     return jsonify(f)

# @app.route('/data')
# def get_data():
#     d = db.prizes.find_one()
#     for i in db.prizes.find():
#         return json.dumps(i, indent=4, default=json_util.default)


if __name__ == "__main__":
    app.run(debug=True)


# # ==========================================
# # Insert in MongoDB

# new_student = {
#     'name': "Gena",
#     'role': "456",
#     'field': "tech"
# }

# mycol.insert_one(new_student)
# print(mycol.count_documents({}))

# many_students = [{
#     'name': "Ola",
#     'role': "777",
#     'field': "rock"
# },
#     {
#     'name': "Tana",
#     'role': "888",
#     'field': "home"
# }]

# mycol.insert_many(many_students)
# print(mycol.count_documents({}))

# # =========================================
# # Find all documents
# print(list(mycol.find()))

# #  Find one documents using filter
# print(mycol.find_one({'name': 'Kola'}))


# # =========================================
# # Update documents
# student_update = {
#     'name': 'Ganadiyyyyyyyy'
# }
# # Update one document
# mycol.update_one({'name': 'Gena'}, {'$set': student_update})

# # Update many document
# mycol.update_many({'name': 'Ola'}, {'$set': {'name': 'OLA'}})


# # =========================================
# # Delete  documents

# # # Delete  one document
# # mycol.delete_one({'name': 'Tana'})

# # # Delete  many documents
# # mycol.delete_many({})


# # # =================================
# # # Python JSON to dict

# person = '{"name": "Bob", "languages": ["English", "Fench"]}'
# person_dict = json.loads(person)

# # Output: {'name': 'Bob', 'languages': ['English', 'Fench']}
# print(person_dict)

# # Output: ['English', 'French']
# print(person_dict['languages'])

# # ========================================
# # # Python read JSON file
# # with open('test.json') as f:
# #     data = json.load(f)

# # # Output: {'name': 'Bob', 'languages': ['English', 'Fench']}
# # print(data)


# # =========================================
# # Convert dict to JSON
# person_dict = {'name': 'Bob',
#                'age': 12,
#                'children': None
#                }
# person_json = json.dumps(person_dict)

# f = open("demofile2.json", "a")
# f.write(person_json)
# f.close()

# # Output: {"name": "Bob", "age": 12, "children": null}
# print(person_json)

# # =========================================
# # Writing JSON to a file
# person_dict = {"name": "Bob",
#                "languages": ["English", "Fench"],
#                "married": True,
#                "age": 32
#                }

# with open('person.txt', 'w') as json_file:
#     json.dump(person_dict, json_file)


# # # ==============================
# # # Python pretty print JSON
# # person_string = '{"name": "Bob", "languages": "English", "numbers": [2, 1.6, null]}'

# # # Getting dictionary
# # person_dict = json.loads(person_string)

# # # Pretty Printing JSON string back
# # print(json.dumps(person_dict, indent=4, sort_keys=True))

# # # ===============================================
# # # Get all documents from MongoDB and save them to JSON file


# # # host = "Cluster0-shard-0/cluster0-shard-00-00-8yire.mongodb.net:27017,cluster0-shard-00-01-8yire.mongodb.net:27017,cluster0-shard-00-02-8yire.mongodb.net:27017"
# # # username = "mongo"
# # # password = "mongo"
# # # directory_to_export = "/Users/Lina/DU-Projects/Visualizations-Project"
# # # database = "test_db"
# # # collection = 'test'


# # # all_collections = []


# # # command = "mongoexport --host {} --username {} --password {} --db {} --collection {} --pretty --out {}/{}.json"

# # # os.system(command.format(host, username, password,
# # #                          database, collection, directory_to_export, collection))
