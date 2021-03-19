from pymongo import MongoClient

client = MongoClient()

collection_quiz = client.quizdb.quiz

def find_quiz(id):
    return collection_quiz.find_one({'qid': id})
