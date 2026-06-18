# from scrapers.indeed import scrape_indeed
# from mongo import upsert_job


# def main():

#     print("Starting JobNest Scraper...\n")

#     jobs = scrape_indeed()

#     print(f"Found {len(jobs)} jobs\n")

#     for job in jobs:
#         try:
#             upsert_job(job)
#             print(f"Saved: {job['title']}")
#         except Exception as e:
#             print(f"Error Saving Job: {e}")

#     print("\nScraping Completed")


# if __name__ == "__main__":
#     main()


# import requests
# url = "https://www.youtube.com/"
# response= requests.get(url)
# print(response.text)

## Practice
# import requests 
# from bs4 import BeautifulSoup
# url = "https://aeon.co/essays"
# headers=headers = {
#     "User-Agent":
#     "Mozilla/5.0"
# }
# response = requests.get(
#     url,
#     headers = headers,
#     timeout =10
#                         )
# soup = BeautifulSoup(
#      response.text,
#     "html.parser"
# )
# # print(soup.prettify())
# cards = soup.select(".group\\/card")
# for card in cards:
#     title = card.select_one(
#         "p.font-bold")
#     print(title.text.strip())

# ___________________________aeonmedia extraction learning through the graphql.
# import requests

# url = "https://api.aeonmedia.co/graphql"

# payload = {
#     "operationName": "getAeonArticlesByType",
#     "variables": {
#         "type": ["essay"],
#         "sortField": "published_at",
#         "afterCursor": None
#     },
#     "query": """
#     query getAeonArticlesByType(
#       $type: [ArticleTypeEnum!],
#       $sortField: ArticleSortEnum = published_at,
#       $afterCursor: String,
#       $tag: String
#     ) {
#       articles(
#         site: aeon
#         type: $type
#         status: [published]
#         tag: $tag
#         sort: {field: $sortField, order: desc}
#         after: $afterCursor
#         first: 12
#       ) {
#         nodes {
#           title
#           slug
#           authors {
#             name
#           }
#         }
#         pageInfo {
#           hasNextPage
#           endCursor
#         }
#       }
#     }
#     """
# }

# response = requests.post(
#     url,
#     json=payload
# )

# data = response.json()

# #print(data)

# # articles = data["data"]["articles"]["nodes"]

# # for article in articles:

# #     print(article["title"])

# #     print(article["authors"][0]["name"])

# #     print("-----")

# cursor = None

# while True:

#     payload["variables"]["afterCursor"] = cursor

#     response = requests.post(
#         url,
#         json=payload
#     )

#     data = response.json()

#     articles = data["data"]["articles"]["nodes"]

#     for article in articles:
#         print(article["title"])

#     page_info = data["data"]["articles"]["pageInfo"]

#     if not page_info["hasNextPage"]:
#         break

#     cursor = page_info["endCursor"]

# _________________________________________________________________________________

# niche hum wellfound par job search karne ki koshish kar rahe the but nahi hua kya dikkat thaa ki website ko laga 
# ki mai real browser nahi hu toh nahi access denied ho gya graphql use nahi aa paaya idhar toh ab playwright sikhna parega
# __________________________________________________________________________________
# import requests
# import json

# url = "https://wellfound.com/graphql"

# payload = {
#     "operationName": "JobSearchResultsX",

#     "variables": {
#         "filterConfigurationInput": {
#             "page": 1,
#             "locationTagIds": ["408065"],
#             "remotePreference": "REMOTE_OPEN",
#             "salary": {
#                 "min": None,
#                 "max": None
#             },
#             "equity": {
#                 "min": None,
#                 "max": None
#             },
#             "yearsExperience": {
#                 "min": None,
#                 "max": None
#             }
#         }
#     },

#     "extensions": {
#         "operationId": "tfe/5f366cd305b4f13cf6098df75f7ff2bb92fa42b9a74cb3a3aec7bdc69c6b051e"
#     }
# }

# headers = {
#     "Content-Type": "application/json",
#     "User-Agent": "Mozilla/5.0"
# }

# response = requests.post(
#     url,
#     json=payload,
#     headers=headers
# )

# print("Status Code:", response.status_code)
# print(response.text[:1000])

# data = response.json()

# # DEBUG
# # print(json.dumps(data, indent=2))

# edges = data["data"]["startupResults"]["edges"]

# for edge in edges:

#     company = edge["node"]

#     company_name = company.get("name", "Unknown Company")

#     jobs = company.get(
#         "highlightedJobListings",
#         []
#     )

#     for job in jobs:

#         print("\n" + "=" * 60)

#         print("TITLE      :", job.get("title"))

#         print("COMPANY    :", company_name)

#         print(
#             "SALARY     :",
#             job.get("compensation", "Not Mentioned")
#         )

#         print(
#             "JOB TYPE   :",
#             job.get("jobType")
#         )

#         print(
#             "REMOTE     :",
#             job.get("remote")
#         )

#         print(
#             "ROLE       :",
#             job.get("primaryRoleTitle")
#         )

#         print(
#             "JOB ID     :",
#             job.get("id")
#         )

#         print(
#             "URL        :",
#             f"https://wellfound.com/jobs/{job.get('id')}"
#         )

#         print(
#             "DESCRIPTION:"
#         )

#         print(
#             job.get(
#                 "description",
#                 ""
#             )[:300]
#         )

#         print("=" * 60)

# ____________________________________________________________________________________
# Learning playwright.
# from playwright.sync_api import sync_playwright

# with sync_playwright() as p:

#     browser = p.chromium.launch(
#         headless=True
#     )

#     page = browser.new_page()

#     page.goto(
#         "https://in.indeed.com/q-full-time-l-patna,-bihar-jobs.html?vjk=f131cfc7d6cae982"
#     )

#     print(page.title())
#     print(page.url)
#     print(page.content()[:1000])
#     browser.close()
#____________________________Learning
# import requests
# import json

# url = "https://boards-api.greenhouse.io/v1/boards/stripe/jobs"

# response = requests.get(url)

# data = response.json()

# jobs = []

# for job in data["jobs"]:

#     job_data = {
#         "title": job.get("title", ""),
#         "company": job.get("company_name", "Stripe"),
#         "location": job.get("location", {}).get("name", ""),
#         "salary": "",
#         "experience": "",
#         "skills": [],
#         "jobType": "",
#         "workMode": "",
#         "source": "Greenhouse",
#         "sourceUrl": job.get("absolute_url", "")
#     }

#     jobs.append(job_data)

# with open(
#     "stripe_jobs.json",
#     "w",
#     encoding="utf-8"
# ) as f:

#     json.dump(
#         jobs,
#         f,
#         indent=4,
#         ensure_ascii=False
#     )

# print("Total Jobs:", len(jobs))