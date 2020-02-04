import React, { Component } from "react";
import { connect } from "react-redux";

import range from "lodash.range";
import shortid from "shortid";

import intersection from "lodash.intersection";

import "./App.scss";

import RapidoField from "./RapidoField";

class App extends Component {
    shouldComponentUpdate(nextProps) {
        const { rapidoResult, rapidoActiveNumbers, updateWinner } = this.props;

        const firstIntersection = intersection(
            rapidoResult[0],
            rapidoActiveNumbers[0]
        ).length;

        const secondIntersection = intersection(
            rapidoResult[1],
            rapidoActiveNumbers[1]
        ).length;

        if (firstIntersection >= 3 && secondIntersection === 1 && !nextProps.isWinner) {
            updateWinner();
        }

        return true;
    }

    componentDidMount() {
        this.generateResult();
        this.generateNumbersList();
    }

    getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generateResult = () => {
        const { rapidoFields, createResult } = this.props;

        const fieldsSum = rapidoFields.length;
        let result = [];

        for (let i = 0; i < fieldsSum; i++) {
            let arr = [];
            for (let j = 0; j < rapidoFields[i].limit; j++) {
                arr.push(this.getRandomNumber(1, rapidoFields[i].sum));
            }
            result.push(arr);
        }

        createResult(result);
    }

    generateNumbersList = () => {
        const { rapidoFields, createNumbers } = this.props;

        for (let i = 0; i < rapidoFields.length; i++) {
            const numbers = range(0, rapidoFields[i].sum).map(item => {
                return {
                    id: shortid.generate(),
                    label: item + 1,
                    isActive: false,
                    isDisable: false
                };
            });
            createNumbers({ numbers, i });
        }
    }

    render() {
        const { rapidoResult, rapidoFields, isWinner } = this.props;

        return (
            <div className="rapido">
                <div className="container">
                    <div className="rapido__wrapper">
                        <span className="rapido__result">
                            {JSON.stringify(rapidoResult)}
                        </span>
                        <div className="rapido__headline">
                            <p className="rapido__title">Билет 1</p>
                            <button className="rapido__magic"></button>
                        </div>
                        {isWinner ? (
                            <p className="rapido__title">
                                Ого, вы выиграли! Поздравляем!
                            </p>
                        ) : (
                            rapidoFields.map((field, index) => {
                                return (
                                    <RapidoField
                                        key={field.id}
                                        fieldIdx={index}
                                        {...field}
                                    />
                                );
                            })
                        )}
                        <div className="rapido-submit">
                            <button className="rapido-submit__btn">
                                Показать результат
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        rapidoFields: state.rapidoFields,
        rapidoResult: state.rapidoResult,
        rapidoActiveNumbers: state.rapidoActiveNumbers,
        isWinner: state.isWinner
    }),
    dispatch => ({
        createResult: payload => dispatch({ type: "CREATE_RESULT", payload }),
        createNumbers: payload => dispatch({ type: "CREATE_NUMBERS", payload }),
        updateWinner: () => dispatch({ type: "UPDATE_WINNER" })
    })
)(App);
