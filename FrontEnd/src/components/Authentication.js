import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import apis from '../services/apis'

export default class Authentication extends Component {

  state = {
    username: '',
    password: '',
    authenthified: undefined,
    errorMessage: undefined
  }

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  async handleClick () {
    const postData = {
      username: this.state.username,
      password: this.state.password
    }

    let newState = { }

    await apis.authentication.logIn(postData).then((answer)=>{
      newState =  {
        accessCheck : answer
      }

    }).catch( async (error) => {
      console.log(error)
      newState =  {
        accessCheck : false,
        errorMessage : await error.text()
      }

    })
    
    

    this.setState({
      authenthified: newState.accessCheck,
      errorMessage : newState.errorMessage
    })

    if(newState.accessCheck){
      this.props.setLocation('/query')
    }
    
  }

  handleChange (event) {
    const target = event.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState({
      [name]: value
    })
  }

  /**
   * Redirect press enter to login button
   * @param {*} event 
   */
  handleKeyDown (event) {
    if (event.key === 'Enter') {
      this.handleClick()
    }
  }

  render () {
    if (this.state.authenthified) {
      return <Redirect to='/query' />
    }
    return (
      <div className='vertical-center'>
        <div className='text-center' id='login'> 
          <div className='alert alert-danger' id='error' style={{ display:  this.state.errorMessage === undefined ?  'none' : '' }}>{this.state.errorMessage}</div>
          <div className='block-title block block-400'>Authentication</div>
          <div className='block-content block block-400'>
            <form id='login-form' onKeyPress={this.handleKeyDown}>

              <fieldset>
                <label>Username*</label>
                <input className='form-control' type='text' placeholder='username' name='username' value={this.state.username.value} onChange={this.handleChange} required />
              </fieldset>

              <fieldset>
                <label>Password*</label>
                <input className='form-control' type='password' placeholder='password' name='password' value={this.state.password.value} onChange={this.handleChange} required />
              </fieldset>

              <fieldset className='text-right'>
                <button name='connexion' type='button' className='btn btn-dark' onClick={this.handleClick}> Connect </button>
              </fieldset>

            </form>
          </div>
        </div>
      </div>
    )
  }
}
