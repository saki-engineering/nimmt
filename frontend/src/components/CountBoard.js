import React, { useContext } from 'react';
import DropBox from './DropBox';
import { AppContext } from '../contexts/appContexts';

// 関数コンポーネント
// renderだけでstateを持たないコンポーネントならこれを使えば簡単にかける
function Button(props) {
    const {toggleButton} = useContext(AppContext)
    return (
        // propは、<Button/>で呼び出すときに属性(prop)として指定するのを参照するということ
        <button className="button" onClick={() => toggleButton(props.value)} style={props.style}>
            {props.value}
        </button>
    );
}

function ButtonList(props) {
    const { isPlayed } = useContext(AppContext)
    
    function renderButton(i) {
        var color = isPlayed[i] ? "red" : "white";
        var style = {
            "background-color": color
        };
        return(
            <Button
                value={i}
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
    const { multiOnButton } = useContext(AppContext)

    window.wails.Events.On("analyzed", cardList => {
        multiOnButton(cardList)
    })

    function renderButtonTable() {
        return (
            <ButtonTable 
                N="104"
                column="10"
            />
        )
    }

    function renderDropBox() {
        return (
            <DropBox/>
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