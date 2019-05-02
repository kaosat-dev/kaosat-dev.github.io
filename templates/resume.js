
const spaceToDash = x => x.replace(' ', '-')
const toLowerCase = x => x
const year = x => x
const paragraphSplit = x => x

const basicsTemplate = basics => {
  const { name, picture, birthDate, location, label } = basics
  const summary = basics.summary ? `<section class="section main-summary">
    <section>
      <div>${basics.summary}</div>
    </section>
  </section>
  ` : ''

  const pictureEl = picture ? `<img class="picture" src="${picture}" alt="${name}" />` : ``
  const nameEl = `<div class="middle">
    ${pictureEl}
    <h1 class="name">${name}</h1>
    <h2 class="label">${label}</h2>
  </div>`

  const birthEl = birthDate ? `
  <div class="date">
    <div class="foo">${birthDate}</div>
  </div>` :	``

  const locationEl = location ? `
    <span class="location">
      ${location.address ? `<span class="address">${location.address},</span> ` : ''}
      ${location.postalCode ? `<span class="postalCode">${location.postalCode},</span> ` : ''}
      ${location.city ? `<span class="city">${location.city},</span> ` : ''}
      ${location.region ? `<span class="region">${location.region}</span> ` : ''}
      ${location.countryCode ? `<span class="countryCode">${location.countryCode}</span> ` : ''}
    </span>
  ` : ``

  const profiles = basics.profiles.map(profile => {
    const url = !profile.url ? `<span>${profile.username}</span>` : `
      <span class="url">
        <a target="_blank" href="${profile.url}">${profile.username}</a>
      </span>      
    `
    const network = !profile.network ? '' : `
    <div class="username">
      <span class="fa fa-${spaceToDash(profile.network)} ${spaceToDash(profile.network)} social"></span>
      ${url}
    </div>
    `
    return `<div class="item">${network}</div>`
  })

  const profilesEl = !basics.profiles.length ? '' : `
    <div id="profiles">
      ${profiles}
    </div>
    `

  return `
    <header id="header" class="clear">
      ${nameEl}
      ${birthEl}
      ${locationEl}

    <div id="contact">
      ${basics.website ? `
      <div class="website">
        <span class="fa fa-external-link"></span>
        <a target="_blank" target="_blank" href="${basics.website}">${basics.website}</a>
      </div>` : ``
}
      
      ${basics.email ? `
      <div class="email">
        <span class="fa fa-envelope-o"></span>
        <a href="mailto:${basics.email}">${basics.email}</a>
      </div>` : ``
}
      ${basics.phone ? `
      <div class="phone">
        <span class="fa fa-mobile"></span>
        <a href="tel:${basics.phone}">${basics.phone}</a>
      </div>` : ``
}
    </div>
    ${profilesEl}
    ${summary}
  </header>
  
`
}

const skillsTemplate = skills => {
  if (!skills.length) {
    return ''
  }

  const skillsList = skills.map(skill => `
    <div class='item'>
      ${skill.name ? `
        <h3 class="name">
        ${skill.name}
        </h3>
      ` : ''}
      ${skill.level ? `
        <div class="level ${toLowerCase(skill.level)}">
          <em>${skill.level}</em>
          <div class="bar"></div>
        </div>` : ''
}

      ${skill.keywords.length ? `
        <ul class="keywords">
          ${skill.keywords.map(kw => `<li>${kw}</li>`).join('')}
        </ul>
      ` : ''}
    </div>`
  )

  return `
  <section class="section margin1">
    <header>
      <h2 class='section-title'>Skills</h2>
    </header>
  </section>
  <section id="skills">
    ${skillsList.join('')}
  </section>
  `
}

const workTemplate = (works, workLabel = 'work') => {
  const entries = works.map((entry, index) => {
    const company = entry.company ? `
      ${entry.summary ? `
        <input id="work-item-${index}" type="checkbox" class="toggle-item" />
        <label for="work-item-${index}"></label>
      ` : ''}
      <header>
        ${entry.position ? ` <div class="position">${entry.position}</div>` : ''}       
        <div class="company">
          ${entry.website ? `<a target="_blank" href="${entry.website}">${entry.website}</a>` : ` ${entry.company}`}
        </div>
        <div class="date">
          ${entry.startDate ? `<span class="startDate">${year(entry.startDate)}</span> ` : ''}
          ${entry.endDate ? `<span class="endDate"> - ${year(entry.endDate)}</span> ` : '<span class="endDate">- Current</span>'}
        </div>
      </header>
    ` : ''

    const location = entry.location ? `
      <span class="location">
        <span class="fa fa-map-marker"></span> 
        ${entry.location.city ? `<span class="city">${entry.location.city},</span>` : ``}
        ${entry.location.countryCode ? `<span class="countryCode">${entry.location.countryCode},</span>` : ``}
        ${entry.location.region ? `<span class="region">${entry.location.region},</span>` : ``}
      </span>
    ` : ''

    const keywords = entry.keywords.length ? ` 
      <ul class="keywords">
      ${entry.keywords.map(kw => `<li>${kw}</li>`).join('')}
      </ul>` : ''

    const summary = entry.summary ? `
      <div class="summary">
        <p>${paragraphSplit(entry.summary)}</p>
      </div>` : ''

    const highlights = entry.highlights.length ? `
      <ul class="highlights">

      ${entry.highlights.map(h => `<li>${paragraphSplit(h)}</li>`).join('')}
  
      </ul>
    ` : ''

    return `
  <section class="work-item">
    ${company}
    ${location}
    ${keywords}
   
    <div class="item" id="work-item">
     ${summary}
     ${highlights}
    </div>
  </section>
  `
  })

  return `
  <section class="section">
    <header>
      <h2 class='section-title'>${workLabel} <span class="item-count">(${works.length})</span></h2>
    </header>
  
    <section id="work">
      ${entries.join('')}
    </section>
  </section>
`
}

