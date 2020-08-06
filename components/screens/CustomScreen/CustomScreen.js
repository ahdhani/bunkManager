import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity, FlatList } from 'react-native'
import { Container, Button, Text, Card, Icon, Content, Right, Header, Body, Left } from 'native-base'
import ProgressCircle from 'react-native-progress-circle';

import colors from '../../../constants/colors'
import { updateSubjects, fetchSubjects, fetchConfig } from '../../functions/subjects'
import SubjectCard from './SubjectCard'

export default CustomScreen = ({ navigation }) => {
    // const navigation = useNavigation();
    const [subjects, setSubjects] = useState()
    const [lastOp, setLastOp] = useState()
    const [percent, setPercent] = useState()

    useFocusEffect(
        React.useCallback(() => {
            fetchConfig().then(res => {
                if (res) {
                    setPercent(res.percent)
                }
                else
                    navigation.navigate('Configure')
            })
    
            fetchSubjects().then(res => {
                if (res)
                    setSubjects(res)
                else
                    navigation.navigate('Edit Subjects')
            })
    
        }, [])
      );

    // useEffect(() => {

    //     fetchConfig().then(res => {
    //         if (res) {
    //             setPercent(res.percent)
    //         }
    //         else
    //             navigation.navigate('Configure',
    //                 {
    //                     onGoBack: () => fetchConfig().then(res => setPercent(res.percent)),
    //                 })
    //     })

    //     fetchSubjects().then(res => {
    //         if (res)
    //             setSubjects(res)
    //         else
    //             navigation.navigate('Edit Subjects')
    //     })

    // }, []);

    const undoHandler = () => {
        // if (lastOp) {
        if (lastOp.op === 0) {
            const data = [...subjects];
            data[lastOp.index].total = data[lastOp.index].total - 1;

            updateSubjects(data).then(() => {
                setLastOp(null)
                setSubjects(data)
            })
        }
        else if (lastOp.op === 1) {
            const data = [...subjects];
            data[lastOp.index].total = data[lastOp.index].total - 1;
            data[lastOp.index].present = data[lastOp.index].present - 1;

            updateSubjects(data).then(() => {
                setLastOp(null)
                setSubjects(data)
            })
        }
        // }
    }

    const presentClicked = (index) => {
        try {

            const data = [...subjects];
            data[index].present = data[index].present + 1;
            data[index].total = data[index].total + 1;

            updateSubjects(data).then(() => {
                setLastOp({
                    index: index,
                    op: 1,
                })
                setSubjects(data)
            })

        }

        catch (e) {
            alert(e);
        }
    }

    const bunkedClicked = (index) => {
        try {
            const data = [...subjects];
            data[index].total = data[index].total + 1;
            updateSubjects(data).then(() => {
                setLastOp({
                    index: index,
                    op: 0,
                })
                setSubjects(data)
            })
        }

        catch (e) {
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
                        Bunker {percent}
                    </Text>
                </Body>

                <Right>
                    <TouchableOpacity onPress={() => undoHandler()} disabled={!lastOp}>
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
                style={{ padding: 8 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <SubjectCard item={item} presentClicked={() => presentClicked(index)}
                        bunkedClicked={() => bunkedClicked(index)} percent={percent} />

                )}
            />
        </Container >

    )
}

