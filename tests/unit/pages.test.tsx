import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import DataPage from "@/app/data/page";
import ThesisPage from "@/app/data/thesis/page";
import NotFound from "@/app/not-found";
import HomePage from "@/app/page";
import YogaPage from "@/app/yoga/page";

/**
 * A half's anatomy: its direct children, by tag. The strips inside differ in
 * length on purpose (5 migration steps, 7 poses), so only the column's own
 * parts are compared: heading, true line, proof list, link.
 */
function anatomy(el: Element): string[] {
    return Array.from(el.children).map((c) => c.tagName);
}

describe("home", () => {
    it("gives both practices the same anatomy", () => {
        render(<HomePage />);
        const [data, yoga] = screen.getAllByRole("region");
        expect(within(data).getByRole("heading", { level: 2 })).toHaveTextContent("Data science");
        expect(within(yoga).getByRole("heading", { level: 2 })).toHaveTextContent("Yoga practice");
        expect(anatomy(data)).toEqual(["H2", "IMG", "P", "UL", "A"]);
        expect(anatomy(yoga)).toEqual(anatomy(data));
    });

    it("leads with her professional identity, and names her in the lede", () => {
        render(<HomePage />);
        const [h1] = screen.getAllByRole("heading", { level: 1 });
        expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
        expect(h1).toHaveTextContent("Data scientist in CRM. Yoga practitioner.");
        expect(within(h1).getByText("Data scientist")).toHaveClass("hero-emphasis");
        expect(screen.getByText(/I'm Cindy Wanady\./)).toBeInTheDocument();
    });

    it("links each half to its section", () => {
        render(<HomePage />);
        expect(screen.getByRole("link", { name: "See data work" })).toHaveAttribute("href", "/data/");
        expect(screen.getByRole("link", { name: "See yoga practice" })).toHaveAttribute("href", "/yoga/");
    });
});

describe("/data/", () => {
    it("presents applied projects without coursework labels", () => {
        render(<DataPage />);
        const projects = screen.getByRole("heading", { level: 2, name: "Projects" }).closest("section")!;
        expect(projects).not.toHaveTextContent("Monash University");
        expect(projects).not.toHaveTextContent("Course projects");
    });

    it("shows the migration strip and exactly one featured item, the thesis", () => {
        const { container } = render(<DataPage />);
        expect(screen.getByRole("figure", { name: "How I run a CRM migration" })).toBeInTheDocument();
        const featured = container.querySelectorAll("[data-featured]");
        expect(featured).toHaveLength(1);
        expect(featured[0]).toHaveTextContent("RAG chatbot");
    });

    it("lists all five projects and links the thesis page", () => {
        render(<DataPage />);
        for (const p of ["Amazon rating prediction", "NLP benchmarking", "Mental health", "Climate Compass", "job market"]) {
            expect(screen.getByText(new RegExp(p, "i"))).toBeInTheDocument();
        }
        expect(screen.getByRole("link", { name: "Read about the thesis" })).toHaveAttribute("href", "/data/thesis/");
    });
});

describe("/data/thesis/", () => {
    it("names the supervisor with a link and the three evaluation arms", () => {
        render(<ThesisPage />);
        expect(screen.getByRole("link", { name: "A/Prof. Derry Wijaya" })).toHaveAttribute("href", "https://research.monash.edu/en/persons/derry-wijaya/");
        expect(screen.getByText(/counselor assisted by chatbot/)).toBeInTheDocument();
    });
});

describe("/yoga/", () => {
    it("says the 200-hour training is in progress and links Vidyarasa", () => {
        render(<YogaPage />);
        expect(screen.getByText(/200-hour/).closest("li")).toHaveTextContent(/in progress/i);
        expect(screen.getByRole("link", { name: "Vidyarasa" })).toHaveAttribute("href", "https://vidyarasa.id/");
    });

    it("shows the opening flow and points to her ongoing practice", () => {
        render(<YogaPage />);
        expect(within(screen.getByRole("figure", { name: "Opening flow of Sun Salutation A" })).getAllByRole("listitem")).toHaveLength(7);
        expect(screen.getByRole("link", { name: "Follow my practice on Instagram" })).toHaveAttribute("href", "https://www.instagram.com/cin.oddysey_yoga/");
    });
});

describe("/about/", () => {
    it("lists both degrees, the exchange, and the Distinction", () => {
        render(<AboutPage />);
        for (const t of ["Master of Data Science", "Bachelor of Finance and Banking", "Exchange Student"]) expect(screen.getByText(t)).toBeInTheDocument();
        expect(screen.getByText(/with Distinction/)).toBeInTheDocument();
    });
});

describe("/contact/", () => {
    it("offers three profile links and no email", () => {
        const { container } = render(<ContactPage />);
        const links = within(screen.getByRole("list")).getAllByRole("link");
        expect(links.map((a) => a.getAttribute("href"))).toEqual([
            "https://www.linkedin.com/in/cindywanady/",
            "https://www.instagram.com/cin.oddysey_yoga/",
            "https://github.com/cindywanady",
        ]);
        expect(container.innerHTML).not.toContain("mailto:");
    });
});

describe("404", () => {
    it("says what happened and offers every section as a way on", () => {
        render(<NotFound />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("This page does not exist.");
        const ways = within(screen.getByRole("navigation", { name: "Pages that do exist" })).getAllByRole("link");
        expect(ways.map((a) => a.getAttribute("href"))).toEqual(["/data/", "/yoga/", "/about/", "/contact/"]);
        for (const link of ways) expect(link.querySelector("p")?.textContent?.length).toBeGreaterThan(10);
        expect(screen.getByRole("link", { name: "Back to the home page" })).toHaveAttribute("href", "/");
    });
});
