import { Skill } from './Skill.ts';
import { ImageObj } from './Image.ts';

export interface Project {
  id: string,
  name: string,
  description: string,
  visible: boolean,
  contributors: string[],
  components: [],
  MainImageId: string,
  MainImage: ImageObj,
  projectImagesIds: string[],
  projectImages: ImageObj[]
  skills: Skill[],
  skillIds: string[],
  userId: string,
}