import PropTypes from "prop-types";
import parse from 'html-react-parser';

export default function ViewerTextComponent({component}) {

    const text = parse(component.data.text) || ""

    return <div>
        {text}
    </div>

}

ViewerTextComponent.propTypes = {
    component: PropTypes.object
}