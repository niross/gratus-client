import React, { PropTypes } from 'react';
import { View, Text, Modal, TextInput } from 'react-native';
import { Button } from 'rn-button';
import ImagePicked from 'react-native-image-picker';

import { PostForm as Styles } from '../Styles';

const propTypes = {
  show: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired
};
const defaultProps = {};

export class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputHeight: 0,
      location: {
        x: null,
        y: null
      },
      public: false,
      text: null,
      image: null
    };
  }

  handleOnHide() {
    this.props.onHide();
  }

  render() {
    console.log('rendering the modal');
    return (
      <Modal
        visible={this.props.show}
        transparent
        style={Styles.modal}
        onRequestClose={() => this.handleOnHide()}
        animationType="slide"
      >
        <View
          style={Styles.container}
        >
          <View
            style={Styles.innerContainer}
            onPress={() => this.handleOnHide()}
          >
            <View>
              <View style={Styles.header}>
                <Text style={Styles.headerText}>What are you grateful for?</Text>
              </View>
              <View style={Styles.form}>
                <TextInput
                  style={[
                    Styles.multilineTextInput,
                    { height: Math.max(80, this.state.textInputHeight) }
                  ]}
                  autoFocus
                  multiline
                  onChange={(e) =>
                    this.setState({
                      textInputHeight: e.nativeEvent.contentSize.height,
                      text: e.nativeEvent.text
                    })
                  }
                  value={this.state.text}
                  placeholder="Tell us what your grateful for"
                />

                <Button
                  text="Add Photo"
                  onPress={() => {}}
                />
              </View>
              <View style={Styles.buttonWrap}>
                <Button
                  text="CANCEL"
                  style={{ flex: 1 }}
                  onPress={() => this.handleOnHide()}
                />
                <Button
                  text="SAVE"
                  style={{ flex: 1 }}
                  onPress={() => this.handleOnHide()}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

PostForm.propTypes = propTypes;
PostForm.defaultProps = defaultProps;
