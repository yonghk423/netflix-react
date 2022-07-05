import { rest } from "msw";

export const apiHandler = [
  rest.get("http://localhost:5000/products", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "1",  
          name: "America",
          imagePath: "/images/america.jpeg",
        },
        {
          id: "2",  
          name: "England",
          imagePath: "/images/england.jpeg",
        },
      ])
    );
  }),
  rest.get("http://localhost:5000/options", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Insurance",
        },
        {
          name: "Dinner",
        },
      ])
    );
  }),
  rest.post("http://localhost:5000/order", (req, res, ctx) => {
    let dummyData = [{ orderNumber: 2131234324, price: 2000 }];
    return res(ctx.json(dummyData));
  }),
];
