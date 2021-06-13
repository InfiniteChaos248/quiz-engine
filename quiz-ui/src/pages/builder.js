import React from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import { Paper } from '@material-ui/core';

function AnswerChoiceView(props) {
    return (
        <Paper variant="outlined" square style={{width: '25%'}}>
            <div>
                {props.text}   {props.correct ? <CheckIcon/> : ''} <EditIcon/>
            </div>
        </Paper>
    );
}

function QuizBuilder() {

    let history = useHistory();
    const navigateToRoute = (page) => {
        history.push(page);
    };

    const [quizName, setQuizName] = React.useState('My Quiz');

    const [quizQuestions, setQuizQuestions] = React.useState([]);
    const [questionView, setQuestionView] = React.useState(false);
    const [questionText, setQuestionText] = React.useState('');

    const [answerOptions, setAnswerOptions] = React.useState([]);
    const [answerView, setAnswerView] = React.useState(false);
    const [answerText, setAnswerText] = React.useState('');
    const [correctAnswer, setCorrectAnswer] = React.useState(false);

    const newQuestionView = () => {
        resetQuestionView();
        setQuestionView(true);
    };

    const resetQuestionView = () => {
        resetAnswerView();
        setQuestionView(false);
        setQuestionText('');
        setAnswerOptions([]);
    };

    const newAnswerChoiceView = () => {
        resetAnswerView();
        setAnswerView(true);
    };

    const resetAnswerView = () => {
        setAnswerView(false);
        setAnswerText('');
        setCorrectAnswer(false);
    };

    const addNewQuestion = () => {
        let questions = quizQuestions;
        let question = {};
        question['text'] = questionText;
        question['choices'] = answerOptions;
        questions.push(question);
        setQuizQuestions(questions);
        resetQuestionView();
    };

    const addNewAnswerChoice = () => {
        let choices = answerOptions;
        let choice = {};
        choice['text'] = answerText;
        choice['correct'] = correctAnswer;
        choices.push(choice);
        setAnswerOptions(choices);
        resetAnswerView();
    };

    return (
        <main>
            <div>Quiz Builder</div>
            <Card>

                <CardContent>
                    <div>{quizName}</div>

                    {
                        quizQuestions.map((question, index) => {
                            return (
                                <Card variant="outlined">
                                    {index + 1}    {question['text']}
                                    <div>
                                        {
                                            question['choices'].map(choice => {
                                                return (
                                                    <AnswerChoiceView text={choice['text']} correct={choice['correct']} />
                                                );
                                            })
                                        }
                                    </div>
                                </Card>
                            );
                        })
                    }

                    {
                        questionView &&
                        <Card>
                            <CardContent>
                                <TextField
                                    id="question_text"
                                    label="Question"
                                    multiline
                                    rowsMax={10}
                                    value={questionText}
                                    onChange={(event) => { setQuestionText(event.target.value) }}
                                />

                                {
                                    answerOptions.map(choice => {
                                        return (
                                            <AnswerChoiceView text={choice['text']} correct={choice['correct']} />
                                        );
                                    })
                                }

                                {
                                    answerView &&
                                    <Card>
                                        <CardContent>
                                            <TextField
                                                id="answer_text"
                                                label="Answer Choice"
                                                value={answerText}
                                                onChange={(event) => { setAnswerText(event.target.value) }}
                                            />
                                            <Checkbox
                                                checked={correctAnswer}
                                                onChange={() => { setCorrectAnswer(!correctAnswer) }}
                                                color="primary"
                                            />
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={addNewAnswerChoice}>OK</Button>
                                            <Button size="small" color="secondary" onClick={resetAnswerView}>Cancel</Button>
                                        </CardActions>
                                    </Card>
                                }
                            </CardContent>

                            <CardActions>
                                <Button size="small" onClick={newAnswerChoiceView}>Add Answer Choice</Button>
                                <Button size="small" color="primary" onClick={addNewQuestion}>OK</Button>
                                <Button size="small" color="secondary" onClick={resetQuestionView}>Cancel</Button>
                            </CardActions>
                        </Card>
                    }
                </CardContent>

                <CardActions>
                    <Button size="small" onClick={newQuestionView}>Add New Question</Button>
                </CardActions>

            </Card>

            <br /><br /><br /><br /><br /><div onClick={() => { navigateToRoute('/') }}>home</div>

        </main>
    );
}

export default QuizBuilder;