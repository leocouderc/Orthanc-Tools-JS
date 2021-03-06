import React, { useState } from 'react'
import OrthancSettings from './OrthancSettings'
import AetRootPanel from './AetRootPanel'
import AutoRetrieveRootPanel from './AutoRetrieveRootPanel'
import PeerRootPanel from './PeerRootPanel'
import JobsRootPanel from './JobsRootPanel'
import Plugins from './Plugins'

/**
 * Root Panel of Admin route
 * Using React Hooks
 */
const AdminPanel = () => {
  const [selectedOptionMenu, setSelectedOptionMenu] = useState('General')

  function clickHandler (event) {
    setSelectedOptionMenu(event.target.value)
  }

  function getComponentToDisplay () {
    switch (selectedOptionMenu) {
      case 'General' :
        return (<OrthancSettings />)
      case 'Aets' :
        return (<AetRootPanel />)
      case 'Peers' :
        return (<PeerRootPanel />)
      case 'Robots' :
        return (<AutoRetrieveRootPanel />)
      case 'Jobs' :
        return (<JobsRootPanel />)
      case 'Plugins' :
        return (<Plugins />)
      default :
        return ([])
    }
  }

  return (
    <div className='jumbotron'>
      <div className= "row">
        <div className='col-3'>
          <div className='nav flex-column nav-pills' role='tablist' aria-orientation='vertical'>
            <input className='btn btn-link text-left' type='button' onClick={clickHandler} value='General' />
            <input className='btn btn-link text-left' type='button' onClick={clickHandler} value='Aets' />
            <input className='btn btn-link text-left' type='button' onClick={clickHandler} value='Peers' />
            <input className='btn btn-link text-left' type='button' onClick={clickHandler} value='Robots' />
            <input className='btn btn-link text-left' type='button' onClick={clickHandler} value='Jobs' />
            <input className='btn btn-link text-left' type='button' onClick={clickHandler} value='Plugins' />
          </div>
        </div>
        <div className='col-sm'>
          {getComponentToDisplay()}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
