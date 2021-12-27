# TribalHomeTest

## How to run the App locally

To run this app locally, you will need a server (to build the application) and a client (iOS or Android device or emulator) with the `Expo Go` application installed.

### .env file

- In the root directory create a `.env` file.

- Copy the values from `.env.example` file to the `.env` file.

  ```
  API_URL='api-url'
  API_KEY='api-key'
  ```

- Replace the placeholder values with the real values.

### Preparing the server
- Install the latest version of `expo-cli`, if you haven't already:

  ```
  npm install --global expo-cli
  ```

- Clone this repository:

  ```
  git clone url-from-green-code-button
  ```

- Enter the directory where this repository was cloned to:

  ```
  cd tribal-home-test
  ```

- Install the dependencies:
  ```
  npm install
  ```

- Start the server:

  ```
  npm start or expo start
  ```

- Keep the terminal open with the QR code clearly visible.

### Preparing the client

- Install and open `Expo Go`.
- Tap `Scan QR Code`.
- Scan the QR code that's visible in the terminal where the server is running. This will open the application in your client.

## Troubleshooting

### `Unable to resolve module XYZ`

It is likely an older version of the repository is being used.

- Stop the server with <kbd>Ctrl</kbd>+<kbd>C</kbd>.

- Delete previously installed packages:

  ```
  rm -rf node_modules
  ```

- Pull the latest changes:

  ```
  git pull
  ```

- Reinstall dependencies:

  ```
  npm install
  ```

- Restart the server:
  ```
  npm start or expo start
  ```

If the issue persists:

- Contact the developers of this application.
- Install the missing dependency:
  ```
  npm install XYZ
  ```