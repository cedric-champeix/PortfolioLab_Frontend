import { Contact } from './Contact.ts';
import { Education } from './Education.ts';
import { Experience } from './Experience.ts';
import { Hobby } from './Hobby.ts';
import { ImageObj } from './Image.ts';
import { Language } from './Language.ts';
import { Skill } from './Skill.ts';

export interface Resume {
  id: string;
  description: string;
  title: string;
  Image: ImageObj;
  ImageId: string;
  skills: Skill[];
  contacts: Contact[];
  experiences: Experience[];
  formations: Education[];
  languages: Language[];
  hobbies: Hobby[];
  userId: string;
  published: boolean;
}
