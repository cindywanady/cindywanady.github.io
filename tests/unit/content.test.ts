import { describe, expect, it } from "vitest";
import { allClaims, site } from "@content";
import { yogaSchema } from "@content/schema";
import { checkEvidence, normalize, readSource } from "@/lib/claims";

describe("content", () => {
    it("parses", () => {
        expect(site.identity.name).toBe("Cindy Wanady");
    });

    it("backs every claim with evidence", () => {
        expect(allClaims().length).toBeGreaterThan(30);
        expect(checkEvidence(allClaims())).toEqual([]);
    });

    it("gives both home columns the same anatomy", () => {
        for (const column of [site.data.column, site.yoga.column]) {
            expect(column.proof).toHaveLength(3);
            expect(column.strip.steps.length).toBeGreaterThanOrEqual(3);
        }
    });

    it("introduces both practices, one sentence each", () => {
        expect(site.identity.intro.map((c) => c.source)).toEqual(["cv", "yoga"]);
    });

    it("shows the 200-hour training as in progress and names no school for it", () => {
        const t = site.yoga.trainings.find((t) => t.hours === 200);
        expect(t?.status).toBe("in_progress");
        expect(t?.school).toBeUndefined();
    });

    it("links the 100-hour training to Vidyarasa", () => {
        const t = site.yoga.trainings.find((t) => t.hours === 100);
        expect(t?.status).toBe("completed");
        expect(t?.school?.url).toBe("https://vidyarasa.id/");
    });

    it("refuses an empty required yoga field", () => {
        expect(yogaSchema.safeParse({ ...site.yoga, styles: [] }).success).toBe(false);
        expect(yogaSchema.safeParse({ ...site.yoga, reflection: { ...site.yoga.reflection, text: "" } }).success).toBe(false);
    });

    it("keeps the years-practicing figure fresh", () => {
        const ageDays = (Date.now() - new Date(site.yoga.yearsRecordedOn).getTime()) / 86_400_000;
        expect(ageDays).toBeGreaterThanOrEqual(0);
        expect(ageDays).toBeLessThan(366);
    });

    it("publishes no email address", () => {
        expect(JSON.stringify(site)).not.toMatch(/[a-z0-9._-]+@[a-z0-9-]+\.[a-z]{2,}/i);
        expect(JSON.stringify(site)).not.toContain("mailto:");
    });

    it("links exactly LinkedIn, Instagram and GitHub", () => {
        expect(site.identity.profiles.map((p) => p.url)).toEqual([
            "https://www.linkedin.com/in/cindywanady/",
            "https://www.instagram.com/cin.oddysey_yoga/",
            "https://github.com/cindywanady",
        ]);
    });

    it("takes every role's organization, title and dates verbatim from the CV", () => {
        const cv = normalize(readSource("cv"));
        const fields = [site.data.current, ...site.data.earlier, ...site.data.formative].flatMap((r) => [r.title, r.organization, r.dates]);
        expect(fields.filter((f) => !cv.includes(normalize(f)))).toEqual([]);
    });

    it("takes every degree and skill line verbatim from the CV", () => {
        const cv = normalize(readSource("cv"));
        const fields = [...site.education.flatMap((e) => [e.award, e.institution, e.dates]), ...site.data.skills.map((s) => `${s.group}: ${s.items}`)];
        expect(fields.filter((f) => !cv.includes(normalize(f)))).toEqual([]);
    });

    it("has four nav items", () => {
        expect(site.navigation.map((n) => n.label)).toEqual(["Data", "Yoga", "About", "Contact"]);
    });
});
