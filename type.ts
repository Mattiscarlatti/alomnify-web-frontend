export interface Flora {
    id: number;
    latin_name: string;
    dutch_name: string;
    english_name: string;
    plant_type: string;
    eet_baar: string;
    bloei_tijd: string;
    bloem_kleur: string;
    groen_blijvend: string;
    in_heems: string;
    be_dreigd: string;
  }

  export interface Flora2 {
    id: number;
    latin_name: string;
    dutch_name: string;
    english_name: string;
    plant_type: string;
    eet_baar: string;
    bloei_tijd: string;
    bloem_kleur: string;
    groen_blijvend: string;
    in_heems: string;
    be_dreigd: string;
  }

  export interface ItemProps {
    item: Flora;
  }
  
  export interface StateProps {
    shopping: {
      floraData: [];
      };
  }