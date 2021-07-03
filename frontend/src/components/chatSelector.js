import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axiosInstance from '../axiosApi'
import {useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getChats() {
  return axiosInstance.get("texts/chats/metaData")
    .then(response => response.data)
    .catch(error => {
      this.setState({
        error: error.message
      });
    })
}


export default function ChatSelector(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [chatId, setChatId] = React.useState('heyyy');
  const [chats, setChats] = React.useState([]);
  React.useEffect(() => {
      getChats().then(response=> {setChats(response); setChatId(response[0].id)})
  }, []);
  const handleChatChange = (event) => {
    setChatId(event.target.value);
    props.handleChatChange(event.target.value);
  };


  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="select-native">
          Select the chat you would like to view
        </InputLabel>
        <Select
          native
          value={chatId}
          onChange={handleChatChange}
          inputProps={{
            id: 'select-native',
          }}
        >
          {chats.map((name) => (
            <option key={name.id} value={name.id}>
              {name.chat_name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
