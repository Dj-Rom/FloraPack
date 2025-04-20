
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export function useToggleFocusMode() {
    const isSelectLanguage = useSelector((state: RootState) => state.navi.isSelectLanguage);
    const isSelectPackList = useSelector((state: RootState) => state.navi.isSelectPackList);
    const main = document.querySelector('main');
    const body = document.querySelector('body');
    const buttons = main?.querySelectorAll('button')

    if (!main || !body || !buttons) return;
    main.style.opacity = (isSelectPackList || isSelectLanguage) ? '.36' : '1';
    buttons.forEach((button) =>
        button.disabled = (isSelectPackList || isSelectLanguage))
    body.style.background = (isSelectPackList || isSelectLanguage) ? 'black' : 'linear-gradient(#f0f6f8, #e0e1e7)';
}