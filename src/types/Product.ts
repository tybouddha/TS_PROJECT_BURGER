export type MenuProductType = {
  id: string;
  imageSource: string;
  title: string;
  price: number;
  quantity: number;
  isAvailable: boolean;
  isPublicised: boolean;
};

export type BasketProductType = {
  id: string;
  quantity: number;
};
