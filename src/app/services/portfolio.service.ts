import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project, Skill, Experience, Certification, DashboardStats, User, ContactMessage } from '../models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.api}/projects`).pipe(catchError(() => of(this.staticProjects)));
  }
  getFeaturedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.api}/projects/featured`).pipe(catchError(() => of(this.staticProjects.filter(p => p.featured))));
  }
  createProject(p: Project): Observable<Project> { return this.http.post<Project>(`${this.api}/projects`, p); }
  updateProject(id: number, p: Project): Observable<Project> { return this.http.put<Project>(`${this.api}/projects/${id}`, p); }
  deleteProject(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/projects/${id}`); }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.api}/skills`).pipe(catchError(() => of(this.staticSkills)));
  }
  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.api}/experiences`).pipe(catchError(() => of(this.staticExperiences)));
  }
  getCertifications(): Observable<Certification[]> {
    return this.http.get<Certification[]>(`${this.api}/certifications`).pipe(catchError(() => of(this.staticCertifications)));
  }
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.api}/dashboard/stats`).pipe(catchError(() => of(this.staticStats)));
  }
  getUsers(): Observable<User[]> { return this.http.get<User[]>(`${this.api}/users`); }
  updateUserRole(id: number, role: string): Observable<User> { return this.http.put<User>(`${this.api}/users/${id}/role?role=${role}`, {}); }
  deleteUser(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/users/${id}`); }
  sendContact(data: any): Observable<any> {
    return this.http.post(`${this.api}/contact`, data).pipe(catchError(() => of({ success: true })));
  }
  getMessages(): Observable<ContactMessage[]> { return this.http.get<ContactMessage[]>(`${this.api}/contact`); }
  markRead(id: number): Observable<any> { return this.http.put(`${this.api}/contact/${id}/read`, {}); }

  private staticProjects: Project[] = [
    {
      id: 1, title: 'NeoBank 360', description: 'Complete digital banking platform with Spring Boot REST APIs, Angular PROGRAMMING, JWT authentication, MySQL DATABASE, and Docker deployment. Features include account management, transactions, and secure user flows.',
      techStack: 'Java, Spring Boot, Angular, MySQL, JWT, Docker', githubUrl: 'https://github.com/swatik-cyber', liveUrl: '', featured: true, displayOrder: 1,
      category: 'Full Stack', status: 'COMPLETED', startDate: new Date('2024-01-01'), endDate: new Date('2024-06-01')
    },
    {
      id: 2, title: 'Restaurant Management System', description: 'Full stack enterprise application with Spring Boot Microservices, Angular UI, Hibernate/JPA, JWT auth, and CI/CD deployment — 35% faster order processing with clean OOP architecture.',
      techStack: 'Spring Boot, Angular, Microservices, Hibernate, JWT, CI/CD', githubUrl: 'https://github.com/swatik-cyber', liveUrl: '', featured: true, displayOrder: 2,
      category: 'Full Stack', status: 'COMPLETED', startDate: new Date('2024-06-01'), endDate: new Date('2024-10-01')
    },
    {
      id: 3, title: 'AI Health Assistant', description: 'Production MACHINE_LEARNING application with LLM API integration, prompt engineering, Linear/Logistic Regression, NLP preprocessing. Live deployed — demonstrates end-to-end Python MACHINE_LEARNING capability.',
      techStack: 'Python, LLM APIs, Streamlit, Scikit-learn, NLP', githubUrl: 'https://github.com/swatik-cyber/Health-Care-Chat-Bot', liveUrl: 'https://github.com/swatik-cyber/Health-Care-Chat-Bot', featured: true, displayOrder: 3,
      category: 'MACHINE_LEARNING', status: 'COMPLETED', startDate: new Date('2024-10-01'), endDate: new Date('2025-01-01')
    },
    {
      id: 4, title: 'IPL Match Prediction', description: 'Applied Linear Regression, Logistic Regression, and statistical modelling on large IPL datasets; built ETL pipeline with feature engineering and predictive model for match outcome forecasting.',
      techStack: 'Python, Scikit-learn, Pandas, NumPy, Statistical Analysis', githubUrl: 'https://github.com/swatik-cyber', liveUrl: '', featured: false, displayOrder: 4,
      category: 'MACHINE_LEARNING', status: 'COMPLETED', startDate: new Date('2024-08-01'), endDate: new Date('2024-12-01')
    },
  ];

 private staticSkills: Skill[] = [
  { id: 1, name: 'Java', category: 'PROGRAMMING', proficiency: 95, icon: '☕', displayOrder: 1 },
  { id: 2, name: 'Spring Boot', category: 'PROGRAMMING', proficiency: 92, icon: '🍃', displayOrder: 2 },
  { id: 3, name: 'Angular', category: 'PROGRAMMING', proficiency: 88, icon: '🅰️', displayOrder: 3 },
  { id: 4, name: 'TypeScript', category: 'PROGRAMMING', proficiency: 85, icon: '📘', displayOrder: 4 },
  { id: 5, name: 'Python', category: 'PROGRAMMING', proficiency: 90, icon: '🐍', displayOrder: 5 },

  { id: 6, name: 'MySQL', category: 'DATABASE', proficiency: 88, icon: '🗄️', displayOrder: 6 },

  { id: 7, name: 'Docker', category: 'TOOLS', proficiency: 80, icon: '🐳', displayOrder: 7 },
  { id: 8, name: 'Git', category: 'TOOLS', proficiency: 92, icon: '📦', displayOrder: 8 },
  { id: 9, name: 'AWS', category: 'TOOLS', proficiency: 75, icon: '☁️', displayOrder: 9 },

  { id: 10, name: 'Pandas', category: 'MACHINE_LEARNING', proficiency: 88, icon: '🐼', displayOrder: 10 },
  { id: 11, name: 'Scikit-learn', category: 'MACHINE_LEARNING', proficiency: 82, icon: '🤖', displayOrder: 11 },
  { id: 12, name: 'LLM APIs', category: 'MACHINE_LEARNING', proficiency: 80, icon: '🧠', displayOrder: 12 },

  { id: 13, name: 'TensorFlow', category: 'DEEP_LEARNING', proficiency: 85, icon: '🧠', displayOrder: 13 },
  { id: 14, name: 'Keras', category: 'DEEP_LEARNING', proficiency: 82, icon: '⚡', displayOrder: 14 },

  { id: 15, name: 'NumPy', category: 'LIBRARIES', proficiency: 90, icon: '🔢', displayOrder: 15 },
  { id: 16, name: 'OpenCV', category: 'LIBRARIES', proficiency: 78, icon: '📷', displayOrder: 16 },

  { id: 17, name: 'REST APIs', category: 'CONCEPTS', proficiency: 95, icon: '🔌', displayOrder: 17 },
  { id: 18, name: 'JWT', category: 'CONCEPTS', proficiency: 88, icon: '🔐', displayOrder: 18 },
  { id: 19, name: 'Hibernate', category: 'CONCEPTS', proficiency: 85, icon: '🏗️', displayOrder: 19 },

  { id: 20, name: 'HTML5/CSS3', category: 'PROGRAMMING', proficiency: 90, icon: '🎨', displayOrder: 20 },
  { id: 21, name: 'Bootstrap', category: 'PROGRAMMING', proficiency: 88, icon: '🅱️', displayOrder: 21 },
];
  private staticExperiences: Experience[] = [
    {
      id: 1, title: 'Full Stack Java Developer Intern', company: 'Infosys', location: 'Bhubaneswar',
      startDate: new Date('2025-07-01'), endDate: new Date(), current: true, type: 'INTERNSHIP',
      description: 'Building enterprise full-stack applications',
      highlights: [
        'Designed Java Spring Boot PROGRAMMING with REST APIs, Hibernate/JPA, and JWT + Spring Security authentication',
        'Built Angular responsive PROGRAMMINGs with TypeScript, HTML5, CSS3, Bootstrap',
        'Built Python ETL pipelines (Pandas, NumPy) processing 500K+ records — reduced discrepancies by 30%',
        'Integrated LLM APIs and prompt engineering for AI-powered features',
        'Followed Agile/Scrum sprint planning, code reviews, and documentation standards'
      ], displayOrder: 1
    },
    {
      id: 2, title: 'Data Engineer Intern', company: 'Revature', location: 'Remote',
      startDate: new Date('2025-02-01'), endDate: new Date('2025-06-30'), current: false, type: 'INTERNSHIP',
      description: 'Data engineering and ETL pipelines',
      highlights: [
        'Built Python + SQL ETL data pipelines with data validation and reporting',
        'Applied Git Flow workflows — reduced processing time by 25%',
        'Developed reusable data transformation modules and automated reporting dashboards'
      ], displayOrder: 2
    },
  ];

  private staticCertifications: Certification[] = [
    { id: 1, name: 'Associate IT Foundation', issuer: 'Infosys', issueDate: new Date('2025-07-01'), credentialUrl: '', description: 'Java, Spring Boot, Angular, SDLC, Agile, enterprise engineering', displayOrder: 1 },
    { id: 2, name: 'AWS Machine Learning Foundations', issuer: 'Amazon Web Services', issueDate: new Date('2025-03-01'), credentialUrl: '', description: 'ML, AI, ETL, cloud, Docker, TOOLS', displayOrder: 2 },
    { id: 3, name: 'Google Data Analytics Professional Certificate', issuer: 'Google', issueDate: new Date('2025-01-01'), credentialUrl: '', description: 'Python, ETL, SQL, data analytics, statistical analysis', displayOrder: 3 },
  ];

  private staticStats: DashboardStats = {
    totalProjects: 4, totalSkills: 17, totalExperiences: 2, totalCertifications: 3,
    totalMessages: 0, unreadMessages: 0, profileViews: 0, totalUsers: 1
  };
}
