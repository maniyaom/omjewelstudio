import jwt from "jsonwebtoken";

function generateJWTAccessToken(user: { id: string; email: string }) {
  if (!user || !user.email || !user.id) {
    throw new Error("Failed to generate token: missing user data.");
  }
  const payload: {
    sub: string;
    email: string;
    iat: number;
    exp: number;
  } = {
    sub: user.id,
    email: user.email,
    iat: parseInt(String(Date.now() / 1000)),
    exp:
      parseInt(String(Date.now() / 1000)) +
      parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME!!),
  };
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET!!);
}

function generateJWTRefreshToken(id: string) {
  if (!id) {
    throw new Error("Failed to generate token: missing user id.");
  }
  const payload = {
    sub: id,
    type: "refresh",
    iat: Number.parseInt(String(Date.now() / 1000)),
    exp:
      Number.parseInt(String(Date.now() / 1000)) +
      Number.parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME!!),
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET!!);
}

function verifyJWTAccessToken(token: string) {
  return new Promise<string | Object>((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET!!,
      function (error, decoded) {
        if (error) {
          console.log(error);
          reject(error);
        } else if (decoded === undefined) {
          reject(new Error("Unable to verify the token."));
        } else {
          resolve(decoded);
        }
      }
    );
  });
}

function verifyJWTRefreshToken(token: string) {
  return new Promise<string | object>((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_REFRESH_TOKEN_SECRET!!,
      function (error, decoded) {
        if (error) {
          reject(error);
        } else if (decoded === undefined) {
          reject(new Error("Unable to verify the token."));
        } else {
          resolve(decoded);
        }
      }
    );
  });
}

export {
  generateJWTAccessToken,
  verifyJWTAccessToken,
  generateJWTRefreshToken,
  verifyJWTRefreshToken,
};
