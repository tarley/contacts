import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as ContactsAPI from './utils/ContactsAPI'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'

/*
const contacts = [
  {
    "id": "ryan",
    "name": "Ryan Florence",
    "email": "ryan@reacttraining.com",
    "avatarURL": "https://react-contacts-server-tarley.c9users.io/ryan.jpg"
  },
  {
    "id": "michael",
    "name": "Michael Jackson",
    "email": "michael@reacttraining.com",
    "avatarURL": "https://react-contacts-server-tarley.c9users.io/michael.jpg"
  },
  {
    "id": "tyler",
    "name": "Tyler McGinnis",
    "email": "tyler@reacttraining.com",
    "avatarURL": "https://react-contacts-server-tarley.c9users.io/tyler.jpg"
  }
];
*/

class App extends Component {
    /*
    state = {
        contacts: [
            {
                "id": "ryan",
                "name": "Ryan Florence",
                "email": "ryan@reacttraining.com",
                "avatarURL": "https://react-contacts-server-tarley.c9users.io/ryan.jpg"
            },
            {
                "id": "michael",
                "name": "Michael Jackson",
                "email": "michael@reacttraining.com",
                "avatarURL": "https://react-contacts-server-tarley.c9users.io/michael.jpg"
            },
            {
                "id": "tyler",
                "name": "Tyler McGinnis",
                "email": "tyler@reacttraining.com",
                "avatarURL": "https://react-contacts-server-tarley.c9users.io/tyler.jpg"
            }
        ]
    }
    */
    state = {
        //screen: 'list', // list or create
        contacts: []
    }
    componentDidMount() {
        ContactsAPI.getAll().then(contacts => {
            this.setState({contacts})
        })
    }
    removeContact = (contact) => {
        this.setState(state => ({
            contacts: state.contacts.filter(c => c.id !== contact.id)
        }))
        
        ContactsAPI.remove(contact)
    }
    
    createContact = (contact) => {
        ContactsAPI.create(contact).then(contact => {
            this.setState(state => ({
                contacts: state.contacts.concat([contact])
            }))
        })
    }
    render() {
        return(
            <div>
                <Route exact path='/' render={() =>(
                    <ListContacts 
                        contacts={this.state.contacts} 
                        onDeleteContact={this.removeContact}
                    />
                )}/>
                <Route path='/create' render={({history}) => (
                    <CreateContact 
                        onCreateContact={(contact) =>{
                            this.createContact(contact)
                            history.push('/')
                        }} 
                    />
                )}/>
            </div>
        );
    }
}

export default App;