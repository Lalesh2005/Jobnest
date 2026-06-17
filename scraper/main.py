from scrapers.indeed import scrape_indeed
from mongo import upsert_job


def main():

    print("Starting JobNest Scraper...\n")

    jobs = scrape_indeed()

    print(f"Found {len(jobs)} jobs\n")

    for job in jobs:
        try:
            upsert_job(job)
            print(f"Saved: {job['title']}")
        except Exception as e:
            print(f"Error Saving Job: {e}")

    print("\nScraping Completed")


if __name__ == "__main__":
    main()