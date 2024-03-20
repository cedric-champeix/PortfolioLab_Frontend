import {useState} from "react";
import TextEditor from "../TextEditor.jsx";
import PropTypes from "prop-types";

export default function TextComponent({component, update}) {

    const [data, setData] = useState(component);

    const save = (event, editor) => {
        let temp = data
        temp.data.text = editor.getContent({format: 'html'})
        update(data.id, temp)
    }

    return <TextEditor text={data.data.text} save={save} height="300px" width="100%"/>

}

TextComponent.propTypes = {
    component: PropTypes.object,
    update: PropTypes.func
}