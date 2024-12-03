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

export type TUserAuth = {
  _id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export type TCartItem = {
  createdAt: string;
  updatedAt: string;
  product: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    images: string[];
    category: string;
    featured?: boolean;
    updatedAt: string;
    __v: number;
  };
  quantity: number;
  user: {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    __v: number;
  };
  __v: number;
  _id: string;
};

export type TOrder = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  customerDetails: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  products: {
    _id: string;
    image: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
    subtotal: number;
  }[];
  shippingCharge: number;
  totalPrice: number;
  transactionId: string;
  status: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  };
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
};

export type TStats = {
  totalUsers: {
    total: number;
    admin: number;
    user: number;
  };
  totalProducts: {
    uniqueProducts: number;
    totalStockUnits: number;
  };
  pendingShipments: number;
};
