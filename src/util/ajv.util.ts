import Ajv from "ajv";

const ajv = new Ajv();
export function getAjvInstance() {
  return ajv;
}
