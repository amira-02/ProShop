export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const calculateDaysBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const differenceInTime = end.getTime() - start.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
};
export const updateCart = (state) => {
  // Calculate the items price in whole number (pennies) to avoid issues with
  // floating point number calculations
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );

  // Calculate the theft protection fee
  const theftProtectionFee = state.cartItems.reduce(
    (acc, item) => {
      if (item.theftProtection) {
        return acc + ((item.price * 100 * item.qty * 0.05) / 100);
      } else {
        return acc;
      }
    },
    0
  );

  // Calculate the total policy fee
  const totalPolicyFee = state.cartItems.reduce(
    (acc, item) => acc + (calculateDaysBetweenDates(item.startDate, item.endDate) * item.policyprice),
    0
  );

  // Calculate the items price including policy fee and theft protection fee
  let totalPrice = itemsPrice + totalPolicyFee;

  // Add theft protection fee to the total price if theft protection is enabled
  if (theftProtectionFee > 0) {
    totalPrice += theftProtectionFee;
  }

  // Calculate the shipping price
  const shippingPrice = itemsPrice > 100 ? 0 : 10;

  // Calculate the tax price
  const taxPrice = 0.15 * totalPrice;

  // Calculate the total price
  state.totalPrice = addDecimals(totalPrice + shippingPrice + taxPrice);

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  // Display the total price with policy fee and theft protection fee in an alert
  alert(`Policy Fee: $${addDecimals(totalPolicyFee)}\n
         Theft Protection Fee: $${addDecimals(theftProtectionFee)}\n
         Shipping Price: $${addDecimals(shippingPrice)}\n
         Tax Price: $${addDecimals(taxPrice)}\n
         Total Price (including Policy Fee, Theft Protection Fee, Shipping Price, and Tax Price): $${state.totalPrice}`);

  return state;
};
