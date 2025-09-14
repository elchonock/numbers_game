import SubTitle from '@/components/subtitle';
import Title from '@/components/title';
import MyButton from '@/ui/button';
import NumericInput from '@/ui/input';
import MyText from '@/ui/text';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

const NumberValidatorSchema = z.object({
  number: z.string().pipe(z.coerce.number({ message: 'Should be a number between 1 and 99' }).min(1).max(99)),
});

type FormValues = z.infer<typeof NumberValidatorSchema>;

interface StartScreenProps {
  setNumber: (number: number | null) => void;
}

const StartScreen = ({ setNumber }: StartScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ resolver: zodResolver(NumberValidatorSchema), mode: 'onChange' });

  const handleReset = () => {
    reset();
    setNumber(null);
  };

  const handleConfirm: SubmitHandler<FormValues> = ({ number }) => {
    setNumber(number ?? null);
  };

  return (
    <View style={styles.container}>
      <Title color="red">START</Title>

      <View style={styles.contentContainer}>
        <SubTitle>Enter a number between 1 and 99 to start the Game</SubTitle>

        <Controller
          control={control}
          name="number"
          render={({ field: { onBlur, onChange, value } }) => (
            <NumericInput
              value={value}
              onBlur={onBlur}
              onChangeText={(val) => {
                if (!isNaN(+val)) {
                  onChange(val);
                }
              }}
            />
          )}
        />

        {errors && <MyText color="red">{errors.number?.message}</MyText>}

        <View style={styles.buttonsContainer}>
          <MyButton
            style={styles.button}
            color="green"
            onPress={handleSubmit(handleConfirm)}
            title="Confirm"
            iconName="check"
            disabled={!isValid}
          />
          <MyButton style={styles.button} color="white" onPress={handleReset} title="Reset" iconName="cross" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    padding: 16,
  },
  contentContainer: {
    alignItems: 'center',
    gap: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
  },
});

export default StartScreen;
