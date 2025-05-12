# React Native Tech Challenge - Republic

This project is an implementation for Part I of the React Native Senior Engineer Technical Challenge for Republic.


## iOS
https://github.com/user-attachments/assets/d7cabe6c-5a15-471f-9c70-c8d5fb83d72d

## Android
https://github.com/user-attachments/assets/0802919c-f667-4b9b-9bef-dcdd8f00f6d4

## Splash
<img width="537" alt="splashScreen" src="https://github.com/user-attachments/assets/1df89460-3e0b-4464-b85e-6f8118476bfd" />


## Project Overview

The objective was to build the foundation of a React Native app that includes authentication (PIN and biometric), a home screen to list investment campaigns, navigation, and local state management for user interactions (follow/hide campaigns). The application was developed focusing on code quality and scalable architecture.

## Implemented Features

1. **Project Setup:**

   - Built with Expo using `expo-dev-client` for access to native layer.
   - Developed with TypeScript.

2. **Mock API Server:**

   - `json-server` configured to simulate a REST API with data provided in `db.json`.
   - Custom server implementation with the following endpoints:
     - `/auth/login` - Stubbed authentication endpoint
     - `/api/campaigns` - Fetching campaigns with pagination and category filtering
     - `/api/campaigns/:id/follow` - Follow a campaign
     - `/api/campaigns/:id/unfollow` - Unfollow a campaign
   - Start the server with:

   ```bash
   node server.js
   ```

3. **Splash Screen:**

   - Configured using `expo-splash-screen`.
   - App icon and splash assets can be customized as needed.

4. **Authentication Flow:**

   - **First Access:**
     - Prompts the user to create a 4-6 digit PIN.
     - Offers the option to enable biometric authentication (Face ID/Fingerprint) if available and configured on the device.
   - **Subsequent Access:**
     - Attempts biometric authentication automatically if enabled.
     - Falls back to PIN entry if biometrics fail, are not enabled, or not configured.
   - **Secure Storage:** Credentials (PIN and biometric preference) are securely stored using `expo-secure-store`.

5. **Navigation:**

   - Uses `react-navigation`.
   - **Main Navigation (AppNavigator):** Controls the flow between authentication and the main app.
   - **Authentication Stack (AuthStackNavigator):**
     - `PinCreateScreen`: For PIN creation and biometric activation.
     - `PinLoginScreen`: For login with PIN or biometrics.
   - **Main App Navigation (MainTabNavigator):**
     - **Invest (Home):** Main tab, implemented as a stack (`InvestStackNavigator`) containing:
       - `HomeScreen`: Displays the list of campaigns.
       - `FollowedCampaignsScreen`: Displays followed campaigns.
       - `HiddenCampaignsScreen`: Displays hidden campaigns.
     - **Discussions:** Placeholder tab.
     - **Notifications:** Placeholder tab with a button to simulate push notification permission request.

6. **Home Screen (Invest Tab):**

   - Displays a list of campaigns with pagination (infinite scroll) and "pull to refresh".
   - **Campaign Card:**
     - Cover image, logo, name, description, percentage raised, days remaining, and valuation.
     - **Long-press on card:** Opens a Bottom Sheet (`@gorhom/bottom-sheet`) with more campaign information (equity, tax eligibility, city/country, investment goal).
     - **Swipe right:** Follows/Unfollows a campaign (with animation and visual feedback).
     - **Swipe left:** Hides the campaign (with shrinking animation and removal from the main list).
   - **Local State Management (Zustand):**
     - `authStore`: Manages authentication state, PIN, and biometric preference.
     - `campaignStore`: Manages the IDs of followed and hidden campaigns, persisting this data with `AsyncStorage`.
   - **Additional Screens:** Access via icons in the `HomeScreen` header to view lists of followed and hidden campaigns.

7. **Tech Stack:**
   - **React Native (Expo with dev-client)**
   - **TypeScript**
   - **React Navigation** for navigation.
   - **React Query** for data fetching and caching (campaign list).
   - **Zustand** for global and local state management.
   - **`expo-secure-store`** for secure storage.
   - **`expo-local-authentication`** for biometrics.
   - **`react-native-gesture-handler`** and **`react-native-reanimated`** for gestures and animations.
   - **`@gorhom/bottom-sheet`** for the campaign details modal.
   - **`json-server`** for the API mock.
   - **`expo-haptics`** for tactile feedback.
   - **ESLint** and **Prettier** for code quality and consistent formatting.

