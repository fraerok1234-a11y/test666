import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TestCardProps {
	title: string;
	subtitle: string;
	icon: string;
	onPress: () => void;
	color?: string;
}

const TestCard: React.FC<TestCardProps> = ({
	title,
	subtitle,
	icon,
	onPress,
	color = '#3498db'
}) => {
	return (
		<TouchableOpacity
			style={[styles.card, { backgroundColor: color }]}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<Text style={styles.icon}>{icon}</Text>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subtitle}>{subtitle}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		padding: 20,
		borderRadius: 12,
		marginBottom: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		minHeight: 100,
		justifyContent: 'center',
	},
	icon: {
		fontSize: 32,
		textAlign: 'center',
		marginBottom: 10,
	},
	title: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	subtitle: {
		color: 'rgba(255, 255, 255, 0.8)',
		fontSize: 14,
		textAlign: 'center',
		marginTop: 5,
	},
});

export default TestCard;

