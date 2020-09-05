import React, { useContext } from 'react';
import { AppContext } from '../contexts/appContexts';
import { toggleButton } from '../actions/actionCreaters';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0.5),
    },
}));

// 関数コンポーネント
// renderだけでstateを持たないコンポーネントならこれを使えば簡単にかける
function MyButton(props) {
    const {dispatch} = useContext(AppContext);
    const classes = useStyles();

    return (
        // propは、<MyButton/>で呼び出すときに属性(prop)として指定するのを参照するということ
        <Button className={classes.root} onClick={() => toggleButton(dispatch, props.value)} variant="contained" color={props.color} size="medium">
            {props.value}
        </Button>
    );
}

function ButtonList(props) {
    const { state } = useContext(AppContext);
    const classes = useStyles();
    
    function renderButton(i) {
        var color = state.isPlayed[i] ? "primary" : "default";
        return(
            <MyButton
                value={i}
                color={color}
            />
        );
    }

    var start = Number(props.start);
    var end = Number(props.end);

    const numberList = Array(end-start+1).fill(0).map((_,i) => i+start);
    const ButtonListItems = numberList.map((value) => 
        renderButton(value)
    )

    return (
        <div className={classes.root}>
            {ButtonListItems}
        </div>
    )
}

function ButtonTable(props) {
    function renderButtonList(start, end) {
        return (
            <ButtonList
                start={start}
                end={end}
            />
        );
    }

    var N = Number(props.N);
    var column = Number(props.column);

    var List = [];
    for(var i = 1; i <= N; i += column) {
        List.push({start: i, end: Math.min(i+column-1, N)})
    }

    const ButtonTableItems = List.map((value) => 
        renderButtonList(value.start, value.end)
    );

    return (
        <div className="button-table">
            {ButtonTableItems}
        </div>
    )
}

function CountBoard(props) {
    return (
        <ButtonTable 
                N="104"
                column="10"
        />
    )
}

export default CountBoard;