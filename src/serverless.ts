
import app from "./index";
import serverless from 'serverless-http';

console.log("Transitioning to Serverless Architecture");
const handlerBase = serverless(app);

export const handler = async (event: any, context: any) => {
  console.log("Lambda invoked with event:", JSON.stringify(event));
  const response = await handlerBase(event, context);
  console.log("Response:", JSON.stringify(response));
  return response;
};
