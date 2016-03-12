var React = require('react-native');
var JoinClassView = require('./../student/joinClassView.js');
var StartClassView = require('./../teacher/startClassView.js');
var Signup = require('./signup.js');
// var NavigationBar = require('react-native-navbar');
// var api = require('../Utils/api');
// var Keychain = require('react-native-keychain');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Navigator
} = React;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      error: false
    };
    // Check keychain for saved credentials
      // if so, move forward to next scene
      // else, all the stuff below
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.nativeEvent.text
    });
  }

  handleSubmit(){
      this.setState({
        isLoading: true
      });
      // api.login(this.state.username, this.state.password)
        // if good, push relevant new scene to navigator with correct userId (for getting classes)
        // else, set error state
      // for time being, hardcoded teacher and student
      if(this.state.username === 'teacher') {
        this.props.navigator.push({
          component: StartClassView,
          userId: 'teacher',
          sceneConfig: {
            ...Navigator.SceneConfigs.FloatFromBottom,
            gestures: {}
          }
        });
        this.setState({
          isLoading: false,
          error:false
        });
      } else if(this.state.username === 'student') {
        this.props.navigator.push({
          component: JoinClassView,
          userId: 'student',
          sceneConfig: {
            ...Navigator.SceneConfigs.FloatFromBottom,
            gestures: {}
          }
        });
        this.setState({
          isLoading: false,
          error:false
        });
      } else {
        this.setState({
          error: 'Invalid Username'
        })
      }
      this.setState({
        isLoading: false,
        username: '',
        password: ''
      });
    }

  handleSignupRedirect() {
    this.props.navigator.push({
      component: Signup,
      sceneConfig: Navigator.SceneConfigs.FloatFromRight
    });
    this.setState({
      isLoading: false,
      error: false,
      username: '',
      password: ''
    });
  }

  render() {
    var showErr = (
      this.state.error ? <Text style={styles.err}> {this.state.error} </Text> : <View></View>
    );
    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}> 
        <View style={styles.loginContainer}>
          <Text style={styles.fieldTitle}> Username </Text>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength={16}
            style={styles.userInput}
            value={this.state.username}
            returnKeyType={'next'}
            onChange={this.handleUsernameChange.bind(this)}
            onSubmitEditing={(event) => { 
              this.refs.SecondInput.focus(); 
            }}
             />
          <Text style={styles.fieldTitle}> Password </Text>
          <TextInput
            ref='SecondInput'
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength={16}
            secureTextEntry={true}
            style={styles.userInput}
            value={this.state.password}
            returnKeyType={'go'}
            onChange={this.handlePasswordChange.bind(this)} 
            onSubmitEditing={this.handleSubmit.bind(this)}/>
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor='#e66365'>
            <Text style={styles.buttonText}> Sign In </Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.handleSignupRedirect.bind(this)}
            underlayColor='#ededed'>
            <Text style={styles.signup}> {"Don't have an account yet? Sign Up!"}  </Text>
          </TouchableHighlight>

          <ActivityIndicatorIOS
            animating= {this.state.isLoading}
            size='large' 
            style={styles.loading} />
          {showErr}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fieldTitle: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
    color: '#616161'
  },
  userInput: {
    height: 50,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#FF5A5F',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    marginTop: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  signup: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center'
  },
  loading: {
    marginTop: 20
  },
  err: {
    fontSize: 14,
    textAlign: 'center'
  }
});

module.exports = Login;
