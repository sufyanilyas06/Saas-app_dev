# FreshPOS Mobile (React Native CLI)

Cross-platform Mobile POS application converted from the FreshPOS web codebase.

---

## 🛠️ Prerequisites

Before running the application, make sure your computer has:
1. **Node.js**: >= 18.0.0 (`node -v`)
2. **JDK (Java Development Kit)**: JDK 17 (`javac -version`)
3. **Android Studio**: With Android SDK Platform-Tools and an Android Virtual Device (AVD) or physical device connected via USB with USB Debugging enabled.

---

## 🚀 How to Run the App Step-by-Step

### 1. Open Terminal and Navigate to Mobile Directory
```bash
cd mobile
```

### 2. Install Dependencies
```bash
npm install
```

*(If running on macOS for iOS):*
```bash
cd ios && pod install && cd ..
```

### 3. Start Metro Bundler
In your terminal, start the local development server:
```bash
npm start
```

### 4. Launch on Android (in a New Terminal Tab)
Open a second terminal window or tab, navigate to the `mobile` folder, and execute:
```bash
npm run android
```

*(Or for iOS on macOS):*
```bash
npm run ios
```

---

## 📁 Mobile Architecture

- **`App.tsx`**: Mobile application entry point with `SafeAreaProvider`, `NavigationContainer`, and dark/light `StatusBar`.
- **`src/navigation/TabNavigator.tsx`**: Bottom tabs navigation for Register, Dashboard, Inventory, Shift Z-Report, Refunds, Orders, and Offline Sync.
- **`src/services/db.ts`**: Persistent offline-first database using `@react-native-async-storage/async-storage` with pending mutation sync queues.
- **`src/screens/`**:
  - `PosBillingScreen.tsx`: Rapid touch catalog, category pills, real-time cart drawer, and card/cash/QR tenders.
  - `DashboardScreen.tsx`: Retail metrics, revenue graphs, and Gemini AI forecasting copilot.
  - `ShiftZReportScreen.tsx`: Till denominations audit, variance calculations, and cashier lockouts.
  - `InventoryScreen.tsx`: Stock management with quick adjustments and low-stock alerts.
  - `ReturnsRefundScreen.tsx`: Invoice refunds, inventory restocking policy, and manager PIN override.
  - `TransactionsHistoryScreen.tsx`: Full audit log of completed invoices and receipt reprints.
  - `OfflineSyncScreen.tsx`: Live offline queue monitor with manual cloud reconciliation.
- **`src/theme/colors.ts`**: Retail emerald, dark navy, and contrast color tokens.
