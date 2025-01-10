import { describe, it, beforeAll, afterAll, expect } from "vitest";
import mongoose from "mongoose";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Crypto } from "../src/models/cryptoModel";
import cryptoService from "../src/services/cryptoService";

const mockAxios = new MockAdapter(axios);

describe("Crypto Service Tests", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb");
  });

  afterAll(async () => {
    await Crypto.deleteMany({});
    await mongoose.connection.close();
  });

  it("should fetch stats for a cryptocurrency", async () => {
    const mockResponse = {
      bitcoin: {
        usd: 40000,
        usd_market_cap: 800000000,
        usd_24h_change: 3.4,
      },
    };

    mockAxios.onGet(/.*simple\/price.*/).reply(200, mockResponse);

    const stats = await cryptoService.getStats("bitcoin");

    expect(stats).toEqual({
      price: 40000,
      marketCap: 800000000,
      "24hChange": 3.4,
    });
  });

  it("should calculate standard deviation for a cryptocurrency", async () => {
    const prices = [40000, 45000, 50000];
    for (const price of prices) {
      await Crypto.create({ coin: "bitcoin", price, marketCap: 0, change24h: 0 });
    }

    const result = await cryptoService.getStandardDeviation("bitcoin");

    // Standard deviation formula result
    expect(result).not.toBeNull();
    expect(result![0].standardDeviation).toBeCloseTo(4082.48, 2);
  });
});
