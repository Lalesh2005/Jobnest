def remove_duplicates(jobs):

    seen = set()
    unique_jobs = []

    for job in jobs:

        unique_key = (
            job.get("title"),
            job.get("company"),
            job.get("sourceUrl")
        )

        if unique_key not in seen:
            seen.add(unique_key)
            unique_jobs.append(job)

    return unique_jobs