import PackInfoSection from "../components/PackInfoSection.tsx";
import { dataPackInformation } from './../data/dataPackInformation.tsx';

export default function PackInformationPage() {
  return (
    <article>
      {dataPackInformation.map((item) => (
        <PackInfoSection {...item} />
      ))}
    </article>
  );
}
