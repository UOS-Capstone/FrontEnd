import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

function GenderComponent(){
    const [selected1, isSelected1] = useState(false);
    const [selected2, isSelected2] = useState(false);
    const [selected3, isSelected3] = useState(false);
    return(
        <View style = {styles.genderBox}>
            <CheckBox
                disabled = {false}
                value = {selected1}
                onValueChange = {(newValue) => isSelected1(newValue)}
            />
            <Text>남자</Text>
            <CheckBox
                disabled = {false}
                value = {selected2}
                onValueChange = {(newValue) => isSelected2(newValue)}
            />
            <Text>여자</Text>
            <CheckBox
                disabled = {false}
                value = {selected3}
                onValueChange = {(newValue) => isSelected3(newValue)}
            />
            <Text>중성</Text>
        </View>
    )
}

const styles = ({
    genderBox : {
        flexDirection : 'row',
    },
})

export default GenderComponent;