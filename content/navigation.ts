/**
 * The four sections. `owns` lists the exact routes that mark an item as
 * current. Exact, not prefixes: GitHub Pages serves 404.html at any missing
 * URL, and a prefix would mark /data/old-project/ as Data on a page whose
 * prerendered nav marks nothing. The home page belongs to no item.
 */
export const navigation = [
    { label: "Data", href: "/data/", owns: ["/data/", "/data/thesis/"] },
    { label: "Yoga", href: "/yoga/", owns: ["/yoga/"] },
    { label: "About", href: "/about/", owns: ["/about/"] },
    { label: "Contact", href: "/contact/", owns: ["/contact/"] },
];
