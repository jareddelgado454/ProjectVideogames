import React from 'react'

const About = () => {
  return (
    <div className='divAbout'>
        <div className='firstContainerAbout'>
            <div className='firstContainerAboutLeftSide '>
                <h2 className='aboutAppLeft'>About the app</h2>
            </div>
            <div className='firstContainerAboutrightSide'>
                <p>In this application, I have crafted an immersive experience for gaming enthusiasts by designing an innovative platform using React on the frontend and Node.js on the backend, supported by a robust PostgreSQL database. Our app provides an extensive list of video games, allowing you to explore and discover new titles easily and quickly. With the ability to create and add your own video games to the platform, we aim to make you an active part of our community.
                  <br/>
                  <br/>
                  Furthermore, we have integrated advanced features that enhance the user experience, such as the ability to apply custom filters to find specific games based on your preferences. With technologies like Redux and Axios, we have optimized the application's state management and improved HTTP requests for a smooth and efficient experience. We not only offer you a list of games but also a space dedicated to reviews and ratings. In our reviews section, you can share your thoughts and evaluate video games, contributing to a vibrant and engaged community. Explore, create, and share your passion for gaming with our app!
                </p>
            </div>
        </div>
        <div className='firstContainerAbout'>
            <div className='firstContainerAboutLeftSide '>
                <h2 className='aboutDeveloperRight'>About the Developer</h2>
            </div>
            <div className='firstContainerAboutrightSide'>
                <p>As a passionate developer, I specialize in crafting dynamic and efficient web experiences using cutting-edge technologies. With a focus on the MERN stack (MongoDB, Express.js, React.js, and Node.js), I've honed my skills in designing and building scalable, modern applications. My expertise in integrating databases like MongoDB and PostgreSQL, coupled with the use of tools like Sequelize, reflects my commitment to constructing robust and efficient systems. Additionally, my proficiency in JavaScript extends across various libraries and frameworks, solidifying my ability to create comprehensive and optimized technological solutions.
                <br/>
                <br/>
                With a proactive approach and a love for technical challenges, I've cultivated skills in frontend development with React, delivering engaging and responsive user interfaces. My journey in the realm of web development is not only about mastering technologies but also about a constant commitment to continuous improvement. I am a staunch advocate for clean and efficient code, and my experience spans a broad spectrum of technologies that empower me to confidently tackle complex projects with both creativity and precision.</p>
            </div>
            
        </div>
    </div>
  )
}

export default About