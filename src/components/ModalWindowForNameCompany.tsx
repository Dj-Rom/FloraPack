import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


interface Props {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  }
  
  export default function ModalWindowForNameCompany({ onSubmit }: Props) {
    
  const language = useSelector((state: RootState) => state.settingsLanguage)
    return (
      <form className="modalForm" onSubmit={onSubmit}>
        <label htmlFor="nameCompany">{language.enterListName}</label>
        <input type="text" name="nameCompany" id="nameCompany" />
        <button type="submit">{language.save}</button>
      </form>
    );
  }
  