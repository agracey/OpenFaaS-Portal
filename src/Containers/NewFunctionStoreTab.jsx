import React from 'react'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import { loadStoreFunctions, deployStoreFunction } from '../actions/functionStore'
import { List, ListItem, ListItemAvatar, Avatar, Input, TextField, Grid, Icon } from '@material-ui/core';

const styles = theme => ({
  
})

class NewFunctionStoreTab extends React.Component{

  constructor(props) {
    super(props)
    this.state={
      searchText:''
    }
  }

  //This should probably actually turn into "requestFunctionStoreLoad" and be lazy loaded
  componentDidMount() {
    this.props.loadStoreFunctions()
  }

  

  render() {
    return (
      <div>
        <List>
          {this.renderSearchLine()}
          {this.renderFilteredStore()}
        </List>
      </div>
    )
  }

  handleSearchChange(event) {
    this.setState({searchText:event.target.value})
  }

  renderSearchLine() {
    return (
      <ListItem>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Icon>search</Icon>
          </Grid>
          <Grid item>
            <TextField 
              id="storesearch"
              label="Search"
              value={this.state.searchText}
              onChange={this.handleSearchChange.bind(this)}
              margin="normal"
            />
          </Grid>
        </Grid>
      </ListItem>
    )
  }

  filterFunc(func) {
    // filter as OR for each field. 
    return ['title','description','name','repo_url']
      .reduce((acc,curr)=>(
        acc | (func[curr]||'').toLowerCase()
        .includes(this.state.searchText.toLowerCase())
      ) ,false)
  }

  renderFilteredStore() {
    return this.props.functions
      .filter(this.filterFunc.bind(this))
      .map(this.renderFunctionLine.bind(this))
  }

  renderFunctionLine(func, idx) {
    return (
      <ListItem>
        <ListItemAvatar >
          <Avatar src={func.icon}/>
        </ListItemAvatar>
        {func.title || 'func'}
      </ListItem>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  functions: state.functionStore.list
})

const mapDispatchToProps = { 
  loadStoreFunctions,
  deployStoreFunction,
}

// TODO: split presentation and data...
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewFunctionStoreTab))