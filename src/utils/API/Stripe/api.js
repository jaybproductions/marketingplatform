import axios from "axios";

export async function GetStripeCustomerInfo(customerId) {
  if (!customerId) return;
  const response = await axios.get(
    `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/stripe/getcustomer/${customerId}` ||
      `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/stripe/getcustomer/${customerId}`
  );

  return response.data;
}

export async function GetDueDate(customerInfo) {
  if (!customerInfo) return;
  const utcSeconds =
    customerInfo.subscriptions.data[0].current_period_end * 1000;
  return new Date(utcSeconds).toLocaleDateString();
}

export async function GetProductInfo(productId) {
  const response = await axios.get(
    `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/stripe/getsubscription/${productId}` ||
      `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/stripe/getsubscription/${productId}`
  );

  return response.data;
}

export async function GetCardInfo(customerId, cardId) {
  if (!customerId || !cardId) return;
  const cardResponse = await axios.get(
    `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/stripe/${customerId}/getcard/${cardId}` ||
      `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/stripe/${customerId}/getcard/${cardId}`
  );

  return cardResponse.data;
}

export async function handleCheckout(checkoutData) {
  const response = await axios.post(
    `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/stripe/checkout` ||
      `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/stripe/checkout`,
    checkoutData
  );

  return response.data;
}
