import { describe, it, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import cryptoRoutes from "../src/routes/cryptoRoutes";
import { Crypto } from "../src/models/cryptoModel";

const app = express();
app.use(express.json());
app.use("/api", cryptoRoutes);

describe("Crypto Controller Tests", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb");
    await Crypto.deleteMany({});
  });

  afterAll(async () => {
    await Crypto.deleteMany({});
    await mongoose.connection.close();
  });

  it("should return stats for a cryptocurrency", async () => {
    await request(app)
      .get("/api/stats")
      .query({ coin: "bitcoin" })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("price");
        expect(res.body).toHaveProperty("marketCap");
        expect(res.body).toHaveProperty("24hChange");
      });
  });

  it("should return standard deviation for a cryptocurrency", async () => {
    const prices = [40000, 45000, 50000];
    for (const price of prices) {
      await Crypto.create({ coin: "bitcoin", price, marketCap: 0, change24h: 0 });
    }

    await request(app)
      .get("/api/deviation")
      .query({ coin: "bitcoin" })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("deviation");
        expect(res.body.deviation).toBeCloseTo(4082.48, 2);
      });
  });
});
