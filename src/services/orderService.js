export const createOrderReference = () => {
  const year = new Date().getFullYear();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `YHA-${year}-${suffix}`;
};

export const saveOrderSummary = (order) => {
  const current = JSON.parse(localStorage.getItem("yha-order-summaries") || "[]");
  localStorage.setItem("yha-order-summaries", JSON.stringify([order, ...current].slice(0, 10)));
  localStorage.setItem("yha-latest-order", JSON.stringify(order));
};

export const buildOrderMessage = (order, formatMoney) => {
  const lines = [
    "Hello Yemi Hair Affordables,",
    "",
    "I would like to place an order.",
    "",
    `Order reference: ${order.reference}`,
    ...order.items.flatMap((item) => [
      `Product: ${item.product.name}`,
      `Length: ${item.selected.length}`,
      `Texture: ${item.product.texture}`,
      `Colour: ${item.selected.colour}`,
      `Lace: ${item.selected.laceType}`,
      `Quantity: ${item.quantity}`,
      ""
    ]),
    `Currency: ${order.currency}`,
    `Items subtotal: ${formatMoney(order.total, order.currency)}`,
    "",
    "Customer:",
    `Name: ${`${order.customer.firstName} ${order.customer.lastName}`.trim()}`,
    `Phone: ${order.customer.phone}`,
    `City/Country: ${order.delivery.city}, ${order.delivery.country}`,
    "",
    "Additional note:",
    order.details.notes || "None"
  ];
  return lines.join("\n");
};
