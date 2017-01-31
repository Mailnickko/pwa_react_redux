import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey100, grey300, grey500, pink500, blue700, blue800, blue600, white, darkBlack, fullBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Paper from 'material-ui/Paper';


import * as actions from '../../actions/actions';
import Header from './Header';
import PostList from '../presentational/PostList';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue700,
    primary2Color: blue800,
    primary3Color: blue600,
    accent1Color: pink500,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: '#607D8B',
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
});

class App extends Component {

  constructor() {
    super();

    this.renderPosts = this.renderPosts.bind(this);
  }

  componentWillMount() {
    this.props.searchQuery(this.props.search.query);
  }

  renderPosts() {
    const subreddit = this.props.search.query;
    if (this.props.search.posts[subreddit] && this.props.search.posts[subreddit].length) {
      return (
        <div>
          <h4 style={{textAlign: 'center'}}>Results from r/{subreddit}</h4>
            <Paper style={{width: '90%', margin: '0 auto'}} zDepth={2}>
              { this.props.search.posts[subreddit].map((post, i) =>
                  <PostList
                    key={i}
                    post={post.data}
                  />
              )}
            </Paper>
        </div>
      );
    } else {
      return <h3>Loading posts for r/{subreddit}</h3>
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <Header />

          { this.renderPosts() }

          { this.props.children }
        </div>
      </MuiThemeProvider>
    );
  }
};

function mapStateToProps(state) {
  return {
    search: state.search,
    error: state.search.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
