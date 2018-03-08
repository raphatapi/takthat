var StudentAll = React.createClass({   
  
  getInitialState: function () {  
    return { familyName: '' ,firstName: '',lastName:'',email:'',phone:'',id:'',Buttontxt:'Save', data1: []};  
  },  
   handleChange: function(e) {  
        this.setState({[e.target.name]: e.target.value});  
    },  
  
  componentDidMount() {  
   
    $.ajax({  
       url: "api/getdata",  
       type: "GET",  
       dataType: 'json',  
       ContentType: 'application/json',  
       success: function(data) {           
         this.setState({data1: data});   
           
       }.bind(this),  
       error: function(jqXHR) {  
         console.log(jqXHR);  
             
       }.bind(this)  
    });  
  },  
    
  DeleteData(id){  
    var userDelete = {  
          'id': id  
             };        
      $.ajax({  
        url: "/api/Removedata/",  
        dataType: 'json',  
        type: 'POST',  
        data: userDelete,  
        success: function(data) {  
          alert(data.data);  
           this.componentDidMount();  
    
        }.bind(this),  
        error: function(xhr, status, err) {  
           alert(err);   
               
              
        }.bind(this),  
        });  
      },  
   
  
  
  EditData(item){           
    this.setState({
      familyName: item.familyname,
      firstName: item.firstname,
      lastName: item.lastname,
      email: item.email,
      phone: item.phone,
      id:item._id,
      Buttontxt:'Update'});  
    },  
  
   handleClick: function() {  
   
   var Url="";  
   if(this.state.Buttontxt=="Save"){  
      Url="/api/savedata";  
       }  
      else{  
      Url="/api/Updatedata";  
      }  
      var userdata = {
        'familyName':  this.body.familyName, 
        'firstName': this.body.firstName,
        'lastName': this.body.lastName,
        'email': this.body.email, 
        'phone': this.body.phone,  
        'id':this.state.id,  
          
    }  
    $.ajax({  
      url: Url,  
      dataType: 'json',  
      type: 'POST',  
      data: userdata,  
      success: function(data) {         
          alert(data.data);         
          this.setState(this.getInitialState());  
          this.componentDidMount();  
           
      }.bind(this),  
      error: function(xhr, status, err) {  
         alert(err);       
      }.bind(this)  
    });  
  },  
  
  render: function() {  
    return (   
      <div  className="container"  style={{marginTop:'50px'}}>  
       <p className="text-center" style={{fontSize:'25px'}}><b> CRUD Opration Using React,Nodejs,Express,MongoDB</b></p>  
  <form>  
    <div className="col-sm-12 col-md-12"  style={{marginLeft:'400px'}}>   
  <table className="table-bordered">  
     <tbody>  
    <tr>
    <td><b>Family Name</b></td>  
      <td>  
         <input className="form-control" type="text" value={this.state.name}    name="familyname" onChange={ this.handleChange } />  
          <input type="hidden" value={this.state.id}    name="id"  />  
      </td>  
    </tr>

    <tr>  
      <td><b>First Name</b></td>  
      <td>  
         <input className="form-control" type="text" value={this.state.name}    name="firstname" onChange={ this.handleChange } />  
          <input type="hidden" value={this.state.id}    name="id"  />  
      </td>  
    </tr>
    <tr>
    <td><b>Last Name</b></td>  
      <td>  
         <input className="form-control" type="text" value={this.state.name}    name="lastname" onChange={ this.handleChange } />  
          <input type="hidden" value={this.state.id}    name="id"  />  
      </td>  
    </tr>    
  
    <tr>  
      <td><b>Phone</b></td>  
      <td>  
      <input type="text" className="form-control" value={this.state.address}  name="phone" onChange={ this.handleChange } />  
      </td>  
    </tr>  
  
    <tr>  
      <td><b>Email</b></td>  
      <td>  
        <input type="text"  className="form-control" value={this.state.email}  name="email" onChange={ this.handleChange } />  
      </td>  
    </tr>  
  
  
    <tr>  
      <td><b>Password</b></td>  
      <td>  
        <input type="text"  className="form-control" value={this.state.contact}  name="password" onChange={ this.handleChange } />  
      </td>  
    </tr>  
  
    <tr>  
      <td></td>  
      <td>  
        <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />  
      </td>  
    </tr>  
  
 </tbody>  
    </table>  
</div>  
   
  
<div className="col-sm-12 col-md-12 "  style={{marginTop:'50px',marginLeft:'300px'}} >  
   
 <table className="table-bordered"><tbody>  
   <tr><th><b>S.No</b></th><th><b>FAMILY NAME</b></th><th><b>FIRST NAME</b></th><th><b>LAST NAME</b></th><th><b>EMAIL</b></th><th><b>PHONE</b></th><th><b>Edit</b></th><th><b>Delete</b></th></tr>  
    {this.state.data1.map((item, index) => (  
        <tr key={index}>  
           <td>{index+1}</td>   
          <td>{item.familyname}</td>                        
          <td>{item.firstname}</td>
          <td>{item.lastname}</td>
          <td>{item.phone}</td>  
          <td>{item.email}</td>  
          <td>   
            
           <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Edit</button>      
          </td>   
          <td>   
             <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item._id)}}>Delete</button>  
          </td>   
        </tr>  
    ))}  
    </tbody>  
    </table>  
     </div>  
</form>          
      </div>  
    );  
  }  
});  
  
ReactDOM.render(<UserAll  />, document.getElementById('root'))