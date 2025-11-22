# Backend

This backend runs an Express server that calls the Hugging Face inference API. It is now configured to bind to a host and port from environment variables.

Usage:

1. Install dependencies

```bash
cd backend
npm install
```

2. Configure environment variables in `.env` (or directly in the shell):

```
HF_TOKEN=your_token_here
HOST=0.0.0.0
PORT=5000
```

3. Start the server (local):

```bash
npm start
```

4. Start the server and bind to all interfaces so it's reachable from other machines:

```bash
npm run start:net
```

5. Access the server from other machines using the host machine IP address and port, e.g. `http://192.168.1.42:5000/analyze`.

Security note: Binding to 0.0.0.0 exposes the server to external networks; ensure firewall rules and credentials are configured.
