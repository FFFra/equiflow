# Pre-Submission Checklist for Republic Challenge App

## Code Quality

- [x] All linting errors fixed (`npm run lint:fix`)
- [x] All tests passing (`npm test -- --no-watchman`)
- [x] Code formatting consistent (`npm run format`)

## Server Configuration

- [x] Server running correctly on port 3000 (`npm run server`)
- [x] API endpoints working:
  - [x] Authentication: `/auth/login`
  - [x] Campaigns: `/api/campaigns` (with pagination and category filtering)
  - [x] Follow campaign: `/api/campaigns/:id/follow`
  - [x] Unfollow campaign: `/api/campaigns/:id/unfollow`

## Platform-Specific Configuration

- [x] iOS:

  - [x] API configured to use `localhost:3000`
  - [x] Ionicons font loaded correctly
  - [x] App builds and runs on iOS simulator/device

- [x] Android:
  - [x] API configured to use `10.0.2.2:3000` (for emulator)
  - [x] Network security configuration allows cleartext traffic
  - [x] `local.properties` file exists with correct SDK location
  - [x] App builds and runs on Android emulator/device

## Metro Bundler Configuration

- [x] `metro.config.js` configured correctly:
  - [x] Asset extensions properly set
  - [x] Server host set to `0.0.0.0` to allow external connections

## Final Testing Steps

1. Start the server: `npm run server`
2. In a new terminal, run the app on iOS: `npm run ios`
3. Verify all screens and functionality work correctly on iOS
4. Stop the iOS app
5. Run the app on Android: `npm run android`
6. Verify all screens and functionality work correctly on Android

## Verification Results

- ✅ Server is running and responding to API requests
- ✅ All tests are passing
- ✅ Code is properly formatted and linting passes
- ✅ iOS app builds and runs correctly
- ✅ Android app builds and runs correctly (with proper SDK configuration)
- ✅ Cross-platform compatibility confirmed

## Common Issues and Fixes

### Network Connectivity

- If Android fails to connect, verify `10.0.2.2:3000` is used in API config
- For physical Android devices, update API base URL with your computer's IP address
- Verify network security config allows cleartext traffic

### Android SDK Location

- If Android build fails with SDK location error, create or update `android/local.properties` with:
  ```
  sdk.dir=/path/to/your/Android/sdk
  ```

### Asset Loading

- If assets fail to load, check `metro.config.js` for proper asset extensions

### Font Loading

- If icons don't appear, verify Ionicons font is loaded in `App.tsx`
