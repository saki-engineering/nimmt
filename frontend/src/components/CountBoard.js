import React, { useState } from 'react';
import DropBox from './DropBox';

// 関数コンポーネント
// renderだけでstateを持たないコンポーネントならこれを使えば簡単にかける
function Button(props) {
    return (
        // propは、<Button/>で呼び出すときに属性(prop)として指定するのを参照するということ
        <button className="button" onClick={props.onClick} style={props.style}>
            {props.value}
        </button>
    );
}

function ButtonList(props) {
    function renderButton(i) {
        var color = props.colors[i] ? "red" : "white";
        var style = {
            "background-color": color
        };
        return(
            <Button
                value={i}
                onClick={() => {props.onClick(i);}}
                style={style}
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
        <div className="board-row">
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
                onClick={(i) => {props.onClick(i);}}
                colors={props.colors}
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
    const [isPlayed, setIsPlayed] = useState(Array(105).fill(false))

    function handleClick(i) {
        var NewisPlayed = isPlayed.slice();
        NewisPlayed[i] = !isPlayed[i];
        setIsPlayed(NewisPlayed)
    }

    window.wails.Events.On("analyzed", cardList => {
        var NewisPlayed = isPlayed.slice();
        cardList.forEach(n => {
            console.log(n)
            console.log(typeof(n))
            NewisPlayed[n] = true
        });

        setTimeout(() => {
            setIsPlayed(NewisPlayed)
          }, 1000);
    })

    function renderButtonTable() {
        return (
            <ButtonTable 
                N="104"
                column="10"
                onClick={(i) => handleClick(i)}
                colors={isPlayed}
            />
        )
    }

    function renderDropBox() {
        return (
            <DropBox
                func={(i) => handleClick(i)}
            />
        );
    }

    return (
        <div>
            {renderButtonTable()}
            {renderDropBox()}
        </div>
    )
}

export default CountBoard;