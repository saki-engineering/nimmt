import React from 'react';

export function toggleButton(dispatch, i) {
    const action = {
        type: "toggle",
        data: {
            index: i
        }
    };
    dispatch(action);
}

export function multiOnButton(dispatch, dataUrl) {
    window.backend.OCR(dataUrl).then(result => {
        const action = {
            type: "multiOn",
            data: {
                array: result
            }
        };
        dispatch(action);
    });
}