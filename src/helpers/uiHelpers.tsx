import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
export function useToggleFocusMode() {
    const isSelectLanguage = useSelector((state: RootState) => state.navi.isSelectLanguage);
    const isSelectPackList = useSelector((state: RootState) => state.navi.isSelectPackList);
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    const form = header?.querySelector('form');
    const body = document.querySelector('body');
    const buttons = main?.querySelectorAll('button');
    useEffect(() => {
        if (!main || !body || !buttons || !form || !header) return;
        const isDimmed = isSelectPackList || isSelectLanguage;
        if (isDimmed) {
            main.style.opacity = '.36';
            form.style.height = '100vh';
            body.style.overflow = 'hidden';
            form.style.overflow = 'scroll';
        } else {
            main.style.opacity = '1';
            body.style.overflow = '';
            form.style.overflow = '';
        }
        buttons.forEach((button) => (button.disabled = isDimmed));
        body.style.background = isDimmed ? 'black' : 'linear-gradient(#f0f6f8, #e0e1e7)';

    })

}
