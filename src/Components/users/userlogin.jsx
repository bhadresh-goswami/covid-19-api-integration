import React, { Component } from 'react';
import Axios from 'axios';
class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            gender: "",
            id: "",
            data: []
        }

    }
    componentWillMount() {
        Axios.get("http://localhost:8080/users").then(res => {
            console.log(res.data);
            this.setState({ data: res.data });
        }).catch(err => {
            console.log(`error is ${err}`);
        })
    }
    changeHandler(evt) {

        this.setState({ [evt.target.name]: evt.target.value });

    }
    onSaveClick() {
        console.log(this.state);
        
        if (this.state.id == "") {
            let res = {
                name: this.state.name,
                password: this.state.password,
                gender: this.state.gender
            }
            Axios.post("http://localhost:8080/user", res).then(res => {

                console.log(res);

            }).catch(err => {
                console.log(`error ${err}`);
            });
        }
        else{
            let res = {
                id:this.state.id,
                name: this.state.name,
                password: this.state.password,
                gender: this.state.gender
            }
            Axios.put("http://localhost:8080/user/"+this.state.id, res).then(res => {

                console.log(res);

            }).catch(err => {
                console.log(`error ${err}`);
            });
            this.setState({id:""});
        }
    }

    editDataMode(id) {
        let editData = this.state.data.find((res) => {
            return res._id == id;
        });
        this.setState({ id: id });
        this.setState({ name: editData.userName });
        this.setState({ password: editData.password });
        this.setState({ gender: editData.gender });
        console.log(editData);
        console.log(id);

    }
    setGender(val) {
        if (this.state.gender.toLowerCase() == val.toLowerCase())
            return "checked";
        else
            return "";
    }
    render() {
        const rows = this.state.data.map((value, index) => {
            return <li>
                {value.userName}, {value.gender}
                <button onClick={() => this.editDataMode(value._id)}>Edit</button>
            </li>
        });

        return (
            <div>

                <table>
                    <tr>
                        <td>
                            Enter User Name:
                        </td>
                        <td>
                            <input type="text" value={this.state.name} name="name" onChange={(evt) => this.changeHandler(evt)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Enter User Password:
                        </td>
                        <td>
                            <input type="password" name="password" onChange={(evt) => this.changeHandler(evt)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Enter User Name:
                        </td>
                        <td>
                            <input type="radio" name="gender" onChange={(evt) => this.changeHandler(evt)} value="Male" checked={this.setGender("Male")} /> Male
                            <input type="radio" name="gender" onChange={(evt) => this.changeHandler(evt)} value="Female" checked={this.setGender("Female")} /> Female
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button onClick={() => this.onSaveClick()}>Save Data</button>
                        </td>
                    </tr>
                </table>
                <ul>
                    {rows}
                </ul>
            </div>
        );
    }
}

export default UserLogin;