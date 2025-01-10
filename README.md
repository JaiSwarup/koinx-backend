# Crypto Statistics API

The Crypto Statistics API provides essential cryptocurrency data such as price, market capitalization, 24-hour price changes, and the standard deviation of historical prices. This API enables users to fetch statistics for a specific cryptocurrency and compute analytics for better decision-making.
The API is available at 

---

## Features

1. Fetch live cryptocurrency statistics (price, market cap, 24-hour change).
2. Compute the standard deviation of historical prices stored in the database on over 100 records.

---

## Routes

### `/stats`
![stats-bitcoin](https://raw.githubusercontent.com/JaiSwarup/koinx-backend/refs/heads/main/assets/stats.png)

### `/deviation`
![deviation-bitcoin](https://raw.githubusercontent.com/JaiSwarup/koinx-backend/refs/heads/main/assets/deviation.png)

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime for the server-side logic.
- **Express**: Web framework for routing and request handling.
- **MongoDB**: Database for storing historical price data.

### APIs and Libraries
- **CoinGecko API**: Fetches real-time cryptocurrency data.
- **Axios**: For making HTTP requests.
- **Mongoose**: MongoDB object modeling for schema and queries.
- **Node-Cron**: Node.js library used for scheduling tasks at intervals.

### Testing
- **Vitest**: Unit testing framework.
- **Supertest**: HTTP assertion library for testing Express routes.

---

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JaiSwarup/koinx-backend.git
   cd koinx-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file with the following:
   ```env
   DATABASE_URL==<your-mongo-db-uri>
   PORT=3000
   ```
4. **Start the development server**
    ```bash
    npm run dev
    ```

4. **Run the application**:
   ```bash
   npm start
   ```

5. **Run tests**:
   ```bash
   npm test
   ```

---

## Deployment Options

- MongoDB database deployed using MongoDB Atlas.
- Node.js Containerized using Docker
- Deployed to Render

---

## Future Improvements

1. **Authentication**:
   - Add API key-based authentication for rate-limiting and secure access.

2. **Caching**:
   - Implement caching with **Redis** to improve performance for frequently requested data.

3. **Support for Multiple Currencies**:
   - Extend the API to support additional fiat currencies (e.g., EUR, GBP).


---

## Contribution
Contributions are welcome! Please create a pull request or raise an issue for any suggestions or bugs.

---

## Contact
For inquiries or support, reach out at **jaiswarup0@gmail.com**.
