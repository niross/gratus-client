import { StyleSheet } from 'react-native';

export const Posts = StyleSheet.create({

});

export const PostForm = StyleSheet.create({
  modal: {
    backgroundColor: 'red'
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  innerContainer: {
    backgroundColor: '#fff'
  },
  buttonWrap: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  header: {
    padding: 8,
    backgroundColor: 'lightgray'
  },
  headerText: {
    fontWeight: 'bold'
  },
  multilineTextInput: {
    textAlignVertical: 'top'
  }
});
