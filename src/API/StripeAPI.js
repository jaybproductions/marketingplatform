import axios from "axios";
export async function GetStripeSubscription(customerInfo) {
  if (customerInfo) {
    const utcSeconds =
      customerInfo.subscriptions.data[0].current_period_end * 1000;
    let d = new Date(utcSeconds).toLocaleDateString();

    const productID = customerInfo.subscriptions.data[0].plan.product;
    const response = await axios.get(
      `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/getsubscription/${productID}` ||
        `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/getsubscription/${productID}`
    );

    const cardID = customerInfo.default_source;
    const customerID = customerInfo.id.toString();

    const cardResponse = await axios.get(
      `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/${customerID}/getcard/${cardID}` ||
        `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/${customerID}/getcard/${cardID}`
    );

    const data = {
      dueDate: d,
      productData: response.data,
      cardData: cardResponse.data,
    };

    return data;
  }
}
