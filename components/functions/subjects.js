import { AsyncStorage } from 'react-native';

export const fetchSubjects = () => {

    return AsyncStorage.getItem('subjects').then(subjects => {
        if (subjects && subjects.length > 2) {
            return JSON.parse(subjects)
        }
    })
}


export const updateSubjects = (subjects) => {

    return new Promise(async (resolve, reject) => {

        try {
            await AsyncStorage.removeItem('subjects');
            await AsyncStorage.setItem('subjects', JSON.stringify(subjects));
            return resolve(true);

        } catch (e) {
            return reject(e);
        }

    });

}

export const fetchConfig = () => {

    return AsyncStorage.getItem('config').then(config => {
        if (config && config.length > 2) {
            return JSON.parse(config)
        }
    })
}


export const updateConfig = (data) => {

    return new Promise(async (resolve, reject) => {

        try {
            await AsyncStorage.removeItem('config');
            await AsyncStorage.setItem('config', JSON.stringify(data));
            return resolve(true);

        } catch (e) {
            return reject(e);
        }

    });

}