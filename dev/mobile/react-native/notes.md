# REACT NATIVE

## Why to learn? 

- Mobile First
- If you're building anything for consumers (kids, schools, daily apps, creators), mobile is mandatory.
- Access to native features.

## Essentials

| **Topic**                  | **Description / What to Focus On**                                                                 |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| **Project Initialization** | Use `Expo CLI` for easy setup. Understand structure: `App.js`, assets, components.                 |
| **Core Components**        | `View`, `Text`, `Image`, `ScrollView`, `TouchableOpacity`, `FlatList`.                             |
| **Styling**                | No CSS files — use `StyleSheet.create()` or Tailwind RN. Flexbox is the default layout model.      |
| **Navigation**             | Use `react-navigation` with `Stack`, `Tab`, or `Drawer`. Learn screen routing & param passing.     |
| **Hooks & State**          | Same as React: `useState`, `useEffect`, `useContext`. Global state via Context or Zustand/Redux.   |
| **Input Handling**         | `TextInput`, `onChangeText`, keyboard handling with `KeyboardAvoidingView`.                        |
| **Media & Voice I/O**      | `expo-av` (record/playback), `expo-speech` (TTS), `expo-camera`.                                   |
| **Networking**             | Use `fetch` or `axios`. Handle async API calls (e.g. OpenAI, backend services).                    |
| **State Persistence**      | `AsyncStorage` (local), `SecureStore` (auth), or external: Firebase, Supabase.                     |
| **Animations**             | Use `Lottie` for fun character effects, or `react-native-reanimated` for advanced UI interactions. |
| **Assets Handling**        | Import local images/audio/fonts via `require()` or use CDN URLs.                                   |
| **Permissions**            | Handle runtime permissions (mic, camera) via `expo-permissions` or config plugins.                 |
| **Platform-Specific Code** | Use `Platform.OS` to write conditionals for iOS/Android differences.                               |
| **Build & Deploy**         | Use `EAS Build` (Expo) to build for Android/iOS. Upload to Play Store or TestFlight.               |
| **OTA Updates**            | Expo supports Over-the-Air updates without going through app stores.                               |
| **Debugging**              | Use Expo DevTools, React Native Debugger, Flipper.                                                 |

## Extras for Talking Tom

| **Addon**                           | **Use Case**                             |
| ----------------------------------- | ---------------------------------------- |
| `react-native-svg`                  | Custom stickers, badges, or vector UI    |
| `react-native-sound`                | Play cute sound effects                  |
| `@react-native-voice`               | Raw voice-to-text (if not using Whisper) |
| `react-native-push-notification`    | Reminders / daily pet check-ins          |
| `react-native-gesture-handler`      | Pet tap/reaction gestures                |
| `react-native-paper` or `shadcn/ui` | UI component libraries                   |
