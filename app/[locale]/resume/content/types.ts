export interface Experience {
  position: string;
  company: string;
  period: string;
  description: string[];
  achievements?: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface LanguageSkill {
  language: string;
  level: string;
}

export interface Education {
  degree: string;
  institution: string;
  detail: string;
}

export interface ResumeContent {
  jobTitle: string;
  intro: string;
  achievementLabel: string;
  sections: {
    experience: string;
    academic: string;
    education: string;
    skills: string;
    languages: string;
    softSkills: string;
  };
  education: Education[];
  experiences: Experience[];
  academicActivities: Experience[];
  skillGroups: SkillGroup[];
  languages: LanguageSkill[];
  softSkills: string[];
}