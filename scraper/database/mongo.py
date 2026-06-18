from pymongo import MongoClient
from config import MONGO_URI

client = MongoClient(MONGO_URI)

db = client["Jobnest"]

jobs_collection = db["jobs"]


def save_jobs(jobs):

    inserted = 0

    for job in jobs:

        result = jobs_collection.update_one(
            {"sourceUrl": job["sourceUrl"]},
            {"$set": job},
            upsert=True
        )

        if result.upserted_id:
            inserted += 1

    print(f"Inserted {inserted} new jobs")