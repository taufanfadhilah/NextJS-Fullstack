import { users } from "./data";

export default (req, res) => {
  const { method, body } = req;
  switch (method) {
    case "GET":
      res.status(200).json({
        status: 200,
        message: "Get all users data",
        data: users
      });
      break;
    case "POST":
      const { fullname, domicile } = JSON.parse(body);
      let newUser = {
        id: users.length + 1,
        fullname,
        domicile
      };
      users.push(newUser);
      res.status(200).json({
        status: 200,
        message: "Save data success",
        data: newUser
      });
      break;
  }
};
