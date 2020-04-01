import React, {Component} from 'react';
import axios from 'axios'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Spinner, Modal} from 'react-bootstrap'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      art: [],
      loading: false,
      error: '',
      activeData: {},
      modal: false,
      pendingName: '',
      pendingDescription: '',
      editIdx: -1
    }
  }

  get loader(){
    return this.loading ? <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner> : null
  }

  get trs(){
    let f = [
      <tr key='header'>
        <th>Id</th>
        <th>Name</th>
        <th>Artist</th>
        <th>Description</th>
        <th>Width</th>
        <th>Height</th>
        <th>Date Created</th>
      </tr>
    ]
    this.state.art.forEach((elem, idx) => {
      f.push(
        <tr key={elem.id} onClick={() => {
          this.setState({
            modal: true,
            activeData: elem,
            pendingName: elem.name,
            pendingDescription: elem.description,
            editIdx: idx
          })
        }}>
          <td>{elem.id}</td>
          <td>{elem.name}</td>
          <td>{elem.artist}</td>
          <td>{elem.description}</td>
          <td>{elem.width}</td>
          <td>{elem.height}</td>
          <td>{elem.create_date}</td>
        </tr>
      )
    })
    return f
  }

  get activeUI() {
    const {activeData, pendingName, pendingDescription} = this.state
    if(!activeData) return null
    return (
      <>
        <div><label htmlFor={'description'}>{'Description: '}</label>
        <input type={'text'} value={pendingDescription} onChange={e => {
          this.setState({pendingDescription: e.target.value})
        }}></input></div>
        <div><label htmlFor={'name'}>{'Name: '}</label>
        <input type={'text'} value={pendingName} onChange={e => {
          this.setState({pendingName: e.target.value})
        }}></input></div>
      </>
    )
  }

  componentDidMount(){
    this.setState({loading: true})
    axios.get(`${process.env.REACT_APP_API_URL}/art`).then(res => {
      console.log(res.data)
      this.setState({
        art: res.data,
        error: ''
      })
    }).catch((e) => {
      this.setState({error: e.message})
    }).then(() => {
      this.setState({loading: false})
    });
  }

  changeData = (method, data) => {
    this.setState({loading: true})
    axios(`${process.env.REACT_APP_API_URL}/art`, {
      method: method,
      data: data
    }).then(res => {
      let {art, editIdx} = this.state
      switch(method){
        case 'DELETE':
          delete art[editIdx]
          break
        case 'POST':
          art.push(res.data[0])
          break
        case 'PATCH':
          art[editIdx] = res.data[0]
          break;
      }
      this.setState({
        art: art,
        error: ''
      })
    }).catch(e => {
      this.setState({
        error: e.message
      })
      console.error(e)
    }).finally(() => {
      this.setState({loading: false})
    })
    this.handleClose()
  }

  randomString = length => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  createData = () => {
    this.changeData('POST', {
      name: this.randomString(10),
      artist: this.randomString(10),
      description: this.randomString(10),
      width: Math.ceil(Math.random() * 1000),
      height: Math.ceil(Math.random() * 1000),
      create_date: `${Math.ceil(Math.random() * 120) + 1900}-${Math.ceil(Math.random() * 12)}-${Math.ceil(Math.random() * 28)}`
    })
  }

  handleClose = () => {
    this.setState({modal: false})
  }

  render(){
    const {modal, activeData, pendingName, pendingDescription, error} = this.state
    return (
      <div className="App">
        <Button onClick={this.createData}>{'Create New'}</Button>
        <table><tbody>{this.trs}</tbody></table>
        {this.loader}
        {error ? <div>{error}</div> : null}
        <Modal show={modal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{`Edit ${activeData.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.activeUI}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
              this.changeData('PATCH', {
                id: activeData.id,
                name: pendingName,
                description: pendingDescription
              })
            }}>
              Save Changes
            </Button>
            <Button variant="primary" onClick={() => {
              this.changeData('DELETE', {id: activeData.id})
            }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default App;
