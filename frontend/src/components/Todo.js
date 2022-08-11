import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Input,
} from '@material-ui/core';

export default function MainContainer ()  {
  const [createissue, setCreateissue] = useState("");
  const [issues, setIssues] = useState([]);

  const createIssue = (event) => {
    axios.post('http://localhost:3001/issues',
      {
        name: createissue
      }
    ).then(response => {
      setIssues([...issues, {
        id: response.data.id,
        name: response.data.name
      }])
      resetTextField()
    }).catch((e) => { throw e; })
    event.preventDefault()
  }

  useEffect(()  =>  {
    async function fetchData()  {
      const result = await axios.get('http://localhost:3001/issues',)
      setIssues(result.data);
    }
    fetchData();
  }, []);

  const resetTextField = () => {
    setCreateissue('')
  }

  return (
    <React.Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline/>
        <form onSubmit={createIssue}>
          <Input
            type="text"
            name="issue"
            value={createissue}
            placeholder="Enter text"
            onChange={event => setCreateissue(event.target.value)}
          />
          <Button
            type="submit"
            variant='contained'
            color='primary'>
            登録
          </Button>
        </form>
        <List
          style={{marginTop: '48px'}}
          component='ul'
        >
          {issues.map(item => (
            <ListItem key={item.id} component='li' >
              <ListItemText>
                ID:[{item.id}]
                Name:{item.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Container>
    </React.Fragment>
  );
}
