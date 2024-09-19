import { Skill } from './Skill.ts';
import { ImageObj } from './Image.ts';
import { Contact } from './Contact.ts';
import { Experience } from './Experience.ts';
import { Education } from './Education.ts';
import { Language } from './Language.ts';
import { Hobby } from './Hobby.ts';

export interface Resume {
  id: string,
  description: string,
  title: string,
  Image: ImageObj,
  ImageId: string,
  skills: Skill[],
  contacts: Contact[],
  experiences: Experience[],
  formations: Education[],
  languages: Language[],
  hobbies: Hobby[],
  userId: string,
  published: boolean
}