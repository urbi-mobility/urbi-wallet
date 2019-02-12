export type DialogPickerOption = {
  id: string;
  label: string;
};

export type DialogPickerProps = {
  show: boolean;
  title: string;
  options: DialogPickerOption[];
  onSelect: (selectedId: string) => any;
  onCancel: () => any;
};