const projectsTemplate = (projects, projectsLabel = 'projects') => {
  const entries = projects.map((entry, index) => {
    const company = entry.company || entry.name ? `
      ${entry.summary ? `
        <input id="project-item-${index}" type="checkbox" class="toggle-item" />
        <label for="project-item-${index}"></label>
      ` : ''}
      <header>
        ${entry.position ? ` <div class="position">${entry.position}</div>` : ''}
        ${entry.name ? ` <div class="position">${entry.name}</div>` : ''}  
        <div class="company">
          ${entry.website ? `<a target="_blank" href="${entry.website}">${entry.website}</a>` : ` ${entry.company}`}
        </div>
        <div class="date">
          ${entry.startDate ? `<span class="startDate">${year(entry.startDate)}</span> ` : ''}
          ${entry.endDate ? `<span class="endDate"> - ${year(entry.endDate)}</span> ` : '<span class="endDate"> - Current</span>'}
        </div>
      </header>
    ` : ''

    const location = entry.location ? `
      <span class="location">
        <span class="fa fa-map-marker"></span> 
        ${entry.location.city ? `<span class="city">${entry.location.city},</span>` : ``}
        ${entry.location.countryCode ? `<span class="countryCode">${entry.location.countryCode},</span>` : ``}
        ${entry.location.region ? `<span class="region">${entry.location.region},</span>` : ``}
      </span>
    ` : ''

    const keywords = entry.keywords ? ` 
      <ul class="keywords">
      ${entry.keywords.map(kw => `<li>${kw}</li>`).join('')}
      </ul>` : ''

    const summary = entry.summary ? `
      <div class="summary">
        <p>${paragraphSplit(entry.summary)}</p>
      </div>` : ''

    const highlights = entry.highlights ? `
      <ul class="highlights">

      ${entry.highlights.map(h => `<li>${paragraphSplit(h)}</li>`).join('')}
  
      </ul>
    ` : ''

    return `
  <section class="project-item">
    ${company}
    ${location}
    ${keywords}
   
    <div class="item" id="project-item">
     ${summary}
     ${highlights}
    </div>
  </section>
  `
  })

  return `
  <section class="section">
    <header>
      <h2 class='section-title'>${projectsLabel} <span class="item-count">(${projects.length})</span></h2>
    </header>
  
    <section id="projects">
      ${entries.join('')}
    </section>
  </section>
`
}

const volunteerTemplate = (volunteering, volunteerLabel = 'volunteering') => {
  const entries = volunteering.map((entry, index) => {
    const organization = entry.organization ? `
      ${entry.summary ? `
        <input id="volunteer-item-${index}" type="checkbox" class="toggle-item" />
        <label for="volunteer-item-${index}"></label>
      ` : ''}
      <header>
        ${entry.position ? ` <div class="position">${entry.position}</div>` : ''}
        ${entry.name ? ` <div class="position">${entry.name}</div>` : ''}  
        <div class="organization">
          ${entry.website ? `<a target="_blank" href="${entry.website}">${entry.website}</a>` : ` ${entry.organization}`}
        </div>
        <div class="date">
          ${entry.startDate ? `<span class="startDate">${year(entry.startDate)}</span> ` : ''}
          ${entry.endDate ? `<span class="endDate"> - ${year(entry.endDate)}</span> ` : '<span class="endDate"> - Current</span>'}
        </div>
      </header>
    ` : ''

    const location = entry.location ? `
      <span class="location">
        <span class="fa fa-map-marker"></span> 
        ${entry.location.city ? `<span class="city">${entry.location.city},</span>` : ``}
        ${entry.location.countryCode ? `<span class="countryCode">${entry.location.countryCode},</span>` : ``}
        ${entry.location.region ? `<span class="region">${entry.location.region},</span>` : ``}
      </span>
    ` : ''

    const keywords = entry.keywords ? ` 
      <ul class="keywords">
      ${entry.keywords.map(kw => `<li>${kw}</li>`).join('')}
      </ul>` : ''

    const summary = entry.summary ? `
      <div class="summary">
        <p>${paragraphSplit(entry.summary)}</p>
      </div>` : ''

    const highlights = entry.highlights ? `
      <ul class="highlights">

      ${entry.highlights.map(h => `<li>${paragraphSplit(h)}</li>`).join('')}
  
      </ul>
    ` : ''

    return `
  <section class="volunteer-item">
    ${organization}
    ${location}
    ${keywords}
   
    <div class="item" id="volunteer-item">
     ${summary}
     ${highlights}
    </div>
  </section>
  `
  })

  return `
  <section class="section">
    <header>
      <h2 class='section-title'>${volunteerLabel} <span class="item-count">(${volunteering.length})</span></h2>
    </header>
  
    <section id="projects">
      ${entries.join('')}
    </section>
  </section>
`
}

