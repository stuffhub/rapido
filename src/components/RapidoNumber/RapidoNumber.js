import React from "react";

import "./RapidoNumber.scss";

import classNames from "classnames";

const RapidoNumber = ({numberIdx, label, isActive, isDisable, onClickNumber}) => {
    return (
        <div
            className={classNames("rapido-number", {
                '_active': isActive,
                '_disable': isDisable
            })}
            onClick={() => {
                if (isDisable) return;
                onClickNumber(numberIdx, !isActive);
            }}
        >
            {label}
        </div>
    );
}

export default RapidoNumber;