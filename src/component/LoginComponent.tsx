import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import axios, {AxiosError} from 'axios';
import SignUp from './SignUpComponent';

type LogInScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login({navigation}: LogInScreenProps){
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const userIdRef = useRef<TextInput | null>(null);
    const passwordRef = useRef<TextInput | null>(null);
    const [token, setToken] = useState('');
    const canGoNext = userId && password;
    const onChangeUserId = useCallback((text: string)=> {
      setUserId(text.trim());
    }, []);
    const onChangePassword = useCallback((text: string) => {
      setPassword(text.trim());
    }, []);

    const onSubmit = useCallback(async() => {
      const user ={
        userId:userId,
        password:password
      }
      const res = await axios.post(`http://25.15.132.100:8080/member/login`,user)
      .then((res)=>{
        console.log(res.data);
        setToken(JSON.stringify(res.data));
      })
      .catch((err)=>{
        console.log(err);
      })
    },[loading, userId, password])
      
    
      const toSignUp = useCallback(() => {
        navigation.navigate('SignUp');
      }, [navigation]);
    return (
    <View style = {styles.loginPage}>
      <View style = {styles.greeting}>
        <Text style = {styles.greetingLogo}>반갑습니다 8am입니다.</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeUserId}
          placeholder="아이디를 입력해주세요"
          placeholderTextColor="#666"
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          value={userId}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={userIdRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          placeholderTextColor="#666"
          importantForAutofill="yes"
          onChangeText={onChangePassword}
          value={password}
          autoComplete="password"
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            canGoNext
              ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
              : styles.loginButton
          }
          disabled={!canGoNext || loading}
          onPress={onSubmit}>
          {loading ? (<ActivityIndicator color = "white"/>):
          (<Text style={styles.loginButtonText}>로그인</Text>)}
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입하기</Text>
        </Pressable>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  loginPage : {
    color : "snow",
  },
  greeting : {
    padding : 5,
  },
  greetingLogo : {
    fontSize : 20,
    fontWeight : "500",
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
})

export default Login;