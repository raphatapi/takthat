

url = `${url}/api/notes`;
/*
  Creating class Note
*/
var Note = React.createClass({

  getInitialState: function(){
    return {editing: false}
  },

/**
  Part of React component life cycle. Gets called before a component renders
*/
  componentWillMount: function(){
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150)+'px',
      top: this.randomBetween(0, window.innerHeight - 150)+'px',
      transform: 'rotate('+ this.randomBetween(-15, 15) + 'deg)'
    };
  },

/**
  This method gets called after a component rendered. This is part of component life cycle
*/
  componentDidMount: function(){
    $(this.getDOMNode()).draggable();
  },

  edit: function(){
    this.setState({editing : true});
  },

  save: function(){
    this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
    this.setState({editing : false});
  },

  remove: function(){
      this.props.onRemove(this.props.index);
  },

/**
  Generates a random number with help of min and max value passed
*/
  randomBetween: function(min, max){
    return min+ Math.ceil(Math.random() * max);
  },
/**
  Normal display mode
*/
  renderDisplay: function(){
    return <div className='note' style={this.style}>
            <p>{this.props.children}</p>
            <span>
              <button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil"/>
              <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash"/>
            </span>
          </div>
  },

  /**
    Edit display mode
  */
  renderForm: function(){
    return <div className='note' style={this.style}>
            <textarea defaultValue={this.props.children} ref="newText" className='form-control'></textarea>
            <span>
              <button onClick={this.save} className="btn btn-success glyphicon glyphicon-floppy-disk"/>
            </span>
          </div>
  },

  render: function(){
    if(this.state.editing){
      return this.renderForm();
    }else{
      return this.renderDisplay();
    }
  }
});


/*
  Creating class Board
*/

var Board = React.createClass({
  propTypes: {
    count: function(props, propName){
      if(typeof props[propName] !== 'number'){
        alert("Count must be a number");
      }else if(props[propName] > 20){
        alert("Can't create more than 20 notes");
      }
    }
  },

  componentWillMount: function(){
      var self = this;
      $.ajax({
        url: url,
        type: 'GET'
      }).then(function(data){
        data.forEach(function(item){
          if(item.text){
            self.loadInitialNotes(item);
          }
        })
      });
  },

  getInitialState: function(){
    return {
      notes: []
    };
  },

  /**
    updates the value of state note on a particular index
  */
  update: function(text, index){
    var self = this;
    let notesArr = self.state.notes;
    let notesObj = notesArr[index];

    $.ajax({
      url: url,
      type: 'PUT',
      data: {text: text, id: notesObj.id},
    }).then(function(data){
      notesArr[index].note = text;
      self.setState({notes: notesArr});
    });
  },

/**
  Removes a note from notes state
*/
  delete: function(index){
    let self = this;
    let notesArr = this.state.notes;
    let notesObj = notesArr[index];
    $.ajax({
      url: url,
      type: 'DELETE',
      data: {id: notesObj.id},
    }).then(function(data){
      notesArr.splice(index, 1);
      self.setState({notes: notesArr});
    });
  },

  /**
    Adds a new note
  */
  loadInitialNotes: function(text){
    let arr = this.state.notes;
    arr.push({
      id: text._id,
      note: text.text
    });
    this.setState({notes: arr});
  },

  addNote: function(text){
    var self = this;
    $.ajax({
      url: url,
      type: 'POST',
      data: {text: text},
    }).then(function(data){
      self.loadInitialNotes(data);
    });
  },

/**
  Generates an unique id for each note
*/
  generateNextId: function(){
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  },
/**
  returns each note from notes state
*/
  eachNote: function(note, i){
    return (<Note key={note.id} index={i} onChange={this.update} onRemove={this.delete}>{note.note}</Note>);
  },

  render: function(){
    return (<div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={this.addNote.bind(null, "New Note")} className="btn btn-sm btn-success glyphicon glyphicon-plus"/>
    </div>);
  }
});

React.render(<Board></Board>, document.getElementById("react-container"))
