export interface ICertificate {
  disk: string;
  path: string;
  name: string;
  alias: string;
  serialNumber: string;
  validFrom: string;
  validTo: string;
  CN: string;
  TIN: string;
  UID: string;
  PINFL: string;
  O: string;
  T: string;
  type: string;
}

export interface IKeyProps {
  el: ICertificate;
  selectKey: (key: any) => void;
  deadline: (from: string, to: string) => string;
}
