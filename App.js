import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Switch } from 'react-native-paper';
import Clipboard from '@react-native-community/clipboard';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            url: "",
            name: "",
            urlFinal: ""
        }
    }

    toggleTheme() {
        this.setState({
            toggle: !this.state.toggle ? true : false
        });
    }

    short = async () => {
        Keyboard.dismiss();

        if(this.state.url.includes("https://") || this.state.url.includes("http://")){
            const urlCutt = "https://cutt.ly/api/api.php?key=c7c3e3ff1bb86ddbd78b93e439e2db7b72799&";
            const params = `short=${this.state.url}&name=${this.state.name}`;
            await fetch(urlCutt+params)
            .then(async response => {
                const data = await response.json();
                if (data.url.status === 3) {
                    alert('Esse nome já esta em uso!');
                    return;
                }
                if (data.url.status === 2) {
                    alert('url é invalida!');
                    return;
                }

                this.setState({
                    urlFinal: data.url.shortLink
                });
            })
            return;
        }

        alert('Url inválida!');
    }

    copyUrl() {
        Clipboard.setString(this.state.urlFinal);
        alert('Url copiada com sucesso!');
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, { backgroundColor: this.state.toggle ? 'black' : 'white' }]}>
                    <Switch
                        onValueChange={() => this.toggleTheme()}
                        value={this.state.toggle}
                        color={"#00FF00"}
                    />
                    
                    <Text style={styles.title}>url
                        <Text style={{ color: '#8a2be2' }}>Shorter</Text>
                    </Text>

                    <TextInput
                        style={styles.urlInput}
                        onChangeText={ (text) => this.setState({ url: text }) }
                        value={this.state.url}
                        placeholder="URL"
                    />

                    <TextInput
                        style={styles.urlInput}
                        onChangeText={ (text) => this.setState({ name: text }) }
                        value={this.state.name}
                        placeholder="Custom name"
                    />

                    <TouchableOpacity onPress={() => this.short() } style={styles.shortBtn}>
                        <Text style={{ color: '#FFFF'}}>Reduce</Text>
                    </TouchableOpacity>

                    <TouchableWithoutFeedback onPress={ this.state.urlFinal ? this.copyUrl() : () => {} }>
                        <Text style={styles.finalUrl}>{this.state.urlFinal}</Text>
                    </TouchableWithoutFeedback>

                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#21243d',
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 20,
    },
    urlInput: {
        height: 50,
        width: '80%',
        borderColor: '#21243d',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#FAFAFA',
        marginBottom: 20,
        fontSize: 20,
    },
    shortBtn: {
        backgroundColor: '#00FF00',
        borderRadius: 20,
        height: 40,
        width: '80%',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    finalUrl: {
        height: 40,
        width: '80%',
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center'
    }
});