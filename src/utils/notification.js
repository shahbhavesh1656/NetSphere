// utils/notification.js
import * as Notifications from 'expo-notifications';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Schedule a local notification
 * @param {string} title - Notification title
 * @param {string} body - Notification message
 * @param {number} seconds - Delay in seconds
 */
export const scheduleNotification = async (title, body, seconds = 5) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: { seconds },
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};
