import {
  Developer,
  DeveloperCategory
} from './developer-models';

const fakeBackend = {
  proDevs: [
    { name: "Awesome Dev", skills: ["JavaScript", "C#", "Fullstack"] },
    { name: "Pro Dev", skills: ["C++", "C#", "Backend"] },
    { name: "Old-School Champion Dev", skills: ["C++", "C", "Assembly"] },
  ],
  juniorDevs: [
    { name: "Beginner Dev", skills: ["JavaScript", "HTML", "CSS"] },
    { name: "So-called Dev", skills: ["If", "Else", "For"] },
    { name: "Kinda Dev", skills: ["CSS", "HTML"] },
  ]
}

export class DeveloperService {
  public loadAllDevelopers(): Promise<Developer[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...fakeBackend.proDevs, ...fakeBackend.juniorDevs]);
      }, 200);
    });
  }

  public loadProDevelopers(): Promise<Developer[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fakeBackend.proDevs);
      }, 200);
    });
  }

  public loadJuniorDevelopers(): Promise<Developer[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fakeBackend.juniorDevs);
      }, 200);
    });
  }

  public addNewDeveloper(category: DeveloperCategory, name: string, skills: string[]): Promise<Developer> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDev = { name, skills };

        fakeBackend[`${category}Devs`].push(newDev);
        resolve(newDev);
      }, 2000);
    });
  }
}
