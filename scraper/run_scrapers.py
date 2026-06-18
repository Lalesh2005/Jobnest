import json

from sources.remotive import scrape_remotive
from sources.greenhouse import scrape_greenhouse

from utils.duplicate import remove_duplicates
from database.mongo import save_jobs


def main():

    all_jobs = []

    print("Fetching Remotive jobs...")
    remotive_jobs = scrape_remotive()
    print(f"Remotive: {len(remotive_jobs)} jobs")

    print("Fetching Greenhouse jobs...")
    greenhouse_jobs = scrape_greenhouse()
    print(f"Greenhouse: {len(greenhouse_jobs)} jobs")

    all_jobs.extend(remotive_jobs)
    all_jobs.extend(greenhouse_jobs)

    print(f"\nTotal jobs fetched: {len(all_jobs)}")

    all_jobs = remove_duplicates(all_jobs)

    print(f"After duplicate removal: {len(all_jobs)} jobs")

    with open("jobs.json", "w", encoding="utf-8") as f:
        json.dump(all_jobs, f, indent=4, ensure_ascii=False)

    print("Saved jobs.json")

    save_jobs(all_jobs)


if __name__ == "__main__":
    main()