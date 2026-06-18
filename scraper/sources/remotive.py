import requests
def scrape_remotive(keyword="python"):

    jobs = []

    url = "https://remotive.com/api/remote-jobs"

    params = {
        "search": keyword
    }

    try:

        response = requests.get(
            url,
            params=params,
            timeout=10
        )

        response.raise_for_status()

        data = response.json()

        for item in data.get("jobs", []):

            job = {
                "title": item.get("title", ""),
                "company": item.get("company_name", ""),
                "location": item.get(
                    "candidate_required_location",
                    ""
                ),
                "salary": item.get("salary", ""),
                "experience": "",
                "skills": item.get("tags", []),
                "jobType": item.get("job_type", ""),
                "workMode": "Remote",
                "source": "Remotive",
                "sourceUrl": item.get("url", "")
            }

            jobs.append(job)

    except Exception as e:
        print("Error:", e)

    return jobs