import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Store, Wifi, Bell } from 'lucide-react-native';
import { Colors } from '../theme/colors';

interface HeaderProps {
  title: string;
  onNotificationPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onNotificationPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.logoBadge}>
          <Store size={18} color="#ffffff" />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Lane #01 • Sarah J.</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.onlineBadge}>
          <Wifi size={13} color={Colors.primary} />
          <Text style={styles.onlineText}>ONLINE</Text>
        </View>

        <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
          <Bell size={18} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#e6f7f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onlineText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
