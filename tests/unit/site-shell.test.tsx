import { site } from "@content";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NavList } from "@/components/site/nav-list";
import { PersonJsonLd } from "@/components/site/person-json-ld";
import { SiteFooter } from "@/components/site/site-footer";
import { SkipLink } from "@/components/site/skip-link";

describe("NavList", () => {
    it("marks only the current section", () => {
        render(<NavList items={site.navigation} current="/data/" />);
        const links = screen.getAllByRole("link");
        expect(links.map((a) => a.textContent)).toEqual(["Data", "Yoga", "About", "Contact"]);
        expect(links.filter((a) => a.getAttribute("aria-current") === "page").map((a) => a.textContent)).toEqual(["Data"]);
    });

    it("marks nothing on the home page", () => {
        render(<NavList items={site.navigation} current={null} />);
        expect(screen.getAllByRole("link").some((a) => a.hasAttribute("aria-current"))).toBe(false);
    });
});

describe("SiteFooter", () => {
    it("links the three profiles by name and publishes no email", () => {
        const { container } = render(<SiteFooter />);
        const nav = screen.getByRole("navigation", { name: "Profiles" });
        expect(
            within(nav)
                .getAllByRole("link")
                .map((a) => a.getAttribute("href")),
        ).toEqual(site.identity.profiles.map((p) => p.url));
        for (const p of site.identity.profiles) {
            const link = within(nav).getByRole("link", { name: p.label });
            expect(link.querySelector("svg"), `${p.label} icon`).not.toBeNull();
        }
        expect(container.innerHTML).not.toContain("mailto:");
    });
});

describe("SkipLink", () => {
    it("jumps to the main content", () => {
        render(<SkipLink />);
        expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
    });
});

describe("PersonJsonLd", () => {
    it("describes Cindy with her three profiles and no email", () => {
        const { container } = render(<PersonJsonLd />);
        const json = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
        expect(json["@type"]).toBe("Person");
        expect(json.name).toBe("Cindy Wanady");
        expect(json.sameAs).toEqual(site.identity.profiles.map((p) => p.url));
        expect(json.alumniOf).toHaveLength(2);
        expect(json.email).toBeUndefined();
        expect(json.url).toBe("https://cindywanady.github.io/");
    });
});
