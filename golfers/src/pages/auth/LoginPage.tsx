import React, { useState } from 'react';
import { Platform, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useToast } from 'native-base';

// internal imports
import { primary_color,	white } from '../../options.json';
import { ILoginCredentials } from '../../interfaces';
import { login } from '../../middleware';

export function LoginPage({navigation}: any) {
    const [loginUser, setLoginUser] = useState<ILoginCredentials>({
        username: '',
        password: ''
    });

    const toast = useToast();

    function handleLoginButton(event: any) {
        event.preventDefault();

        if (loginUser.username.length == 0 || loginUser.password.length == 0) {
            return toast.show({
                title: 'Please fill out required fields',
                placement: 'top'
            })
        }

        login(loginUser)
        .then((res) => {
            navigation.navigate('App', {appUserId: res.golfer_id});
        }).catch(err => {
            return toast.show({
                title: 'Login failed',
                placement: 'top'
            })
        })
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoid}
            keyboardVerticalOffset={0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Username"
                            maxLength={20}
                            placeholderTextColor={white}
                            autoCapitalize="none"
                            onChangeText={(username) => setLoginUser(prev => {return {...prev, 'username': username}})}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            maxLength={16}
                            placeholderTextColor={white}
                            secureTextEntry={true}
                            onChangeText={(password) => setLoginUser(prev => {return {...prev, 'password': password}})}
                        />
                    </View>

                    <TouchableOpacity style={styles.loginBtn} onPress={handleLoginButton}>
                        <Text style={styles.loginText}>Log In</Text>
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <Text>Don’t have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.replace('Signup Page')}>
                        <Text style={styles.link}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>  
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    keyboardAvoid: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    inputView: {
        backgroundColor: primary_color,
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'center'
    },

    TextInput: {
        height: 50,
        flex: 1,
        width: "100%",
        marginLeft: 20,
        padding: 10,
        color: white
    },

    loginText: {
        fontWeight: 'bold',
        color: white
    },
    loginBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: primary_color,
    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
    },
    link: {
        fontWeight: 'bold',
    },
})