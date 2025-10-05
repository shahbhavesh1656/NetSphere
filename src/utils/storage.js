import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
	async get(key, fallback = null) {
		try { const v = await AsyncStorage.getItem(key); return v != null ? JSON.parse(v) : fallback; } catch { return fallback; }
	},
	async set(key, value) {
		try { await AsyncStorage.setItem(key, JSON.stringify(value)); } catch {}
	},
	async remove(key) { try { await AsyncStorage.removeItem(key); } catch {} }
};
