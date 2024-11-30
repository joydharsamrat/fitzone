export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  description: string;
  images: string[];
  category: string;
  _id: string;
};
export type TCategory = {
  title: string;
  icon: string;
  _id: string;
};

export type TDefaultProductValues = {
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
};

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type TImage = {
  _id: string;
  url: string;
};
export type TTestimonial = {
  _id: string;
  name: string;
  title: string;
  image: string;
  feedback: string;
};
