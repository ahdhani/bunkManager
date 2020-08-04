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
            console.log(' updated')
            return resolve(true);

        } catch (e) {
            return reject(e);
        }

    });

}