## Project Structure

The directory structure follows a common pattern for React Native projects, aiming for modularity and organization:

```
/republic-challenge-app
  /assets                 # (For icons, fonts, images)
  /src
    /api                  # json-server configuration and React Query hooks
    /components           # Reusable components (auth, campaigns, common)
      /auth
      /campaigns
      /common
    /config               # Constants, application configurations
    /hooks                # Custom hooks
    /navigation           # Navigators (Stack, Tab) and route configurations
    /screens              # Screen components (auth, main)
      /auth
      /main
    /services             # Service logic (e.g.: biometricAuthService)
    /store                # Zustand stores (authStore, campaignStore)
    /styles               # Global styles, theme
    /types                # TypeScript type definitions (Campaign, etc.)
    /utils                # General utility functions
  App.tsx                 # Main application entry point
  babel.config.js
  db.json                 # Data file for json-server
  package.json
  tsconfig.json
  .eslintrc.js            # ESLint configuration
  .prettierrc             # Prettier configuration
  # ... other configuration files (eas.json, app.json)
```

## Setup and Execution

**Prerequisites:**

- Node.js (LTS recommended)
- npm or Yarn
- Expo CLI (global or via npx): `npm install -g expo-cli` (if opting for global)
- A physical device or Android/iOS emulator/simulator.
- For `expo-dev-client`, you'll need to build the development client app.

**1. Clone the Repository (if applicable) or Extract the Files:**

```bash
# git clone <repository-url>
# cd republic-challenge-app
```

**2. Install Dependencies:**

```bash
npm install
# or
# yarn install
```

**3. Configure the Mock Server:**

The `db.json` file is already in the project root and correctly formatted.

In a separate terminal, at the project root (`/republic-challenge-app`), run:

```bash
# Start the custom server with all required endpoints
node server.js
```

This will start the server on port `3000` with the following endpoints:

- `/auth/login` - Authentication (stubbed)
- `/api/campaigns` - Campaigns with pagination and category filtering
- `/api/campaigns/:id/follow` - Follow a campaign
- `/api/campaigns/:id/unfollow` - Unfollow a campaign

**Important Network Configuration Notes:**

- **For iOS**: The app will connect to the server using `localhost:3000`
- **For Android**: The app will connect to the server using `10.0.2.2:3000` (special IP that Android emulators use to access the host machine)
- **Network Security**: The Android app includes a network security configuration to allow cleartext (HTTP) traffic for development purposes

If you encounter network issues:

1. Make sure the JSON server is running with `--host 0.0.0.0` to accept connections from all interfaces
2. For Android, if using a physical device or non-standard emulator, you may need to update the API base URL in `src/config/api.ts` with your computer's actual IP address

**4. Run the React Native Application:**

