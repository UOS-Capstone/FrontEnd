import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import * as RNFS from 'react-native-fs';

function Picture(){
    const androidPermission = async () => {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);
        if(hasPermission){
            return true;
        };
        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }

    const getPhotoWithPermission = async () => {
        if(Platform.OS === 'android' && !(await androidPermission())){
            return;
        }
    }
    useEffect(() => {
        getPhotoWithPermission();
    }, []);
}

export default Picture;