import React, { Component } from 'react';
import Appbar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

class Header extends Component {

  constructor() {
    super();

    this.handleUpdateQuery = this.handleUpdateQuery.bind(this);
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
  }

  handleUpdateQuery(query) {
    this.props.updateQuery(query);
  }

  handleSearchQuery(e) {
    e.preventDefault();
    this.handleUpdateQuery(this.refs.searchOptions.value)
    this.props.searchQuery(this.refs.searchOptions.value);
  }

  render() {
    return (
      <Appbar
        style={ styles.headerStyle }
        title='Reddit_PWA'
        iconElementLeft={ <img src="https://i.ytimg.com/vi/CE-JlvmnRtY/hqdefault.jpg" style={styles.logo}/> }
      >
        <div style={ styles.form }>
          <form ref="searchForm" onSubmit={ this.handleSearchQuery }>
            <select ref="searchOptions">
              <option value="new">new</option>
              <option value="hot">hot</option>
              <option value="todayilearned">todayilearned</option>
              <option value="explainlikeimfive">explainlikeimfive</option>
              <option value="funny">funny</option>
              <option value="news">news</option>
            </select>

            <input type='submit' value="Search"/>
          </form>
        </div>
      </Appbar>
    )
  }
};

const styles = {
  headerStyle: {
    margin: '0px',
  },
  logo: {
    width: '50px',
    margin: '10px 10px'
  },
  form: {
    display: 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center'
  }
};

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
