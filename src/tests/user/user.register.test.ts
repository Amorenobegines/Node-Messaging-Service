/*import request from "supertest";
import server from "../../app/server";
import { AppDataSource } from "../../database/data-source";

describe("POST /users/register", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("debería registrar un usuario correctamente", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({
        name: "Alicia",
        email: "alicia@test.com",
        password: "123456"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).not.toHaveProperty("password");
  });

  it("debería fallar si el email ya existe", async () => {
    await request(app).post("/users/register").send({
      name: "Alicia",
      email: "duplicado@test.com",
      password: "123456"
    });

    const res = await request(app).post("/users/register").send({
      name: "Alicia",
      email: "duplicado@test.com",
      password: "123456"
    });

    expect(res.status).toBe(409);
  });

  it("debería fallar si los datos son inválidos", async () => {
    const res = await request(app).post("/users/register").send({
      email: "malformado",
      password: ""
    });

    expect(res.status).toBe(400);
  });
});
*/