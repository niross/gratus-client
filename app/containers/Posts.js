import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView, Modal, ToolbarAndroid } from 'react-native';

import { GratusToolbar } from '../components/GratusToolbar';
import { PostForm } from '../components/PostForm';

const propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  posts: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object.isRequired
};
const defaultProps = {};

export class Posts extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor', props);
    this.state = {
      showAddForm: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        nextProps.posts.get('posts').toJS()
      )
    });
  }

  renderRow(rowData) {
    return (
      <View>
        <Text>{rowData.text}</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        <GratusToolbar
          title="Posts"
          actions={[{
            title: 'ADD',
            show: 'always',
            onSelect: () =>
              // this.props.navigator.push({
              //   component: PostForm,
              //   props: {
              //     navigagtor: this.props.navigagtor,
              //     route: this.props.route,
              //     dispatch: this.props.dispatch,
              //     user: this.props.user
              //   }
              // })
              this.setState({
                showAddForm: true
              })
          }]}
        />
        <Text>Hi</Text>
        {this.props.posts.get('error') ?
          <View><Text>ERROR! {this.props.posts.get('error')}</Text></View>
        :
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}
            enableEmptySections
          />
        }
        <PostForm
          user={this.props.user}
          show={this.state.showAddForm}
          onHide={() => {
            console.log('on hide');
            this.setState({ showAddForm: false })
          }}
        />
      </View>
    );
  }
}

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    user: state.user,
    posts: state.posts
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
