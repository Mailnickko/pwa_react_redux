import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Moment from 'moment';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { convertUrl } from '../../helpers/convertURL';

const PostList = ({post}) => {
  const { title, author, url, subreddit, permalink, num_comments } = post;
  const defaultThumb = require('../../images/redditDefault.png');
  const thumbnail = post.thumbnail === 'self' || post.thumbnail === '' || post.thumbnail === 'default' || post.thumbnail === 'image' ? defaultThumb : convertUrl(post.thumbnail);
  const created = Moment(post.created_utc*1000).format('LLL');

  const link = `https://www.reddit.com/${permalink}`;

  const iconButtonElement = (
    <IconButton
      touch={true}
      tooltip="more"
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey400} />
    </IconButton>
  );

  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem><a href={ url } target="_blank">Go to site</a></MenuItem>
      <MenuItem><a href={ link } target="_blank">See Comments</a></MenuItem>
    </IconMenu>
  );

  return (
    <List>
      <ListItem
        leftAvatar={<Avatar src={ thumbnail } alt="author_avatar"/>}
        rightIconButton={rightIconMenu}
        primaryText={
          <a href={ link } target="_blank">
            { title }
          </a>
        }
        secondaryText={
          <p>
            Submitted by <span style={{color: darkBlack}}>{ author }</span> --
            { created }
          </p>
        }
        secondaryTextLines={2}
      />
      <p style={styles.postInfo}>Posted to r/{ subreddit } | { num_comments || 'No' } { num_comments === 1 ? 'comment' : 'comments'}</p>
      <Divider inset={true} />

  </List>
  );
}

const styles = {
  postInfo: {
    fontSize: '12px',
    marginLeft: '73px'
  }
}



export default PostList;

