export default function scrollToId(id: string) {
    const element = document.getElementById(id);
    if (element) {
        const yOffset = -105;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}