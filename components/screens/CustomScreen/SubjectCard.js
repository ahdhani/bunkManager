import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';


export default SubjectCard = (props) => {

    const [color, setColor] = useState()

    let percent = Math.trunc((props.item.present / props.item.total) * 1000);
    percent=percent/10;

    if(props.item.total==0)
        percent = 100;

    const absent = props.item.total-props.item.present;
    
    let alertmsg = "";
    if(percent<props.percent)
    {
        let numClss = (absent*(100/(100-props.percent)));
        numClss = Math.ceil( numClss - props.item.present - absent);
        if(numClss)
        {
            colors = '#f33';
            alertmsg = "You must attend "+numClss+" class";

        }
    }
    else if(percent>props.percent)
    {
        let numClss = (props.item.present*(100/props.percent));
        numClss = Math.trunc(numClss - props.item.total);
        if(numClss){
            colors = '#afa';
            alertmsg = "You may bunk " + numClss + " class";
        }
    }
    else
    {
        colors = '#afa';
    }
    return (

    <View key={props.index} style={styles.box}>

        <View style = {{padding: 5, width: '50%'}}>
            <Text style = {styles.mainText}>
                {props.item.subject}
            </Text>
            <Text style = {{color: colors, fontSize: 15}}>
                {alertmsg}
            </Text>
        </View>

        <TouchableOpacity onPress = {props.bunkedClicked} style={styles.bunkBtn}>
            <Text style={{
                margin: 12,
                fontSize: 20,
                fontWeight: 'bold',
            }}>-</Text>
        </TouchableOpacity>        

        <ProgressCircle
            percent={Math.floor(percent)}
            radius={40}
            borderWidth={8}
            color= {colors}
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{Math.floor(percent)}%</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold'}}>{props.item.present} / {props.item.total}</Text>

        </ProgressCircle>

        <TouchableOpacity onPress = {props.presentClicked} style={styles.presentBtn}>
            <Text style={{
                margin: 12,
                fontSize: 20,
                fontWeight: 'bold',
            }}>+</Text>
        </TouchableOpacity>

     </View>
    );
 
}

const styles = StyleSheet.create({
   box: {
        padding: 8,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        height: 100,
        width: '100%',
        margin: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#aaa',
        borderRadius: 10,
        flexDirection: 'row',
        flex: 1,
   },
    mainText: {
        marginBottom: 10,
        fontSize: 28,
        fontWeight: 'bold',
    },
   presentBtn: {
        borderRadius: 30,
        backgroundColor: "#5a5",
        textAlign: 'center',
        justifyContent: 'center',
        height: 45,
        width: 45,
   },
   bunkBtn: {
        borderRadius: 30,
        backgroundColor: "#f33",
        alignContent: 'center',
        justifyContent: 'center',
        height: 45,
        width: 45,

    },
    
});