- **Build the Dev Client (if you don't have one yet):**
  To use native features like `expo-secure-store` and `expo-local-authentication` in a development environment other than Expo Go, you need a development client.

  ```bash
  # For Android
  npx expo run:android
  # For iOS
  npx expo run:ios
  ```

  This will build and install the client app on your device/emulator. Follow the instructions in the terminal.

- **Start the Expo Development Server:**
  After the dev client is installed on the device/emulator, start the development server:

  ```bash
  npm start
  # or
  # yarn start
  # or
  # npx expo start --dev-client
  ```

  This will open the Metro Bundler. You can then open the development client app on your device/emulator, and it should connect to the Metro server.

  **Note:** If you encounter a port conflict (e.g., "Port 8081 is already in use"), you can:

  - Accept the prompt to use an alternative port (e.g., 8082)
  - Or kill the process using port 8081 before starting:
    ```bash
    # On macOS/Linux
    lsof -i :8081 | grep LISTEN | awk '{print $2}' | xargs kill -9
    # On Windows
    netstat -ano | findstr :8081
    # Then use the PID to kill the process
    taskkill /F /PID <PID>
    ```

**5. Linting and Formatting:**

The project includes ESLint and Prettier for code quality and consistent formatting.

- **Run ESLint:**

  ```bash
  # Check for linting issues
  npm run lint

  # Fix auto-fixable linting issues
  npm run lint:fix
  ```

- **Run Prettier:**

  ```bash
  # Format all files
  npm run format

  # Check if files are correctly formatted
  npm run format:check
  ```

**Expected Flow:**

1. When opening the app for the first time, you'll be directed to the `PinCreateScreen`.
2. Create a PIN and opt in (or not) for biometrics.
3. In subsequent accesses, the app will try biometrics (if enabled) or ask for the PIN in the `PinLoginScreen`.
4. After authentication, you'll see the `HomeScreen` with the campaign list.

## Technical Decisions and Tradeoffs

- **Expo with Dev Client vs. Bare React Native:** Chose Expo with `expo-dev-client` to facilitate initial configuration and access to libraries from the Expo ecosystem that handle native functionalities (`expo-secure-store`, `expo-local-authentication`), while also allowing the inclusion of any native code if necessary, as required for biometrics.
- **`json-server`:** Selected for the simplicity in quickly setting up a REST API mock. For more complex API functionalities (advanced filters, complex write logic), MirageJS or MSW would be more robust alternatives, but `json-server` serves the requirements for simple reading and pagination well.
- **Platform-Specific Network Configuration:** The app uses different API base URLs depending on the platform:
  - iOS uses `localhost:3000` to connect to the JSON server
  - Android uses `10.0.2.2:3000` (special IP that Android emulators use to access the host machine)
  - Android also includes a network security configuration to allow cleartext (HTTP) traffic for development
- **Zustand:** Selected for its simplicity, minimal API, and good performance for state management. The persistence of `campaignStore` was done with `AsyncStorage` through Zustand's `persist` middleware, which is suitable for non-sensitive data such as IDs of followed/hidden campaigns.
- **React Query:** Used for campaign data fetching, offering caching, background updates, and simplifying loading/error state management.
- **PIN Storage:** `expo-secure-store` was used for the PIN, which is the recommendation for sensitive data in Expo.
- **Animations:** `react-native-reanimated` was used for swipe animations on cards, providing smoother animations executed on the UI thread.
- **Navigation to List Screens (Followed/Hidden):** Chose to add icons in the `HomeScreen` header for access to these lists, instead of dedicated tabs, to keep the `BottomTabNavigator` more streamlined with the three main requested tabs.
- **Haptic Feedback:** Used `expo-haptics` to provide tactile feedback when the user interacts with elements like cards and the bottom sheet.
- **ESLint & Prettier:** Used for code quality and consistent formatting across the project, with customized configurations to fit React Native and TypeScript best practices.

## Possible Improvements / Future Work

- **Tests:** Add unit and integration tests (Jest, React Native Testing Library).
- **Complete Design System:** Implement a more robust design system with theme (colors, typography, spacing) for greater visual consistency.
- **Error Handling:** Improve API error handling and visual feedback for the user.
- **Performance Optimizations:** For very large lists, investigate additional optimizations (e.g., `react-native-largelist` or `recyclerlistview`), although `FlatList` with `useMemo` and `React.memo` (if applicable to cards) is generally sufficient for many cases.
- **Real Assets:** Integrate real brand splash screen and icons.
- **Internationalization (i18n).**
- **Accessibility (a11y):** Review and improvements to ensure greater accessibility.

## Additional Notes

- API endpoints:
  - Authentication: `http://localhost:3000/auth/login` (iOS) or `http://10.0.2.2:3000/auth/login` (Android)
  - Campaigns: `http://localhost:3000/api/campaigns` (iOS) or `http://10.0.2.2:3000/api/campaigns` (Android)
  - Follow/Unfollow: `http://localhost:3000/api/campaigns/:id/follow` and `/unfollow` (iOS) or equivalent Android URLs
- Pagination in the `HomeScreen` is configured to load 5 items per page.
- **Troubleshooting Network Issues:**
  - If you encounter "Network request failed" errors:
    1. Make sure the server is running with `node server.js`
    2. For Android emulators, verify that `10.0.2.2:3000` is used in the API configuration
    3. For Android physical devices, update the API base URL in `src/config/api.ts` with your computer's actual IP address
    4. For iOS, ensure that `localhost:3000` is used in the API configuration
  - If you encounter port conflicts with Metro bundler:
    1. Accept the prompt to use an alternative port (e.g., 8082)
    2. Or kill the process using port 8081 before starting the app
