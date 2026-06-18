##_______________________________Learning
# from pymongo import MongoClient
# from dotenv import load_dotenv
# import os

# # Load .env file
# load_dotenv()

# # Mongo URI
# MONGO_URI = os.getenv("MONGO_URI")

# # Connect MongoDB
# client = MongoClient(MONGO_URI)

# # Select Database
# db = client["Jobnest"]

# # Select Collection
# jobs_collection = db["jobs"]


# def insert_job(job):
#     """
#     Insert a single job document
#     """

#     result = jobs_collection.insert_one(job)

#     return result.inserted_id


# def get_all_jobs():
#     """
#     Return all jobs
#     """

#     return list(jobs_collection.find())


# def get_job_by_source_url(source_url):
#     """
#     Find a job using sourceUrl
#     """

#     return jobs_collection.find_one({
#         "sourceUrl": source_url
#     })


# def upsert_job(job):
#     """
#     If sourceUrl exists -> Update
#     Else -> Insert
#     """

#     jobs_collection.update_one(
#         {
#             "sourceUrl": job["sourceUrl"]
#         },
#         {
#             "$set": job
#         },
#         upsert=True
#     )

