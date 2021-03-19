import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quiz: {},
            message: '',
            messageColor: 'black',
            auth: false,
            master: false,
        };
    }

    fetchQuiz = () => {
        fetch('http://127.0.0.1:5000/quiz', {
            method: 'POST',
            body: JSON.stringify({ 'id': this.props.match.params.id }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.text();
            }
        }).then(data => {
            if (data === null) {
                console.log('Invalid quiz URL');
                this.setState({ quiz: null });
            } else {
                console.log(data);
                this.setState({ quiz: data });
            }
        }).catch(error => {
            console.error(error);
            this.setState({ quiz: null });
        });
    }

    authenticate = (password) => {
        console.log('Checking password ' + password);
        if (password !== this.state.quiz.password && password !== this.state.quiz.passcode) {
            console.log('invalid password');
            this.setState({ message: 'Invalid password', messageColor: 'red' }, () => { this.clearMessage() });
        } else {
            if(password === this.state.quiz.password) {
                this.setState({auth : true});
            } else if(password === this.state.quiz.passcode) {
                this.setState({auth : true, master : true});
            }
        }
    }

    clearMessage = () => {
        setTimeout(() => { this.setState({ message: '', messageColor: 'black' }); }, 5000);
    }

    componentDidMount() {
        this.fetchQuiz();
    }

    render() {
        if (this.state.quiz === undefined) {
            return (<React.Fragment>Please wait. Loading...</React.Fragment>);
        } else if (this.state.quiz === null) {
            return (<React.Fragment>Quiz URL is invalid or some error occured</React.Fragment>);
        } else {
            return (
                <React.Fragment>
                    <React.Fragment>
                        <div>{this.state.quiz.name}</div>
                        {
                            !this.state.auth ? (
                                <React.Fragment>
                                    <Key validate={this.authenticate} />
                                </React.Fragment>
                            ) : (
                                this.state.master ? ("Welcome Quiz Master " + this.state.quiz.qm) : ("Welcome Participant")
                            )
                        }
                        <div style={{color: this.state.messageColor}}>{this.state.message}</div>
                    </React.Fragment>
                </React.Fragment>
            );
        }
    }

}

function Key(props) {
    const [password, setPassword] = React.useState('');
    return (
        <React.Fragment>
            <TextField id="key" label="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <Button variant="contained" color="primary" onClick={() => { props.validate(password) }}>OK</Button>
        </React.Fragment>
    );
}

export default Quiz;