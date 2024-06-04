import React from "react";
import Button from "@mui/material/Button";
import "./css/components.css"
import {SlArrowDown, SlArrowUp} from "react-icons/sl";
import PropTypes from "prop-types";

export default function MoveComponent({id, move, prevIndex, nextIndex}) {

    const moveUp = async () => {
        const body = {
            newIndex: prevIndex || -5,
            distance: 2
        }

        await move(id, body)
    }

    const moveDown = async () => {
        const body = {
            newIndex: nextIndex || -5,
            distance: 2
        }

        await move(id, body)
    }

    return <div>
        { prevIndex ?
            <Button style={{height: "100%", width: "100%", borderRadius: "15px"}}
                    onClick={moveUp}>
                <SlArrowUp size="35px"
                             className="move-arrow"/>
            </Button> :
            <Button style={{height: "100%", width: "100%", borderRadius: "15px"}}
                    onClick={moveDown}>
                <SlArrowDown size="35px"
                             className="move-arrow"/>
            </Button>
        }
    </div>
}

MoveComponent.propTypes = {
    id: PropTypes.string,
    move: PropTypes.func,
    prevIndex: PropTypes.number,
    nextIndex: PropTypes.number
}