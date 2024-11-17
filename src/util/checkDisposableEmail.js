import trustemail from "../data/trustemail.json";

const isDisposableEmail = (email) => {
  const domain = email.split("@")[1];
  return trustemail.includes(domain);
};

export { isDisposableEmail };
