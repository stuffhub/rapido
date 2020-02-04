import React, { Component } from "react";
import { connect } from "react-redux";

import "./RapidoField.scss";

import RapidoNumber from "../RapidoNumber";

class RapidoField extends Component {
    shouldComponentUpdate(nextProps) {
        const {
            counter,
            fieldIdx,
            limit,
            disableNumbers,
            enableNumbers,
            updateActiveNumbers
        } = this.props;

        if (nextProps.counter !== counter && nextProps.counter === limit) {
            disableNumbers(fieldIdx);
        }

        if (nextProps.counter !== counter && nextProps.counter < limit) {
            enableNumbers(fieldIdx);
        }

        updateActiveNumbers(fieldIdx);

        return true;
    }

    onClickNumber = (numberIdx, isActive) => {
        const {
            toggleActiveClass,
            changeCounter,
            counter,
            fieldIdx
        } = this.props;

        toggleActiveClass({ fieldIdx, numberIdx, isActive });

        changeCounter({
            value: isActive ? counter + 1 : counter - 1,
            fieldIdx
        });
    }

    render() {
        const { title, hint, numbersList } = this.props;

        return (
            <div className="rapido-field">
                <div className="rapido-field__headline">
                    <p className="rapido-field__title">{title}</p>
                    <p className="rapido-field__hint">{hint}</p>
                </div>
                <div className="rapido-field__row">
                    {numbersList.map((number, index) => {
                        return (
                            <RapidoNumber
                                key={number.id}
                                numberIdx={index}
                                {...number}
                                onClickNumber={this.onClickNumber}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default connect(null, dispatch => ({
    toggleActiveClass: payload =>
        dispatch({ type: "TOGGLE_ACTIVE_CLASS", payload }),
    changeCounter: payload => dispatch({ type: "CHANGE_COUNTER", payload }),
    disableNumbers: payload => dispatch({ type: "DISABLE_NUMBERS", payload }),
    enableNumbers: payload => dispatch({ type: "ENABLE_NUMBERS", payload }),
    updateActiveNumbers: payload => dispatch({ type: "UPDATE_ACTIVE_NUMBERS", payload})
}))(RapidoField);
