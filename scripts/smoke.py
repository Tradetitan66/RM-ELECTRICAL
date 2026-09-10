"""Quick smoke test for the RM Electrical site.

Run with the dev or preview server already serving on a port:

    npm run dev          # terminal 1
    python3 scripts/smoke.py --base http://localhost:5173

Prints PASS/FAIL for the core conversion-flow checks and saves evidenced
screenshots to /tmp/rm-*.png when --shots is passed.
"""
import argparse
import sys
import urllib.parse

from playwright.sync_api import sync_playwright

PASS = 0
FAIL = 0


def check(name, cond, detail=""):
    global PASS, FAIL
    if cond:
        PASS += 1
        label = "PASS"
    else:
        FAIL += 1
        label = "FAIL"
    print(f"{label} - {name}" + ("" if cond or not detail else f"  [{detail}]"))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", default="http://localhost:5173")
    parser.add_argument("--shots", action="store_true", help="save screenshots")
    args = parser.parse_args()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        console_errors = []
        page.on("console", lambda m: console_errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: console_errors.append(str(e)))

        page.goto(args.base, wait_until="networkidle")
        page.wait_for_timeout(600)

        check("Title tag", "RM Electrical | Electrician in Alexandria & Balloch" == page.title())
        check("Hero headline", page.locator("#hero-heading").is_visible())
        check(
            "No horizontal overflow (desktop)",
            not page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"),
        )

        # Open modal from a service card, verify preselection.
        page.locator("#services article", has_text="Lighting Installation").get_by_role("button").first.click()
        page.wait_for_timeout(400)
        check("Modal opens", page.get_by_role("dialog").is_visible())
        check(
            "Lighting preselected",
            page.locator("#contact-service").input_value() == "Lighting installation",
        )

        # Attempt submit empty -> errors + focus.
        page.get_by_role("link", name="Continue to WhatsApp").click()
        page.wait_for_timeout(250)
        check("Inline error for name", page.locator("#contact-name-error").is_visible())
        check(
            "Focus on first invalid field",
            page.evaluate("document.activeElement && document.activeElement.id") == "contact-name",
        )

        # Fill and inspect the exact href (do NOT open WhatsApp).
        page.fill("#contact-name", "Smoke Test")
        page.select_option("#contact-service", label="Lighting installation")
        page.fill("#contact-location", "Alexandria, G83")
        page.fill("#contact-details", "Two downlights & under-cabinet lighting")
        spread_with_and = page.get_by_role("link", name="Continue to WhatsApp").get_attribute("href")
        parsed = urllib.parse.urlparse(spread_with_and)
        check("Digits-only wa.me destination", parsed.netloc == "wa.me" and parsed.path == "/447972915912")
        check("Message is URL-encoded", "%0A" in spread_with_and and "%26" in spread_with_and, spread_with_and[:160])
        decoded = urllib.parse.unquote(urllib.parse.parse_qs(parsed.query).get("text", [""])[0])
        check(
            "Message follows spec structure",
            decoded.startswith(
                "Hi Ryan, I'd like to enquire about some electrical work with RM Electrical.\n\nName: Smoke Test\n"
            ),
            decoded[:90],
        )
        check("Closing line present", "Could you let me know your availability and the next steps?" in decoded)

        # Close via Escape, reopen generic -> state preserved.
        page.keyboard.press("Escape")
        page.wait_for_timeout(300)
        check("Escape closes modal", not page.get_by_role("dialog").is_visible())
        page.locator("header").get_by_role("button", name="WhatsApp Quote").click()
        page.wait_for_timeout(300)
        check(
            "Form state preserved on reopen",
            page.input_value("#contact-name") == "Smoke Test",
        )
        page.keyboard.press("Escape")
        page.wait_for_timeout(300)

        # Mobile layout.
        page.set_viewport_size({"width": 390, "height": 844})
        page.goto(args.base, wait_until="networkidle")
        page.wait_for_timeout(500)
        check(
            "No horizontal overflow (mobile)",
            not page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"),
        )
        check("Mobile action bar visible", page.get_by_role("button", name="WhatsApp Quote").last.is_visible())
        check("Mobile Call link is tel:", page.locator('a[href="tel:+447972915912"]').last.is_visible())

        check("No console errors", len(console_errors) == 0, "; ".join(console_errors[:3]))

        if args.shots:
            page.screenshot(path="/tmp/rm-smoke-mobile.png")
            page.set_viewport_size({"width": 1440, "height": 900})
            page.goto(args.base, wait_until="networkidle")
            page.wait_for_timeout(500)
            page.screenshot(path="/tmp/rm-smoke-desktop.png")

        browser.close()

    print(f"\nTOTAL {PASS + FAIL} | PASS {PASS} | FAIL {FAIL}")
    return 1 if FAIL else 0


if __name__ == "__main__":
    sys.exit(main())