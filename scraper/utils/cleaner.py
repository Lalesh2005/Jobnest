def clean_job(job):

    job["title"] = job["title"].strip()

    job["company"] = job["company"].strip()

    job["location"] = job["location"].strip()

    if job["salary"] is None:
        job["salary"] = ""

    return job