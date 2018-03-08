var StudentAll = React.createClass({   
  
    getInitialState: function () {  
      return { name: '' ,address: '',email:'',contact:'',id:'',Buttontxt:'Save', data1: []};  
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
    var studentDelete = {  
          'id': id  
             };        
      $.ajax({  
        url: "/api/Removedata/",  
        dataType: 'json',  
        type: 'POST',  
        data: studentDelete,  
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
     this.setState({name: item.name,address:item.address,contact:item.contact,email:item.email,id:item._id,Buttontxt:'Update'});  
       },  
    
     handleClick: function() {  
     
     var Url="";  
     if(this.state.Buttontxt=="Save"){  
        Url="/api/savedata";  
         }  
        else{  
        Url="/api/Updatedata";  
        }  
        var studentdata = {  
          'name': this.state.name,  
          'address':this.state.address,  
          'email':this.state.email,  
          'contact':this.state.contact,  
          'id':this.state.id,  
            
      }  
      $.ajax({  
        url: Url,  
        dataType: 'json',  
        type: 'POST',  
        data: studentdata,  
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
        <td><b>Name</b></td>  
        <td>  
           <input className="form-control" type="text" value={this.state.name}    name="name" onChange={ this.handleChange } />  
            <input type="hidden" value={this.state.id}    name="id"  />  
        </td>  
      </tr>  
    
      <tr>  
        <td><b>Address</b></td>  
        <td>  
        <input type="text" className="form-control" value={this.state.address}  name="address" onChange={ this.handleChange } />  
        </td>  
      </tr>  
    
      <tr>  
        <td><b>Email</b></td>  
        <td>  
          <input type="text"  className="form-control" value={this.state.email}  name="email" onChange={ this.handleChange } />  
        </td>  
      </tr>  
    
    
      <tr>  
        <td><b>Contact</b></td>  
        <td>  
          <input type="text"  className="form-control" value={this.state.contact}  name="contact" onChange={ this.handleChange } />  
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
     <tr><th><b>S.No</b></th><th><b>NAME</b></th><th><b>ADDRESS</b></th><th><b>EMAIL</b></th><th><b>CONTACT</b></th><th><b>Edit</b></th><th><b>Delete</b></th></tr>  
      {this.state.data1.map((item, index) => (  
          <tr key={index}>  
             <td>{index+1}</td>   
            <td>{item.name}</td>                        
            <td>{item.address}</td>  
            <td>{item.email}</td>  
            <td>{item.contact}</td>  
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
    
  ReactDOM.render(<StudentAll  />, document.getElementById('root'))