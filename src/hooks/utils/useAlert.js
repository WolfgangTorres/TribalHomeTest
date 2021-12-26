import { Alert } from 'react-native';

export const useAlert = ({ title, message = undefined, actions = [{ text: 'OK' }] }) => {
    return Alert.alert(
        title,
        message,
        actions
    );
};