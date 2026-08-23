import { useState } from 'react';
import { PROJECTS } from '../data/projects.js';

function ProjectPreview({ project }) {
  return (
    <div className="project-preview">
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dot red"></span>
        <span className="browser-dot yellow"></span>
        <span className="browser-dot green"></span>
        <span className="browser-title">{project.browserTitle}</span>
      </div>
      <div className={`preview-canvas ${project.canvas}`} aria-hidden="true">
        <div className="pv-glow"></div>
        <div className="pv-side"><i></i><i></i><i></i><i></i><i></i></div>
        <div className="pv-main">
          <div className="pv-topbar"></div>
          {project.canvas === 'canvas-et' && (
            <>
              <div className="pv-cards"><span className="pv-card"></span><span className="pv-card"></span><span className="pv-card"></span></div>
              <div className="pv-lines"><i className="w95"></i><i className="w80"></i><i className="w70"></i><i className="w85"></i><i className="w55"></i></div>
            </>
          )}
          {project.canvas === 'canvas-lms' && (
            <div className="pv-grid"><span></span><span></span><span></span><span></span><span></span><span></span></div>
          )}
          {project.canvas === 'canvas-crm' && (
            <div className="pv-bars">
              <i style={{ height: '38%' }}></i>
              <i style={{ height: '58%' }}></i>
              <i style={{ height: '45%' }}></i>
              <i style={{ height: '72%' }}></i>
              <i style={{ height: '55%' }}></i>
              <i style={{ height: '88%' }}></i>
              <i style={{ height: '64%' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [openProjects, setOpenProjects] = useState({});

  const toggleProject = (id) => {
    setOpenProjects(prev => ({ [id]: !prev[id] }));
  };

  return (
    <section id="projects">
      <div className="section-header reveal">
        <p className="section-num">03 — Projects</p>
        <h2 className="section-title">Built for<br /><span>production.</span></h2>
      </div>
      <div className="projects-list">
        {PROJECTS.map((project, i) => {
          const isOpen = !!openProjects[project.id];
          return (
            <article
              key={project.id}
              id={project.id}
              className={`project-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}${isOpen ? ' open' : ''}`}
            >
              <div className="project-media-row">
                <ProjectPreview project={project} />
                <div className="project-info">
                  <div className="project-headrow">
                    <span className="project-num">{project.num}</span>
                    <span className={`project-status${project.inProgress ? ' in-progress' : ''}`}>{project.status}</span>
                  </div>
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-goal">{project.goal}</p>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-stack">
                    {project.stack.map(tech => <span className="stack-badge" key={tech}>{tech}</span>)}
                  </div>
                  <button
                    type="button"
                    className="case-toggle"
                    aria-expanded={isOpen}
                    aria-controls={`${project.id}-body`}
                    onClick={() => toggleProject(project.id)}
                  >
                    {isOpen ? 'Hide Case Study' : 'Read Case Study'}
                    <span className="case-arrow" aria-hidden="true">{isOpen ? '↑' : '↓'}</span>
                  </button>
                  <p className="project-note">{project.note}</p>
                </div>
              </div>
              <div
                className="project-body"
                id={`${project.id}-body`}
                style={{ display: isOpen ? 'block' : 'none' }}
              >
                <div className="project-case">
                  {project.caseStudy.blocks.map(block => (
                    <div className="case-block" key={block.title}>
                      <h4>{block.title}</h4>
                      <ul>
                        {block.items.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="project-tech-row">
                  {project.caseStudy.techPills.map(pill => <span className="tech-pill" key={pill}>{pill}</span>)}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
