import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';

import { Constants } from 'expo';
/*All github repository */
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      resultText: '',
      calculationText: '',
    };
    this.operations = ['DEL', '+', '-', '*', '/'];
  }
  calculateResult() {
    const text = this.state.resultText;
    //eval(text)
    this.setState({
      calculationText: eval(text),
    });
  }
  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  }

  buttonPressed(text) {
    //console.log(text);
    if (text == '=') {
      return this.validate() && this.calculateResult();
    }
    this.setState({
      resultText: this.state.resultText + text,
    });
  }

  operate(operations) {
    switch (operations) {
      case 'DEL':
        {
          let text = this.state.resultText.split('');
          text.pop();
          this.setState({
            resultText: text.join(''),
          });
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/': {
        const lastchar = this.state.resultText.split('').pop();
        if (this.operations.indexOf(lastchar) > 0) return;

        if (this.state.text == '') return;
        this.setState({
          resultText: this.state.resultText + operations,
        });
      }
    }
  }
  render() {
    let elems = [];
    let nums = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0, '=', '.']];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            onPress={() => this.buttonPressed(nums[i][j])}
            style={styles.btn}>
            <Text style={styles.btntext}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      elems.push(<View style={styles.row}>{row}</View>);
    }

    let ops = [];
    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.operate(this.operations[i])}>
          <Text style={(styles.btntext, styles.white)}>
            {this.operations[i]}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.number}>{elems}</View>
          <View style={styles.operation}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  result: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculation: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btn: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttons: {
    flex: 8,
    flexDirection: 'row',
  },
  number: {
    flex: 7,
    backgroundColor: '#434343',
  },
  operation: {
    flex: 2,
    backgroundColor: '#636363',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  resultText: {
    fontSize: 38,
    color: 'black',
    paddingEnd: 10,
    fontFamily: 'sans-serif-thin',
  },
  calculationText: {
    color: 'black',
    fontSize: 55,
    paddingEnd: 10,
    fontFamily: 'sans-serif-thin',
  },
  btntext: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'sans-serif-thin',
  },
  white: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'sans-serif-thin',
  },
});
/***<Button onPress={this.addData.bind(this)}>Add data</Button>*/
