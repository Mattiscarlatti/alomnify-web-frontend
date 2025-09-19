export interface Flora {
    _id: number;
    lt_name: string;
    nl_name: string;
    eng_name: string;
    pt_type: string;
    ed_ible: string;
    flow_ering: string;
    flow_ercolor: string;
    ev_ergreen: string;
    en_demic: string;
    endang_ered: string;
  }

  export interface Flora2 {
    id: number;
    latin_name: string;
    dutch_name: string;
    english_name: string;
    plant_type: string;
    edi_bility: string;
    flower_ing: string;
    flower_color: string;
    ever_green: string;
    ende_mic: string;
    en_dangered: string;
  }

  export interface ItemProps {
    item: Flora;
  }
  
  export interface StateProps {
    shopping: {
      floraData: [];
      };
  }