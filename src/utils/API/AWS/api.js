import { GetUserData } from "../User/api";
import axios from "axios";
export async function GetAWSInstanceData(userId) {
  if (!userId) return;
  return GetUserData(userId).then((data) => {
    if (!data) return;
    return data.awsInstances;
  });
}

export async function GetSingleAwsInstance(awsInstance) {
  if (!awsInstance) return;
  const response = await axios.get(
    `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/aws/getinstance/${awsInstance.instanceName}` ||
      `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/aws/getinstance/${awsInstance.instanceName}`
  );

  return response.data;
}

export async function createAwsInstance(checkoutData, userId) {
  if (!userId) return;
  const response = await axios.get(
    `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/aws/${userId}/createInstance/Wordpress-${userId}/${checkoutData.availabilityZone}/${checkoutData.blueprintId}/${checkoutData.bundleId}` ||
      `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/aws/${userId}/createInstance/Wordpress-${userId}/${checkoutData.availabilityZone}/${checkoutData.blueprintId}/${checkoutData.bundleId}`
  );

  const allocateIpResponse = await axios.post(
    `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/aws/${userId}/allocateip` ||
      `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/aws/${userId}/allocateip`,
    {
      userId: userId,
    }
  );

  console.log(allocateIpResponse);

  const responseData = {
    createInstanceResponse: response.data,
    allocateIpResponse: allocateIpResponse.data,
  };

  return responseData;
}

export async function AssignStaticIp(userId, awsInstance) {
  if (!awsInstance) return;
  if (awsInstance.state.name !== "running")
    return "Please Wait While Your Instance is Being Setup";
  if (awsInstance.isStaticIp === true) return;

  const allocateIPResponse = await axios.post(
    `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/aws/attachip` ||
      "http://localhost:5001/marketingplatform-3b5c7/us-central1/app/aws/attachip",
    {
      instanceName: awsInstance.name,
      staticIpName: `StaticIp-${userId}`,
    }
  );

  return allocateIPResponse.status;
}
