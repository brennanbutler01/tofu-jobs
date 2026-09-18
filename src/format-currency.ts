export const currencyParser = (value: string) =>
  value.replace(/\$\s?|(,*)/g, '')
export const currencyFormatter = (value: string) =>
  !Number.isNaN(parseFloat(value))
    ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    : '$ '
