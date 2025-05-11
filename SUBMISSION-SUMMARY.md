# Republic Challenge App - Submission Summary

## Overview

This React Native app built with Expo demonstrates a mobile investment platform that allows users to browse, follow, and interact with investment campaigns. The app includes authentication, campaign browsing, and user interaction features.

## Key Features Implemented

### Cross-Platform Compatibility

- Configured for both iOS and Android platforms
- Platform-specific API configurations (localhost:3000 for iOS, 10.0.2.2:3000 for Android)
- Network security configuration for Android to allow HTTP traffic during development

### Authentication

- PIN-based authentication with biometric options
- Secure storage for user credentials
- Mock API authentication endpoint

### Campaign Browsing and Interaction

- Home screen with paginated campaign listing
- Campaign detail view with company information
- Follow/unfollow functionality
- Filtering by categories

### UI Components

- Custom bottom sheet implementation
- Campaign cards with interactive elements
- Tab-based navigation
- Proper font loading for icons (Ionicons)

### API Integration

- Custom server implementation with required endpoints
- React Query for data fetching and caching
- Pagination support

### Development Setup

- Metro bundler configuration for asset loading
- Environment-specific configurations
- Comprehensive testing setup

## Technical Implementation

### State Management

- Zustand for global state management
- React Query for server state

### Navigation

- React Navigation with stack and tab navigators
- Type-safe navigation with TypeScript

### Testing

- Jest and React Native Testing Library
- Mocks for external dependencies
- Component and screen tests

### Code Quality

- ESLint and Prettier for code formatting
- TypeScript for type safety
- Organized project structure

## Running the App

1. Start the server:

   ```
   npm run server
   ```

2. Run on iOS:

   ```
   npm run ios
   ```

3. Run on Android:
   ```
   npm run android
   ```

## Known Limitations

- Mock authentication (no real backend)
- Limited offline support
- Some UI components could be further refined

## Future Enhancements

- Real authentication backend integration
- Offline support with data persistence
- Enhanced animations and transitions
- Additional campaign filtering options
- Push notifications
