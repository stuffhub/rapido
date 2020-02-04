import update from "immutability-helper";

export default (state = {}, action) => {
    switch (action.type) {
        case "CREATE_RESULT": {
            return { ...state, rapidoResult: action.payload };
        }
        case "CREATE_NUMBERS": {
            const { numbers, i: id } = action.payload;
            return update(state, {
                rapidoFields: {
                    [id]: {
                        numbersList: { $set: numbers }
                    }
                }
            });
        }
        case "TOGGLE_ACTIVE_CLASS": {
            const { fieldIdx, numberIdx, isActive } = action.payload;
            return update(state, {
                rapidoFields: {
                    [fieldIdx]: {
                        numbersList: {
                            [numberIdx]: {
                                isActive: { $set: isActive }
                            }
                        }
                    }
                }
            });
        }
        case "CHANGE_COUNTER": {
            const { value, fieldIdx } = action.payload;
            return update(state, {
                rapidoFields: {
                    [fieldIdx]: {
                        counter: { $set: value }
                    }
                }
            });
        }
        case "DISABLE_NUMBERS": {
            return update(state, {
                rapidoFields: {
                    [action.payload]: {
                        numbersList: {
                            $apply: numbers => {
                                return numbers.map(item => {
                                    if (!item.isActive) {
                                        return { ...item, isDisable: true };
                                    }
                                    return item;
                                });
                            }
                        }
                    }
                }
            });
        }
        case "ENABLE_NUMBERS": {
            return update(state, {
                rapidoFields: {
                    [action.payload]: {
                        numbersList: {
                            $apply: numbers => {
                                return numbers.map(item => {
                                    if (item.isDisable) {
                                        return { ...item, isDisable: false };
                                    }
                                    return item;
                                });
                            }
                        }
                    }
                }
            });
        }
        case "UPDATE_ACTIVE_NUMBERS": {
            const newState = [
                ...state["rapidoFields"][action.payload]["numbersList"]
                    .filter(number => {
                        return number.isActive;
                    })
                    .map(number => {
                        return number.label;
                    })
            ];
            return update(state, {
                rapidoActiveNumbers: {
                    [action.payload]: {
                        $set: newState
                    }
                }
            });
        }
        case "UPDATE_WINNER": {
            return {...state, isWinner: !state.isWinner}
        }
        default:
            return state;
    }
};
