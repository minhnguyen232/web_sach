const token = (length) => {
  return Math.random().toString(length).substring(2, length);
};
const jwtVariable = () => {
  let jwt = {
    accessTokenSecret: "SecretKey_Min",
    accessTokenLife: "10m",
    refreshTokenSize: 100,
  };
  return jwt;
};
const RandomString = (length) => {
  const characters = '0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString;
}
module.exports = {
  token,
  jwtVariable,
  RandomString
};
