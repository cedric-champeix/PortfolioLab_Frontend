import PropTypes, {string} from "prop-types";
import {Card} from "@mui/material";
import Container from "@mui/material/Container";

export default function SkillContainer({projectId, skills}) {

    return <Container sx={{ display: 'flex'}}>
        {skills.map((skill, index) => (
            <Card key={skill.id}>
                {skill.name}
            </Card>
        ))}
    </Container>

}

SkillContainer.propTypes = {
    projectId: string,
    skills: PropTypes.array
}