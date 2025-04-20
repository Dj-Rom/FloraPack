import PackInfoSection from "../components/PackInfoSection.tsx";
import {dataPackInformation } from './../data/dataPackInformation.tsx';

export default function PackInformationPage() {
  return (
    <article>
      {dataPackInformation.map((item, index) => (
        <PackInfoSection {...item} />
      ))}
    </article>
  );
}
