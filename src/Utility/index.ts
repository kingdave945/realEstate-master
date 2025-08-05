export interface ICustomInput {
  label: string;
  name?: string;
  option: any[];
  handleChange: (param?: any) => void;
  value?: string;
}