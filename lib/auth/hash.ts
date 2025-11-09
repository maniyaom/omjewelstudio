import bcrypt from "bcrypt";

const SALT_ROUNDS = Number(process.env.BCRYPT_ROUNDS ?? 12);

function hashPassword(password: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, function (error, hashedPassword) {
      if (error) {
        console.log("Failed to hash password");
        reject(new Error("Internal server error"));
      } else if (hashedPassword) {
        resolve(hashedPassword);
      }
    });
  });
}

function comparePassword(password: String, hashedPassword: String) {
  return new Promise<string | boolean>((resolve, reject) => {
    bcrypt.compare(
      password.toString(),
      hashedPassword.toString(),
      function (error, result) {
        if (error) {
          console.log("Failed to compare password");
          reject(new Error("Internal server error"));
        } else {
          resolve(result);
        }
      }
    );
  });
}

export { hashPassword, comparePassword };
