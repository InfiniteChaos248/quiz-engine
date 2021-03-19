import React from 'react';
import openSocket from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// const socket = openSocket('http://127.0.0.1:5000/');
// socket.on('connect', function() {
//     console.log('Websocket connected!');
// });
// socket.on('numbers', data => setNumbers(data));
// socket.emit('subscribe');

function Quiz(props) {

    const [quiz, setQuiz] = React.useState(undefined);

    const fetchQuiz = () => {
        fetch('http://127.0.0.1:5000/quiz', {
            method: 'POST',
            body: JSON.stringify({'id': props.match.params.id}),
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
            console.log(data);
            if(data === null) {
                console.log('Invalid quiz');
            } else {
                setQuiz(data);
            }
        }).catch(error => {
            console.error(error);
        });
    }
    fetchQuiz();

    return (
        <React.Fragment>            
            <div>Quiz time !!!</div>
            <div>{quiz === undefined ? "" : quiz.name}</div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* <QMView/> */}
                </Grid>
                <Grid item xs={4}>
                    {/* <ParticipantView/> */}
                </Grid>
                <Grid item xs={4}>
                    {/* <ParticipantView/> */}
                </Grid>
                <Grid item xs={4}>
                    {/* <ParticipantView/> */}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

function QMView() {

    // const [questions, setQuestions] = React.useState([]);
    const [question, setQuestion] = React.useState(undefined);
    // socket.on('question', data => setQuestion(data));
    // socket.on('new_response', data => setQuestion(data));
    
    // const fetchQuestions = () => {
    //     fetch('http://127.0.0.1:5000/questions')
    //     .then(response => response.json())
    //     .then(data => { console.log(data); setQuestions(data) });
    // }
    const start = () => {
        // fetchQuestions();
        // socket.emit('questions', 0);
        // setQuestion(questions[0]);
    }
    const next = () => {
        // socket.emit('questions', question['next']);
    }

    return (
        <React.Fragment>            
            <div>Quiz Master</div>
            {
                question === undefined ? (
                    <React.Fragment>
                        <div><span onClick={ () => {start()} }>Start</span></div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div>{question['text']}</div>
                        <div>Answers : {question['answers']}</div>
                        <div><span onClick={ () => {next()} }>Next</span></div>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    );
}

function ParticipantView() {

    const [question, setQuestion] = React.useState(undefined);
    // socket.on('question', data => setQuestion(data));

    const [answer, setAnswer] = React.useState('');
    const [done, setDone] = React.useState(false);

    const submit = () => {
        setDone(true);
        // socket.emit('answer', {'text': answer, 'this': question['this']});
    }

    return (
        <React.Fragment>            
            <div>Quiz Participant</div>
            {
                question === undefined ? ("") : (
                    <React.Fragment>
                        <div>{question['text']}</div> 
                        {
                            !done ? (
                                <React.Fragment>
                                    <TextField label="Response" value={answer} onChange={(e) => {setAnswer(e.target.value)}} />                        
                                    <div><span onClick={ () => {submit()} }>Submit</span></div>
                                </React.Fragment>
                            ) : (
                                <div>Response has been recorded</div>
                            )
                        }
                    </React.Fragment>
                )
            }                       
        </React.Fragment>
    );
}

export default Quiz;