import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ShoppingCart,
  LayoutDashboard,
  Boxes,
  RotateCcw,
  Receipt,
  Clock,
  CloudUpload,
} from 'lucide-react-native';
import { PosBillingScreen } from '../screens/PosBillingScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { InventoryScreen } from '../screens/InventoryScreen';
import { ShiftZReportScreen } from '../screens/ShiftZReportScreen';
import { ReturnsRefundScreen } from '../screens/ReturnsRefundScreen';
import { TransactionsHistoryScreen } from '../screens/TransactionsHistoryScreen';
import { OfflineSyncScreen } from '../screens/OfflineSyncScreen';
import { Header } from '../components/Header';
import { Colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: ({ route }) => <Header title={route.name} />,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
        tabBarStyle: {
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Register"
        component={PosBillingScreen}
        options={{
          tabBarIcon: ({ color, size }) => <ShoppingCart size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Boxes size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Z-Report"
        component={ShiftZReportScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Refunds"
        component={ReturnsRefundScreen}
        options={{
          tabBarIcon: ({ color, size }) => <RotateCcw size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={TransactionsHistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Receipt size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Sync"
        component={OfflineSyncScreen}
        options={{
          tabBarIcon: ({ color, size }) => <CloudUpload size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
