import { GetUserData } from "../User/api";
import axios from "axios";
export async function GetAWSInstanceData(userId) {
  if (!userId) return;
  return GetUserData(userId).then((data) => data.awsInstances);
}

export async function GetSingleAwsInstance(awsInstance) {
  if (!awsInstance) return;
  const response = await axios.get(
    `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/aws/getinstance/${awsInstance.instanceName}` ||
      `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/aws/getinstance/${awsInstance.instanceName}`
  );

  return response.data;
}

export async function AssignStaticIp(userId, awsInstance) {
  if (awsInstance.state.name !== "running")
    return "Please Wait While Your Instance is Being Setup";
  if (awsInstance.isStaticIp === true) return;

  const allocateIPResponse = await axios.post(
    `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/aws/allocateip` ||
      "http://localhost:5001/marketingplatform-3b5c7/us-central1/app/aws/allocateip",
    {
      instanceName: awsInstance.name,
      staticIpName: `StaticIp-${userId}`,
    }
  );

  return allocateIPResponse.status;
}
