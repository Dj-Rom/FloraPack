import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => any;
  sign: string,
  elemName: string
}
export default function CalculatorModal({ onSubmit, sign, elemName }: Props) {
  const datalist = useSelector((state: RootState) => state.dataPackList)




  const language = useSelector((state: RootState) => state.settingsLanguage)
  return (
    <form className="calculatorModal" onSubmit={onSubmit} >
      <h4>{elemName}</h4>
      <label htmlFor="expression">{datalist[elemName]} {sign} </label>
      <input type="number" min='0' name="expression" id="expression" />
      <button type="submit">{language.save}</button>
    </form>
  );
}
