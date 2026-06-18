import requests


def scrape_greenhouse():

    companies = [
        "stripe",
        "notion",
        "discord",
        "datadog"
    ]

    jobs = []

    for company in companies:

        url = f"https://boards-api.greenhouse.io/v1/boards/{company}/jobs"

        try:

            response = requests.get(url, timeout=10)

            if response.status_code != 200:
                print(f"Failed: {company}")
                continue

            data = response.json()

            for job in data["jobs"]:

                jobs.append({
                    "id": f"gh_{job['id']}",
                    "title": job.get("title", ""),
                    "company": company,
                    "location": job.get("location", {}).get("name", ""),
                    "salary": "",
                    "experience": "",
                    "skills": [],
                    "jobType": "",
                    "workMode": "",
                    "source": "Greenhouse",
                    "sourceUrl": job.get("absolute_url", "")
                })

        except Exception as e:
            print(company, e)

    return jobs