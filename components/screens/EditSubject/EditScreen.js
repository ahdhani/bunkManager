import React, { useState, useEffect } from 'react'
import { TouchableOpacity, FlatList, TextInput, View, Text } from 'react-native'
import { Container, Button, Card, Icon, Content, Right, Header, Body, Left, Input } from 'native-base'
import ProgressCircle from 'react-native-progress-circle';

import colors from '../../../constants/colors'
import { updateSubjects, fetchSubjects } from '../../functions/subjects'
import gstyles from '../../../constants/gstyles'
// import { useNavigation } from '@react-navigation/native';

export default EditScreen = ({ navigation }) => {

    const [subjects, setSubjects] = useState([])
    const [text, setText] = useState("")

    useEffect(() => {
        fetchSubjects().then(res => setSubjects(res))

    }, []);

    const handleAdd = () => {
        const data = {
            subject: text, 
            present: 0,
            total: 0,
        }
        setSubjects([...subjects, data])
        setText('')
    }

    const handleSave = () => {
        updateSubjects(subjects).then(
            () => navigation.navigate('Home')
        )
    }

    const deleteSubject = (index) => {
        const data = [...subjects]
        data.splice(index, 1)
        setSubjects(data)
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
                        Edit Subjects
                        </Text>
                </Body>

                <Right>
                    <TouchableOpacity onPress={() => handleSave()}>
                        <Text style={{
                            paddingRight: 10, color: colors.color5,
                            fontWeight: 'bold',
                        }}>
                            <Icon name='save' style={{ fontSize: 20, color: colors.color5 }} />
                            {' '}
                                 Save
                            </Text>
                    </TouchableOpacity>
                </Right>
            </Header>
            <FlatList
                data={subjects}
                style={{ padding: 5 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Card style={{
                        borderRadius: 8, padding: 18,
                        flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            fontSize: 22, fontWeight: 'bold',
                        }}>{item.subject}
                        </Text>
                        <TouchableOpacity onPress={() => deleteSubject(index)}>
                            <Icon name='close' style={{ padding: 5 }} />
                        </TouchableOpacity>
                    </Card>

                )}
            />

            <View style={{ flexDirection: 'row', padding: 5 }}>
                <Input
                    placeholder="Subject... "
                    placeholderTextColor={colors.placeholder}
                    underlineColorAndroid="transparent"
                    onChangeText={inputTxt => setText(inputTxt)}
                    value={text}
                />
                <TouchableOpacity style={{ justifyContent: 'center', paddingHorizontal: 8 }}
                    onPress={() => handleAdd()}>
                    <Text style={{ color: colors.color5, fontWeight: 'bold' }}>ADD</Text>
                </TouchableOpacity>
            </View>

        </Container >

    )
}

