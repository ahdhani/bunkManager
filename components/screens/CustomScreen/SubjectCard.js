import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import colours from '../../../constants/colors'
import { Icon } from 'native-base';

export default SubjectCard = (props) => {

    // const [color, setColor] = useState()
    // const [percentage, setPercentage] = useState()

    useEffect(() => {
        // console.log('s')
        console.log(props.item.subject)

    }, [props.item.total]);

    let percent = Math.trunc((props.item.present / props.item.total) * 1000);
    percent = percent / 10;

    if (props.item.total == 0)
        percent = 100;

    const absent = props.item.total - props.item.present;

    let colors = colours.green1

    let alertmsg = "";
    if (percent < props.percent) {
        let numClss = (absent * (100 / (100 - props.percent)));
        numClss = Math.ceil(numClss - props.item.present - absent);
        if (numClss) {
            colors = colours.red1;
            alertmsg = "You must attend " + numClss + " class";

        }
    }
    else if (percent > props.percent) {
        let numClss = (props.item.present * (100 / props.percent));
        numClss = Math.trunc(numClss - props.item.total);
        if (numClss) {
            colors = colours.green1;
            alertmsg = "You may bunk " + numClss + " class";
        }
    }
    else {
        colors = colours.green1;
    }
    return (

        <View style={styles.box}>

            <View style={{ padding: 5, flex: 1 }}>
                <Text style={styles.mainText}>
                    {props.item.subject}
                </Text>
                <Text style={{ color: colors, fontSize: 15 }}>
                    {alertmsg}
                </Text>
            </View>

            <View style={{
                flex: 1, flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between',
            }}>

                <TouchableOpacity onPress={props.bunkedClicked} >
                    <Icon name='remove' style={styles.bunkBtn} />
                </TouchableOpacity>

                <ProgressCircle
                    percent={Math.floor(percent)}
                    radius={40}
                    borderWidth={8}
                    color={colors}
                    bgColor="#fff"
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{Math.floor(percent)}%</Text>
                    <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{props.item.present} / {props.item.total}</Text>

                </ProgressCircle>

                <TouchableOpacity onPress={props.presentClicked}>
                    <Icon name='add' style={styles.presentBtn} />

                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    box: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#aaa',
        borderRadius: 10,
        flexDirection: 'row',
        flex: 1,
    },
    mainText: {
        marginBottom: 5,
        fontSize: 28,
        fontWeight: 'bold',
    },
    presentBtn: {
        textAlign: 'center',
        backgroundColor: colours.green2,
        borderRadius: 45,
        height: 45,
        width: 45,
        paddingVertical: 8,
    },
    bunkBtn: {
        textAlign: 'center',
        backgroundColor: colours.red2,
        borderRadius: 45,
        height: 45,
        width: 45,
        paddingVertical: 8,
    },

});