import React, { useState, useEffect } from 'react'
import { TouchableOpacity, FlatList, View, Switch } from 'react-native'
import { Container, Text, Card, Icon, Input, Right, Header, Body, Left, Form, Label, Item, Content } from 'native-base'

import colors from '../../../constants/colors'
import { updateConfig, fetchConfig } from '../../functions/subjects'

export default ConfigScreen = ({ route, navigation }) => {
   
    // const { onGoBack } = route.params;
    const [percent, setPercent] = useState('75')
    const [CPD, setCPD] = useState('6')
    const [IsSat, setIsSat] = useState(false)

    useEffect(() => {
        fetchConfig().then(res => {
            if (res){
                setPercent(res.percent)
                setCPD(res.CPD)
                setIsSat(res.IsSat)
            }
        })
    }, []);

    const handleSave = () => {

        const data = {
            percent: percent,
            CPD: CPD,
            IsSat: IsSat,
        }
        updateConfig(data).then(() => {
            // onGoBack()
            navigation.navigate('Home')
        })
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
                        Configure
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
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Card style={{
                    width: 300, paddingVertical: 25,
                    paddingHorizontal: 50,
                }}>
                    <Item stackedLabel>
                        <Label>Cutoff Percentage</Label>
                        <Input
                            style={{ height: 60 }}
                            value={percent}
                            onChangeText={(text) => setPercent(text)}
                            keyboardType={'numeric'}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Number of Classes/Day</Label>
                        <Input
                            style={{ height: 60 }}
                            value={CPD}
                            onChangeText={(text) => setCPD(text)}
                            keyboardType={'numeric'}
                        />
                    </Item>
                    <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                        <Text>Is Saturday Holiday</Text>
                        <Switch
                            trackColor={{ false: "#ddd", true: "#777" }}
                            thumbColor="#fff"
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setIsSat(!IsSat)}
                            value={IsSat}
                        />
                    </View>
                </Card>
            </View>
        </Container >

    );

}
