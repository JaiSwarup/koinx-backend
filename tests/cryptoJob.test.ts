import { describe, it, beforeAll, afterAll, expect } from "vitest";
import mongoose from "mongoose";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Crypto } from "../src/models/cryptoModel";
import { fetchCryptoData } from "../src/jobs/cryptoJob";

const mockAxios = new MockAdapter(axios);

describe("Crypto Job Tests", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb");
    await Crypto.deleteMany({});
  });

  afterAll(async () => {
    await Crypto.deleteMany({});
    await mongoose.connection.close();
  });

  it("should fetch and store cryptocurrency data", async () => {
    const mockResponse = {
      bitcoin: {
        usd: 40000,
        usd_market_cap: 800000000,
        usd_24h_change: 3.4,
      },
      ethereum: {
        usd: 3000,
        usd_market_cap: 200000000,
        usd_24h_change: 2.1,
      },
      "matic-network": {
        usd: 1.5,
        usd_market_cap: 15000000,
        usd_24h_change: 1.8,
      },
    };

    mockAxios.onGet(/.*simple\/price.*/).reply(200, mockResponse);

    await fetchCryptoData();

    const bitcoin = await Crypto.findOne({ coin: "bitcoin" });
    const ethereum = await Crypto.findOne({ coin: "ethereum" });
    const matic = await Crypto.findOne({ coin: "matic-network" });

    expect(bitcoin?.price).toEqual(40000);
    expect(ethereum?.price).toEqual(3000);
    expect(matic?.price).toEqual(1.5);
  });
});
