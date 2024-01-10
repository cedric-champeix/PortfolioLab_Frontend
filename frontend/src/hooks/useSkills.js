import {useContext} from "react";
import {SkillsContext} from "../context/SkillsContext.jsx";

export const useSkills = () => useContext(SkillsContext);