const educationTemplate = (education, educationLabel = 'education') => {
  if (!education) {
    return ''
  }

  const entries = education.map((entry, index) => {
    return `
    <section class="education-item">
      ${entry.summary ? `
      <input id="education-item-${index}" type="checkbox" class="toggle-item" />
      <label for="education-item-${index}"></label>
    ` : ''}
      <header>
        <div class="header-left">
          ${entry.studyType ? ` <div class="studyType">${entry.studyType}</div>` : ''}
          ${entry.area ? ` <div class="area">${entry.area}</div>` : ''}
          ${entry.institution ? ` <div class="institution">${entry.institution}</div>` : ''}
        </div>
        <div class="date">
          ${entry.startDate ? `<span class="startDate">${year(entry.startDate)}</span> ` : ''}
          ${entry.endDate ? `<span class="endDate"> - ${year(entry.endDate)}</span> ` : '<span class="endDate"> - Current</span>'}
        </div>
      </header>

      ${entry.location ? `
      <span class="location">
        <span class="fa fa-map-marker"></span> 
        ${entry.location.city ? `<span class="city">${entry.location.city},</span>` : ``}
        ${entry.location.countryCode ? `<span class="countryCode">${entry.location.countryCode},</span>` : ``}
        ${entry.location.region ? `<span class="region">${entry.location.region},</span>` : ``}
      </span>
      ` : ''}

      ${entry.courses ? `
      <ul class="courses">
        ${entry.courses.map(c => `<li>${c}</li>`).join('')}
      </ul>
      ` : ''}

      <div class="item">
        ${entry.gpa ? `<div class='gpa'> <strong> Grade:</strong> <span>${entry.gpa}</span></div>` : ''}
        ${entry.summary ? `<div class="summary">
          <p>${paragraphSplit(entry.summary)}</p>
        </div>
        ` : ''}

      </div>
    </section>
   `
  })

  return `
    <section class="section">
    <header>
      <h2 class='section-title'>${educationLabel}<span class="item-count"> (${education.length})</span></h2>
    </header>
  
    <section id="education">
      ${entries.join('')}
    </section>
  </section>`
}

const languagesTemplate = (languages, label) => {
  if (!languages.length) {
    return ''
  }

  const languagesEl = languages.map(lang => {
    return `<div class="display">
      ${lang.language ? `
        <h3 class="language">
          ${lang.language}
        </h3>` : ''
}
      
      <div class="item">
        ${lang.fluency ? `
          <div class="level fluency ${toLowerCase(lang.fluency)}">
            <em>${lang.fluency}</em>
          </div>` : ''}
       
      </div>
    </div>`
  })

  return `
    <section class="section margin1">
    <header>
      <h2 class='section-title'>${label}</h2>
    </header>
    <section id="languages">
     ${languagesEl}
    </section>
  </section>
  `
}

const interestsTemplate = interests => ''

const resumeTemplate = (siteMeta, content, meta) => {
  const { resume } = meta
  const { basics, skills, work, projects, volunteer, education, languages, interests } = resume
  const { workLabel, projectsLabel, writingLabel, educationLabel, languagesLabel, volunteerLabel } = resume
  return `<!doctype html>
  <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <title>${basics.name}</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="/assets/style/resume.css">
    <link rel="stylesheet" href="/assets/style/github-markdown.css">
    </head>
    <body>
      <div id="resume">
        ${basicsTemplate(basics)}
        ${skillsTemplate(skills)}
        ${workTemplate(work, workLabel)}
        ${projectsTemplate(projects, projectsLabel)}
        ${volunteerTemplate(volunteer, volunteerLabel)}
        ${educationTemplate(education, educationLabel)}
        
        ${languagesTemplate(languages, languagesLabel)}
        ${interestsTemplate(interests)}
      </div>
    </body>
  </html>`

  /*
  ${awardsTemplate(awards)}
        ${publicationsTemplate(publications)}
  */
}

module.exports = resumeTemplate
