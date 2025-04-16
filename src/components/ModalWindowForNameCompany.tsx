interface Props {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  }
  
  export default function ModalWindowForNameCompany({ onSubmit }: Props) {
    return (
      <form onSubmit={onSubmit}>
        <label htmlFor="nameCompany">Wpisz tutaj nazwę listy</label>
        <input type="text" name="nameCompany" id="nameCompany" />
        <button type="submit">Zapisz</button>
      </form>
    );
  }
  