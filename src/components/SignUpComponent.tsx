import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Config from 'react-native-config';
import axios, {AxiosError} from 'axios';
import BirthComponent from './BirthComponent';
import GenderComponent from './genderComponent';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignUpScreenProps) {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState(0);
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [street, setStreet] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [memberImage, setMemberImage] = useState('');

  const onChangeUserId = useCallback((text:string) => {
    setUserId(text.trim());
  }, []);
  const onChangePassword = useCallback((text:string) => {
    setPassword(text.trim());
  }, []);
  const onChangeNickname = useCallback((text:string) => {
    setNickname(text.trim());
  }, []);
  const onChangeGender = useCallback((text:number) => {
    setGender(text);
  }, []);
  const onChangeBirth = useCallback((text:string) => {
    setBirth(text.trim());
  }, []);
  const onChangeEmail = useCallback((text:string) => {
    setEmail(text.trim());
  }, []);
  const onChangePhoneNo = useCallback((text:string)=> {
    setPhoneNo(text.trim());
  }, []);
  const onChangeZipcode = useCallback((text:string)=> {
    setZipcode(text.trim());
  }, []);
  const onChangeStreet = useCallback((text:string)=> {
    setStreet(text.trim());
  }, []);
  const onChangeAddressDetail = useCallback((text:string)=> {
    setAddressDetail(text.trim());
  }, []);
  const onChangeMemberImage = useCallback((text:string)=> {
    setMemberImage(text.trim());
  }, []);

  const [token, setToken] = useState('');
  const onSubmit = useCallback(async () => {
    const user = {
      userId : userId,
      password : password,
      nickname : nickname,
      gender : gender,
      birth : birth,
      email : email,
      phoneNo : phoneNo,
      zipcode : zipcode,
      street : street,
      addressDetail : addressDetail,
      memberImage : memberImage
    }
    if(loading){
      return
    }
    if (!userId || !userId.trim()) {
      return Alert.alert('알림', '아이디를 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!nickname || !nickname.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!gender) {
        return Alert.alert('알림', '성별을 선택해주세요.');
      }
    if (!birth || !birth.trim()) {
        return Alert.alert('알림', '생년월일을 입력해주세요.');
    }
    if (!email || !email.trim()) {
        return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!phoneNo || !phoneNo.trim()) {
        return Alert.alert('알림', '전화번호를 입력해주세요.');
    }
    if (!zipcode || zipcode.trim()) {
        return Alert.alert('알림', '우편번호를 입력해주세요.');
    }
    if (!street || !street.trim()) {
        return Alert.alert('알림', ' 도로명주소를 입력해주세요.');
    }
    if (!addressDetail|| !addressDetail.trim()) {
        return Alert.alert('알림', '상세주소를 입력해주세요.');
    }
    if (!memberImage || !memberImage.trim()) {
        return Alert.alert('알림', '사진을 입력해주세요.');
    }

    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        userId,
      )
    ) {
      return Alert.alert('알림', '올바른 아이디 형식이 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    try {
        setLoading(true);
        const response = await axios.post(`http://25.15.132.100:8080/member/Signup`, user)
        .then((response) => (response)=>{
          console.log(response.data);
          setToken(JSON.stringify(response.data));
          Alert.alert('알림', '회원가입 되었습니다.');
          navigation.navigate('Login');
        })
        .catch((error)=>{
          console.log(error);
        })
      }finally{
        setLoading(false);}
  }, [loading, navigation, userId, password, nickname, gender, birth, email, phoneNo, zipcode, street, addressDetail, memberImage]);

  const canGoNext = userId && password && nickname && email && phoneNo && zipcode && street && addressDetail;
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.text}>아이디</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeUserId}
          placeholder="아이디"
          placeholderTextColor="#666"
          value={userId}
          returnKeyType="next"
          clearButtonMode="while-editing"
          blurOnSubmit={false}
        />
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>비밀번호</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {onChangePassword}
          placeholder = "비밀번호"
          placeholderTextColor = "#666"
          secureTextEntry = {true}
          value = {password}
          returnKeyType = "next"
          clearButtonMode = "while-editing"
          blurOnSubmit = {false}/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>이름</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {onChangeNickname}
          placeholder = "이름"
          placeholderTextColor = "#666"
          value = {nickname}
          returnKeyType = "next"
          clearButtonMode = "while-editing"
          blurOnSubmit = {false}/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>성별</Text>
        <GenderComponent/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>생년월일</Text>
        <BirthComponent/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>이메일</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {onChangeEmail}
          placeholder= '이메일'
          placeholderTextColor = "#666"
          value = {email}
          returnKeyType = "next"
          clearButtonMode = "while-editing"
          blurOnSubmit = {false}/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>전화번호</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {onChangePhoneNo}
          placeholderTextColor = "#666"
          value = {phoneNo}
          returnKeyType = "next"
          clearButtonMode = "while-editing"
          blurOnSubmit = {false}
          keyboardType = "number-pad"/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>우편번호</Text>
        <TextInput
          style = {styles.textInput}
          value = {zipcode}
          onChangeText = {onChangeZipcode}
          clearButtonMode = "while-editing"
          blurOnSubmit = {false}
          keyboardType = "number-pad"/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>상세주소</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {onChangeAddressDetail}
          placeholder = "상세주소"
          placeholderTextColor = "#666"
          value = {addressDetail}
          clearButtonMode = "while-editing"
          blurOnSubmit = {false}/>
      </View>
      <View>
        
      </View>
      <View style = {styles.button}>
        <Pressable
          style = {canGoNext ? StyleSheet.compose(styles.signUpButton, styles.signUpButtonActive)
          : styles.signUpButton}
          disabled = {!canGoNext || loading}
          onPress = {onSubmit}>
         <Text style = {styles.signUpButtonText}>회원가입하기</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    flexDirection : 'row',
  },
  textInput: {
    fontWeight : 'bold',
    fontSize : 12,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical : 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button : {
    alignItems : 'center',
  },
  signUpButton : {
    backgroundColor : 'gray',
    paddingHorizontal : 20,
    paddingVertical : 10,
    borderRadius : 5,
    marginBottom : 10,
  },
  signUpButtonActive:{
    backgroundColor : 'blue',
  },
  signUpButtonText:{
    color : 'white',
    fontSize : 16,
  },
});

export default SignUp;
