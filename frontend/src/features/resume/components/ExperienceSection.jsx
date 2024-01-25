import {useCRUD} from "../hooks/useCRUD.js";
import {endpoints} from "../../../data/endpoints.js";
import {removeSafeguard} from "./RemoveSafeguard.js";

export default function ExperienceSection() {

    //CRUD on experiences endpoint
    const {update, create,remove, data} = useCRUD(endpoints.experienceEndpoint)





}