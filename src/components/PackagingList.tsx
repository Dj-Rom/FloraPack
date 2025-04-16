import { type PackagingListInterface } from "../App.tsx";
import logoWhatsapp from './../assets/icons8-whatsapp.svg'
export interface PackagingListProps {
  packagingLists: PackagingListInterface[];
  onDeleteList: (id: number) => void;
}

export default function PackagingList({ packagingLists, onDeleteList }: PackagingListProps) {
  function sendToWhatsApp(packagingList: PackagingListInterface) {
    const { nameCompany, title, description } = packagingList;

    const message = `
Company: ${nameCompany}
Date: ${title.toLocaleDateString()}${title.toLocaleTimeString()}
--- Description ---
${Object.entries(description)
  .map(([key, value]) => value?`${key}: ${value}`:"")
  .join("\n")}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  }

  return (
    <ul className="lists">
      {packagingLists.map((packagingList) => (
        <li
          id={packagingList.id.toString()}
          key={packagingList.id}
          title={packagingList.title.toDateString()}
        >
          <h4>{packagingList.nameCompany}</h4>
          <p>
            {packagingList.title.toLocaleDateString()} -{" "}
            {packagingList.title.toLocaleTimeString()}
          </p>
          <ul>
            {Object.entries(packagingList.description).map(([key, value]) => (
              <li key={key}>
                <span>
                  {key} : {value}
                </span>
              </li>
            ))}
          </ul>

        <div className="listBtns">
        <button
            className="whatsApp"
            onClick={() => sendToWhatsApp(packagingList)}
          >
           <img src={logoWhatsapp} alt="whatsApp" />
          </button>
          <button onClick={() => onDeleteList(packagingList.id)}>Delete</button>
        </div>
        </li>
      ))}
    </ul>
  );
}
