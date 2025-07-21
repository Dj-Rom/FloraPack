export default function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({behavior: "smooth", block: "center", });
}