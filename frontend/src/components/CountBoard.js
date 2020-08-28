import React from 'react';

// 関数コンポーネント
// renderだけでstateを持たないコンポーネントならこれを使えば簡単にかける
function Button(props) {
    return (
        // propは、<Button/>で呼び出すときに属性(prop)として指定するのを参照するということ
        <button className="button" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class ButtonList extends React.Component {
    renderButton(i) {
        return(
            <Button
                value={i}
                onClick={function() { alert('click'); }}
            />
        );
    }

    render() {
        var start = Number(this.props.start);
        var end = Number(this.props.end);

        const numberList = Array(end-start+1).fill(0).map((_,i) => i+start);
        const ButtonListItems = numberList.map((value) => 
            this.renderButton(value)
        )

        return (
            <div className="board-row">
                {ButtonListItems}
            </div>
        )
    }
}

function ButtonTable(props) {
    var N = Number(props.N);
    var column = Number(props.column);

    var List = [];
    for(var i = 1; i <= N; i += column) {
        List.push({start: i, end: Math.min(i+column-1, N)})
    }

    const ButtonTableItems = List.map((value) => 
        <ButtonList
          start={value.start}
          end={value.end}
        />
    );

    return (
        <div>
            {ButtonTableItems}
        </div>
    )
}

class CountBoard extends React.Component {
    renderButtonTable() {
        return (
            <ButtonTable 
                N="104"
                column="10"
                onClick={() => this.props.handleClick()}
            />
        )
    }

    render() {
        return (
            <div>
                {this.renderButtonTable()}
            </div>
        )
    }
}

export default CountBoard;