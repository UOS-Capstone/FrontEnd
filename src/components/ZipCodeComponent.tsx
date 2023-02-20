import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';


function ZipCode(){
    const getAddressData = (data : any) => {
        let defaultAddress = '';
        if (data.buildingName === 'N') {
          defaultAddress = data.apartment;
        } else {
          defaultAddress = data.buildingName;
        } 
    }


    return(
        <View>
            <Postcode
            style={{ flex: 1, width: '100%', zIndex: 999 }}
            jsOptions={{ animation: true }}
            onSelected={data => getAddressData(data)}
            onError={function (error: unknown): void {
            throw new Error('Function not implemented.');
            }}
            />
        </View>
    )
}

const stlyes = StyleSheet.create({
    form : {
        width : 320,
        height : 320,
    }
})

export default ZipCode;