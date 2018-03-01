import React from "react";

export default class Login extends React.Component {
  state = {
    userName: "",
    password: ""
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    this.setState({
      userName: "",
      password: ""
    });
    this.props.onChange({
      userName: "",
      password: ""
    });
  };

  render() {
    return (
      <form>
        <input
          name="userName"
          placeholder="Username"
          value={this.state.userName}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={e => this.change(e)}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}