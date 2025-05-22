import MyButton from '@/ui/button';
import { StyleSheet, TextInput, View } from 'react-native';

const StartScreen = () => {
	const handleReset = () => {
		console.log('reset');
	};
	const handleConfirm = () => {
		console.log('confirm');
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={{
					color: '#3e3940',
					fontSize: 24,
					fontWeight: 500,
					borderWidth: 1,
					borderColor: '#c64d9f',
					borderRadius: 16,
					padding: 12,
					width: '100%',
					backgroundColor: '#ececf4',
				}}
				placeholder="New input"
				maxLength={2}
				keyboardType="number-pad"
				// autoCapitalize='none'
				// autoCorrect={false}
			/>
			<View style={styles.buttonsContainer}>
				<MyButton style={styles.button} onPress={handleConfirm} title="Confirm" />
				<MyButton style={styles.button} color="white" onPress={handleReset} title="Reset" />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 12,
		width: '100%',
		padding: 16,
		backgroundColor: '#34325c',
		elevation: 3, // for android only
		shadowColor: '#00ceab', // for iOS only
		shadowOffset: { width: 0, height: 4 }, // for iOS only
		shadowOpacity: 0.7, // for iOS only
		shadowRadius: 8, // for iOS only
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: 'row',
		gap: 12,
	},
	button: {
		flex: 1,
	},
});

export default StartScreen;
