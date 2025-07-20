export type dataPackInformation = {
  title: string,
  photoUrl: any,
  description: {
    [key: string]: string
  }
}[];
import photoTag6 from './../assets/photoPackInformationPage/CC_TAG-ID-1052-scanner.webp'
import photoCC from './../assets/photoPackInformationPage/CC.jpg'
import photoTag5 from './../assets/photoPackInformationPage/CC_TAG_5.png'
import photoNC from './../assets/photoPackInformationPage/CC-NC.webp'
import photoKK from './../assets/photoPackInformationPage/KK.jpg'

export const dataPackInformation: dataPackInformation = [
  {
    title: 'TAG-6',
    photoUrl: photoTag6,
    description: {
      ru: `1) Меньшая петля; сделана из пружинного металла 
      2) Корпус; желтый и прозрачный 
      3) Направляющие штифты для закрытия
      4) Ряд особенностей как внутри, так и снаружи этикетки; здесь вы видите голограмму, а также номер этикетки и логотип CC, которые являются частью особенностей.
      5) Матрица данных с линией разрыва
      6) Закрывающий штифт`,
      en: `1) Smaller loop; made of spring metal
      2) Housing; yellow and transparent
      3) Guide pins for closing
      4) A set of features both inside and outside the label; here you see a hologram, as well as the label number and the CC logo, which are part of the features.
      5) Data matrix with tear-off line
      6) Locking pin`,
      pl: `1) Mniejsza pętla; wykonana ze sprężystego metalu
      2) Obudowa; żółta i przezroczysta
      3) Prowadzące trzpienie do zamykania
      4) Szereg cech zarówno wewnątrz, jak i na zewnątrz etykiety; tutaj widać hologram, numer etykiety oraz logo CC, które są częścią cech.
      5) Matryca danych z linią zrywania
      6) Zatrzaskujący trzpień`,
      de: `1) Kleinerer Bügel; aus Federstahl gefertigt
      2) Gehäuse; gelb und transparent
      3) Führungsstifte zum Schließen
      4) Eine Reihe von Merkmalen innen und außen auf dem Etikett; hier sehen Sie ein Hologramm, die Etikettennummer und das CC-Logo, die Teil der Merkmale sind.
      5) Datenmatrix mit Abreißlinie
      6) Verschlussstift`,
      nl: `1) Kleinere lus; gemaakt van veerstaal
      2) Behuizing; geel en transparant
      3) Gidspinnen om te sluiten
      4) Een reeks kenmerken binnen en buiten het etiket; hier zie je een hologram, het etiketnummer en het CC-logo, die deel uitmaken van de kenmerken.
      5) Datamatrix met afscheurlijn
      6) Sluitpen`,
      ua: `1) Менша петля; виготовлена з пружинного металу
      2) Корпус; жовтий і прозорий
      3) Направляючі штифти для закриття
      4) Набір особливостей як всередині, так і зовні етикетки; тут ви бачите голограму, номер етикетки та логотип CC, які є частиною особливостей.
      5) Матриця даних із лінією розриву
      6) Штифт для замикання`
    },
  },
  {
    title: 'TAG-5',
    photoUrl: photoTag5,
    description: {
      en: `CC Carts that are part of the CC Pool are marked with a CC metal plate and a CC TAG5 label on the base. 
            Can old labels be removed? The black and old green labels can be removed. The red label, which contains repair information for the base, will be removed by CC at the depots.`,

      pl: `Wózki CC, które są częścią puli CC, są oznaczone metalową tabliczką CC oraz etykietą CC TAG5 na podstawie. 
            Czy stare etykiety można usunąć? Czarna i stara zielona etykieta mogą być usunięte. Czerwona etykieta, zawierająca informacje o naprawie podstawy, zostanie usunięta przez CC w punktach przyjęć.`,

      de: `CC-Wagen, die Teil des CC-Pools sind, sind mit einer CC-Metallplatte und einem CC-TAG5-Etikett an der Basis gekennzeichnet. 
            Dürfen alte Etiketten entfernt werden? Die schwarzen und alten grünen Etiketten können entfernt werden. Das rote Etikett, das Reparaturinformationen zur Basis enthält, wird in den Depots von CC entfernt.`,

      nl: `CC-wagens die deel uitmaken van de CC Pool zijn gemarkeerd met een metalen CC-plaatje en een CC TAG5-label aan de basis. 
            Mogen oude labels worden verwijderd? De zwarte en oude groene labels mogen worden verwijderd. Het rode label, met reparatie-informatie over de basis, zal door CC in de depots worden verwijderd.`,

      ua: `Візки CC, які є частиною пулу CC, позначені металевою табличкою CC та етикеткою CC TAG5 на основі. 
            Чи можна видаляти старі етикетки? Чорні та стара зелена етикетки можуть бути видалені. Червона етикетка, що містить інформацію про ремонт основи, буде видалена CC на депо.`,

      ru: `Тележки CC, которые являются частью пула CC, маркируются металлической табличкой CC и этикеткой CC TAG5 на основании. 
            Можно ли удалить старые этикетки? Черные и старые зеленые этикетки могут быть удалены. Красная этикетка, содержащая информацию о ремонте основания, будет удалена CC на складах.`
    }


  },
  {
    title: 'CC',
    photoUrl: photoCC,
    description: {
      en: `CC `,
      pl: `CC`,
      de: `CC`,
      nl: `CC`,
      ua: `CC`,
      ru: `CC`,

    }
  },
  {
    title: 'NC',
    photoUrl: photoNC,
    description: {
      en: `NC `,
      pl: `NC`,
      de: `NC`,
      nl: `NC`,
      ua: `NC`,
      ru: `NC`,

    }
  },
  {
    title: 'KK',
    photoUrl: photoKK,
    description: {
      en: `KK`,
      pl: `KK`,
      de: `KK`,
      nl: `KK`,
      ua: `KK`,
      ru: `KK`,

    }

  },


]