/**
 * The four sections. `owns` lists the paths that mark an item as current, so
 * /data/thesis/ keeps Data highlighted. The home page belongs to no item.
 */
export const navigation = [
    { label: "Data", href: "/data/", owns: ["/data/"] },
    { label: "Yoga", href: "/yoga/", owns: ["/yoga/"] },
    { label: "About", href: "/about/", owns: ["/about/"] },
    { label: "Contact", href: "/contact/", owns: ["/contact/"] },
];
