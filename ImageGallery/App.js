/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Image, Button } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 1,
      dataSource: []
    }
  }

  componentDidMount() {
    const url = 'https://api.unsplash.com/photos/?client_id=dbe8c37268b52442b08fa86c8fa140f23837e1cdc9f52f3a8a78f46f1fe0dafa'
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ dataSource: response })
        console.log(this.state.dataSource)
      })
      .catch((error) => {
        console.log(error)
      })

  }

  changeView() {
    if (this.state.count == 1) {
      this.setState({ count: 2 })
    } else if (this.state.count == 2) {
      this.setState({ count: 4 })
    } else if (this.state.count == 4) {
      this.setState({ count: 1 })
    }
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <View style={styles.button}>
          <Button title='Change View' onPress={() =>
            this.changeView()
          } />
        </View>

        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 5, alignItems: 'center' }}>
              <Image style={this.state.count === 4 ? (styles.viewFour) : (this.state.count === 2 ? (styles.viewTwo) : (styles.viewOne))} source={{ uri: item.urls.small }} />
            </View>
          )
          }
          numColumns={this.state.count}
          key={this.state.count}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  viewOne: {
    width: 300,
    height: 180,
    borderRadius: 20
  },
  viewTwo: {
    borderRadius: 10,
    width: 100,
    height: 70,
  },
  viewFour: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 90,
    height: 60,
  },
  button: {
    marginRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});
