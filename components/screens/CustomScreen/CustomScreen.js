import React, { useState, useEffect } from 'react'
import { TouchableOpacity, FlatList } from 'react-native'
import { Container, Button, Text, Card, Icon, Content, Right, Header, Body, Left } from 'native-base'
import ProgressCircle from 'react-native-progress-circle';

import colors from '../../../constants/colors'
import { updateSubjects, fetchSubjects } from '../../functions/subjects'
import SubjectCard from './SubjectCard'
import gstyles from '../../../constants/gstyles'
// import { useNavigation } from '@react-navigation/native';

export default CustomScreen = ({ navigation }) => {
    // const navigation = useNavigation();
    const [subjects, setSubjects] = useState()
    const [lastOp, setLastOp] = useState()

    useEffect(() => {
        fetchSubjects().then(res => {
            if (res)
                setSubjects(res)
            else
                navigation.navigate('Edit Subjects')
        })

    }, []);

    const presentClicked = (index) => {
        try {
            
            const data = [...subjects];
            data[index].present=data[index].present+1;
            data[index].total=data[index].total+1;

            updateSubjects(data).then(() => setSubjects(data))

        }
     
        catch(e) {
            alert(e);
        }
    }

    const bunkedClicked = async (index) => {
        try {
            const data = [...subjects];
            data[index].total=data[index].total+1;
            updateSubjects(data).then(() => setSubjects(data))
        }
     
        catch(e) {
            alert(e);
        }
    }

    return (
        <Container>
            <Header style={{ backgroundColor: '#fff' }} androidStatusBarColor='#fff' iosBarStyle='dark-content'>
                <Left>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon name='menu' style={{ padding: 10, color: colors.color5, }} />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Text style={{
                        fontSize: 22, fontWeight: 'bold',
                        color: colors.color5,
                    }}>
                        Bunker
                        </Text>
                </Body>

                <Right>
                    <TouchableOpacity onPress={() => alert('undo')}>
                        <Text style={{
                            paddingRight: 10, color: colors.color5,
                            fontWeight: 'bold',
                        }}>
                            <Icon name='refresh' style={{ fontSize: 20, color: colors.color5 }} />
                            {''} Undo
                            </Text>
                    </TouchableOpacity>
                </Right>
            </Header>
            <FlatList
                data={subjects}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <SubjectCard item={item} presentClicked = {() => presentClicked(index)}
                    bunkedClicked = {() => bunkedClicked(index)} percent={75} />

                )}
            />
        </Container >

    )
}

