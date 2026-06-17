"""
scrapers/indeed.py
==================
Indeed job scraper using Playwright (headless browser).

Why Playwright?
  Indeed is JavaScript-rendered — requests + BeautifulSoup
  only gets empty HTML. Playwright runs a real browser.

Setup (one-time):
  pip install playwright
  playwright install chromium
"""

import time


def scrape_indeed(
    keyword: str  = "software developer",
    location: str = "India",
    max_jobs: int = 20
) -> list[dict]:
    """
    Scrape Indeed job listings using Playwright.

    This is the function imported by main.py:
        from scrapers.indeed import scrape_indeed

    Args:
        keyword:  Job search term  (e.g. "python developer")
        location: City or country  (e.g. "Bangalore", "India")
        max_jobs: Max jobs to scrape from one page

    Returns:
        List of job dicts with standardized fields
    """

    jobs = []

    try:
        from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout
    except ImportError:
        print("[ERROR] Playwright not installed.")
        print("  Run: pip install playwright && playwright install chromium")
        return jobs

    try:
        with sync_playwright() as p:

            # Launch headless Chromium (invisible browser)
            browser = p.chromium.launch(
                headless=True,
                args=[
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-blink-features=AutomationControlled"
                ]
            )

            context = browser.new_context(
                user_agent=(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/120.0.0.0 Safari/537.36"
                ),
                viewport={"width": 1280, "height": 720},
                locale="en-US"
            )

            page = context.new_page()

            search_url = (
                f"https://www.indeed.com/jobs"
                f"?q={keyword.replace(' ', '+')}"
                f"&l={location.replace(' ', '+')}"
            )

            print(f"[Indeed] Navigating to: {search_url}")
            page.goto(search_url, wait_until="domcontentloaded", timeout=30000)

            # Wait for job cards to appear in DOM
            try:
                page.wait_for_selector(".job_seen_beacon", timeout=10000)
            except PWTimeout:
                print("[Indeed][WARN] Job cards not found.")
                print("  Likely causes: bot blocked, or selectors changed.")
                browser.close()
                return jobs

            time.sleep(2)  # human-like delay

            cards = page.query_selector_all(".job_seen_beacon")
            print(f"[Indeed] Found {len(cards)} job cards")

            for card in cards[:max_jobs]:
                try:
                    title_el   = card.query_selector("[data-testid='job-title']")
                    company_el = card.query_selector("[data-testid='company-name']")
                    loc_el     = card.query_selector("[data-testid='text-location']")
                    salary_el  = card.query_selector("[data-testid='attribute_snippet_testid']")
                    link_el    = card.query_selector("a[data-jk]")

                    href = link_el.get_attribute("href") if link_el else ""
                    source_url = (
                        "https://www.indeed.com" + href
                        if href and href.startswith("/")
                        else href or ""
                    )

                    job = {
                        "title":      title_el.inner_text().strip()   if title_el   else "N/A",
                        "company":    company_el.inner_text().strip() if company_el else "N/A",
                        "location":   loc_el.inner_text().strip()     if loc_el     else "N/A",
                        "salary":     salary_el.inner_text().strip()  if salary_el  else "",
                        "experience": "",
                        "skills":     [],
                        "jobType":    "",
                        "workMode":   "",
                        "source":     "Indeed",
                        "sourceUrl":  source_url
                    }

                    jobs.append(job)

                except Exception as e:
                    print(f"[Indeed][WARN] Skipped card: {e}")

            browser.close()

    except Exception as e:
        print(f"[Indeed][ERROR] Scraper failed: {e}")

    return jobs


def scrape_indeed_paginated(
    keyword: str   = "software developer",
    location: str  = "India",
    num_pages: int = 3,
    jobs_per_page: int = 15
) -> list[dict]:
    """
    Scrape multiple pages of Indeed.
    Indeed pagination: &start=0, &start=10, &start=20 ...

    Args:
        keyword:       Search keyword
        location:      City/country
        num_pages:     Number of pages to scrape
        jobs_per_page: Max jobs per page

    Returns:
        Combined list of all jobs
    """

    all_jobs = []

    try:
        from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout
    except ImportError:
        print("[ERROR] Run: pip install playwright && playwright install chromium")
        return all_jobs

    with sync_playwright() as p:

        browser = p.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
            )
        )
        page = context.new_page()

        for page_num in range(num_pages):

            start = page_num * 10
            url = (
                f"https://www.indeed.com/jobs"
                f"?q={keyword.replace(' ', '+')}"
                f"&l={location.replace(' ', '+')}"
                f"&start={start}"
            )

            print(f"[Indeed] Page {page_num + 1}/{num_pages}")

            try:
                page.goto(url, wait_until="domcontentloaded", timeout=30000)
                page.wait_for_selector(".job_seen_beacon", timeout=8000)
                time.sleep(2)

                cards = page.query_selector_all(".job_seen_beacon")

                for card in cards[:jobs_per_page]:
                    try:
                        title_el   = card.query_selector("[data-testid='job-title']")
                        company_el = card.query_selector("[data-testid='company-name']")
                        loc_el     = card.query_selector("[data-testid='text-location']")
                        link_el    = card.query_selector("a[data-jk]")

                        href = link_el.get_attribute("href") if link_el else ""
                        source_url = (
                            "https://www.indeed.com" + href
                            if href and href.startswith("/")
                            else href or ""
                        )

                        job = {
                            "title":      title_el.inner_text().strip()   if title_el   else "N/A",
                            "company":    company_el.inner_text().strip() if company_el else "N/A",
                            "location":   loc_el.inner_text().strip()     if loc_el     else "N/A",
                            "salary":     "",
                            "experience": "",
                            "skills":     [],
                            "jobType":    "",
                            "workMode":   "",
                            "source":     "Indeed",
                            "sourceUrl":  source_url
                        }

                        all_jobs.append(job)

                    except Exception as e:
                        print(f"[Indeed][WARN] Skipped card: {e}")

            except PWTimeout:
                print(f"[Indeed][WARN] Page {page_num + 1} timed out — stopping.")
                break

        browser.close()

    print(f"[Indeed] Total scraped: {len(all_jobs)} jobs")
    return all_jobs