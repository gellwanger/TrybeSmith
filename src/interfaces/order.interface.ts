interface Order {
  id?: number,
  userId: number,
}

interface OrderPlus extends Order {
  productsIds: number[];
}

export { Order, OrderPlus };
