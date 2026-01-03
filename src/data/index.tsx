export interface Home {
  id?: number;
  welcome_message?: string;
  greeting?: string;
  name?: string;
  short_introduction?: string;
  profile_image?: string;
}

export interface CategoryAboutMe {
  id?: number;
  title?: string;
}

export interface AboutMe {
  id?: number;
  category_about_me_id?: number;
  description?: string;
}

export interface Education {
  id?: number;
  icon?: string;
  year?: string;
  level?: number;
  degree?: string;
  school?: string;
  program?: string;
}

export interface CategorySkill {
  id?: number;
  title?: string;
}

export interface Skill {
  id?: number;
  title_id?: number;
  level?: string;
  name?: string;
  percentage?: number;
  icon?: string;
  color?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tools: string | string[];
  link: string;
  img: string;
}

export interface ContactInformation {
  id?: number;
  email?: string;
  contact?: string;
  location?: string;
  linkedin_acc?: string;
  github_acc?: string;
  facebook_acc?: string;
}
