import { users } from "./data";

export default (req, res) => {
  const {
    method,
    query: { id },
    body
  } = req;

  switch (method) {
    case "PUT":
      const { fullname, domicile } = JSON.parse(body);
      let index = users.findIndex(e => e.id == id);
      users[index] = { id, fullname, domicile };
      res.status(200).json({
        status: 200,
        message: "Update data success",
        data: users
      });
      break;

    case "DELETE":
      users.splice(
        users.findIndex(e => e.id === id),
        1
      );
      res.status(200).json({
        status: 200,
        message: "Delete data success",
        data: users
      });
      break;
  }
};
