import React, { useContext } from 'react';

export function toggleButton(dispatch, i) {
    const action = {
        type: "toggle",
        data: {
            index: i
        }
    };
    dispatch(action);
}

export function multiOnButton(dispatch, result) {
    const action = {
        type: "multiOn",
        data: {
            array: result
        }
    };
    dispatch(action);
}