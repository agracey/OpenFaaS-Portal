import React from 'react'
import { FormGroup, FormLabel, Icon, List, ListItem, TextField } from '@material-ui/core';

class SectionToggle extends React.Component {
  render() {
    return <h3 onClick={this.props.onToggle}>
      {this.props.title}
      <Icon>{this.props.open ? 'expand_less' : 'expand_more'}</Icon>
    </h3>
  }
}

export default class NewCustomFunctionTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      environment:false,
      secrets:false,
      labels:false,
      annotations: false
    }
  }

  handleSectionToggle(name) {
    this.setState({
      [name]:!this.state[name]
    })
  }

  isOpen(name){
    return this.state[name]
  }

  render() {
    return (
      <div>
        {this.renderGeneral()}
        <FormGroup>
          <SectionToggle 
            title={'Environment Variables'}
            onToggle={this.handleSectionToggle.bind(this, 'environment')} 
            open={this.isOpen('environment')}
          />
          {this.renderenvironmentironmentVarList()}
        </FormGroup>
        <FormGroup>
          <SectionToggle 
            title={'Secrets'}
            onToggle={this.handleSectionToggle.bind(this, 'secrets')} 
            open={this.isOpen('secrets')}
          />
          {this.renderSecretList()}
        </FormGroup>
        <FormGroup>
          <SectionToggle 
            title={'Labels'}
            onToggle={this.handleSectionToggle.bind(this, 'labels')} 
            open={this.isOpen('labels')}
          />
          {this.renderLabelList()}
        </FormGroup>
        <FormGroup>
          <SectionToggle 
            title={'Annotations'}
            onToggle={this.handleSectionToggle.bind(this, 'annotations')} 
            open={this.isOpen('annotations')}
          />
          {this.renderAnnotationList()}
        </FormGroup>
      </div>
    )
  }

  renderGeneral() {
    return (
      <FormGroup>
        <FormLabel>Define the function below:</FormLabel>
      </FormGroup>
    )
  }

  handleKeyChange() {

  }
  handleValueChange() {

  }

  renderKVP (name, kvp,idx) {
    console.log(kvp)

    return (
      <ListItem>
        <TextField
          id={'key'+name+idx}
          label="Key"
          value={kvp[0]}
          onChange={this.handleKeyChange.bind(this,name,idx)}
          margin="normal"
        />

        <TextField 
          id={'key'+name+idx}
          label="Value"
          value={kvp[1]}
          onChange={this.handleValueChange.bind(this,name,idx)}
          margin="normal"
        />
        <Icon>X</Icon>
      </ListItem>
    )

  }

  renderAddKVP (name) {

    return (
      <ListItem>

      </ListItem>
    )

  }

  renderenvironmentironmentVarList() {
    console.log(this.props)
    if(!this.isOpen('environment')) return null

    const obj = Object.entries(this.props.function.environment || {})

    console.log('obj',obj)

    const list = obj.map(this.renderKVP.bind(this,'environment'))

    return (
      <List>
        {list}
        {this.renderAddKVP('environment')}
      </List>
    )
  }

  renderSecretList() {
    if(!this.isOpen('secrets')) return null

    return ''
  }

  renderLabelList() {

    return ''
  }

  renderAnnotationList() {
    return ''
  }

}