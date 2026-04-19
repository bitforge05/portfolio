import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Mail, ExternalLink, Code2, Database, BrainCircuit, GraduationCap, Download, ChevronRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './index.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const isInteractive = e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button');
      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className={`cursor-dot ${isHovered ? 'hovered' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`cursor-outline ${isHovered ? 'hovered' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

// Motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="portfolio-wrapper">
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, height: "4px",
          background: "var(--accent-electric-violet)",
          transformOrigin: "0%",
          scaleX,
          zIndex: 100
        }}
      />

      {/* Navigation */}
      <nav style={{ padding: '2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.8rem', color: 'var(--text-obsidian)' }}
        >
          AR<span style={{ color: 'var(--accent-cyber-peach)' }}>.</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
        >
          <a href="#about" className="text-link" style={{ display: 'none', '@media (min-width: 768px)': { display: 'block' } }}>About</a>
          <a href="#projects" className="text-link" style={{ display: 'none', '@media (min-width: 768px)': { display: 'block' } }}>Projects</a>
          <a href="#resume" className="btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
            <Download size={16} /> Resume
          </a>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="container section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: '85vh', justifyContent: 'center' }}>
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: '800px' }}>

          <motion.p variants={fadeInUp} style={{ fontFamily: 'Outfit', fontWeight: 600, color: 'var(--accent-electric-violet)', fontSize: '1.2rem', marginBottom: '1.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Hi, my name is
          </motion.p>

          <motion.h1 variants={fadeInUp} style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 1.05, marginBottom: '1rem', fontWeight: 800, letterSpacing: '-2px' }}>
            Aryan Rana.
          </motion.h1>

          <motion.h2 variants={fadeInUp} style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1, color: 'var(--text-obsidian)', opacity: 0.8, marginBottom: '2rem', fontWeight: 700, letterSpacing: '-1px' }}>
            I engineer <span className="text-gradient">scalable solutions.</span>
          </motion.h2>

          <motion.p variants={fadeInUp} style={{ fontSize: '1.25rem', lineHeight: 1.7, marginBottom: '3rem', opacity: 0.8, maxWidth: '650px', fontWeight: 400 }}>
            I'm a Full-Stack Developer & AI enthusiast studying at Newton School of Technology. I merge modern frontend experiences like React with robust backend architectures using Node.js & Python to build real-world applications.
          </motion.p>

          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#projects" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              See My Work
            </a>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginLeft: '1rem' }}>
              <a href="https://github.com/bitforge05" target="_blank" rel="noreferrer" className="text-link" aria-label="GitHub">
                <FaGithub size={28} />
              </a>
              <a href="https://www.linkedin.com/in/aryan-rana-a850162bb/" target="_blank" rel="noreferrer" className="text-link" aria-label="LinkedIn">
                <FaLinkedin size={28} />
              </a>
              <a href="mailto:aryan.rana@adypu.edu.in" className="text-link" aria-label="Email">
                <Mail size={28} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About & Education Timeline */}
      <section id="about" className="container section">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px' }}>My Journey</h2>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--text-obsidian)', opacity: 0.1 }}></div>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              padding: 'clamp(2rem, 5vw, 4rem)',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              borderRadius: '30px',
              borderTop: '1px solid rgba(255,255,255,0.8)',
              borderLeft: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
            }}
          >
            {/* Glowing Orbs */}
            <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--accent-cyber-peach) 0%, transparent 70%)', opacity: 0.15, borderRadius: '50%', filter: 'blur(40px)' }}></div>
            <div style={{ position: 'absolute', left: '-10%', bottom: '-20%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--accent-electric-violet) 0%, transparent 70%)', opacity: 0.15, borderRadius: '50%', filter: 'blur(40px)' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative', zIndex: 1 }}>
              <div style={{ flex: 1 }}>

                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  style={{ display: 'inline-block', padding: '0.6rem 1.2rem', borderRadius: '50px', backgroundColor: 'rgba(143, 0, 255, 0.08)', color: 'var(--accent-electric-violet)', fontWeight: 800, fontFamily: 'Outfit', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}
                >
                  Current Chapter (2024 - 2025)
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.2rem', letterSpacing: '-1.5px' }}
                >
                  B.Tech in Computer Science
                </motion.h3>

                <motion.h4
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 600, color: 'var(--accent-cyber-peach)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2.5rem' }}
                >
                  <GraduationCap size={32} /> Newton School of Technology, ADYPU
                </motion.h4>

                <motion.p
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  style={{ opacity: 0.85, fontSize: '1.25rem', lineHeight: 1.8, maxWidth: '700px', marginBottom: '2.5rem' }}
                >
                  Spearheading technical knowledge in modern web infrastructure and neural network algorithms. Actively engaging with competitive programming, architectural design patterns, and rapid prototyping of full-stack AI integrations.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                  style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
                >
                  <span style={{ padding: '0.8rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', borderRadius: '50px', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BrainCircuit size={18} color="var(--accent-electric-violet)" /> Specialization: AI & ML
                  </span>
                  <span style={{ padding: '0.8rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', borderRadius: '50px', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <GraduationCap size={18} color="var(--accent-cyber-peach)" /> Grade: 6.87/10.0
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <div>
                    <h5 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Intermediate (Class XII)</h5>
                    <p style={{ color: 'var(--text-obsidian)', fontWeight: 600, opacity: 0.8 }}>Birla School Pilani</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '1rem' }}>2023 - 2024</p>
                    <span className="badge">Grade: 67.0%</span>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Matriculation (Class X)</h5>
                    <p style={{ color: 'var(--text-obsidian)', fontWeight: 600, opacity: 0.8 }}>Satyug Darshan Vidyalaya</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '1rem' }}>2021 - 2022</p>
                    <span className="badge">Grade: 65.0%</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container section">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px' }}>Selected Projects</h2>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--text-obsidian)', opacity: 0.1 }}></div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>

          {/* Project 1 */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="glass-card"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {/* Background design element */}
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--accent-cyber-peach) 0%, transparent 60%)', opacity: 0.1, zIndex: 0, borderRadius: '50%' }}></div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <p style={{ fontFamily: 'Outfit', color: 'var(--accent-electric-violet)', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Full-Stack Application</p>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px' }}>CourtX</h3>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="https://github.com/bitforge05/basketball-calculator.git" target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '0.5rem 1rem' }}><FaGithub size={20} /> Code</a>
                  <a href="https://basketball-calculator.onrender.com/" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem' }}><ExternalLink size={20} /> Demo</a>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className="badge">Node.js</span>
                <span className="badge">Express.js</span>
                <span className="badge">REST APIs</span>
                <span className="badge">Real-Time</span>
                <span className="badge">Analytics</span>
              </div>

              <p style={{ opacity: 0.85, lineHeight: 1.8, fontSize: '1.15rem', maxWidth: '850px' }}>
                A full-stack basketball analytics platform built to replace manual score tracking and eliminate errors in scoring and fouls.
                Features a synchronized game timer, dynamic court toggle (full/half court), and smart scoring with validation and instant updates.
                Backed by a Node.js/Express API that stores match history so teams can review past results by match type.
              </p>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="glass-card"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {/* Background design element */}
            <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--accent-electric-violet) 0%, transparent 60%)', opacity: 0.1, zIndex: 0, borderRadius: '50%' }}></div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <p style={{ fontFamily: 'Outfit', color: 'var(--accent-cyber-peach)', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>AI-Powered Application</p>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px' }}>SummarizeIt</h3>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="https://github.com/bitforge05/summarizeIt" target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '0.5rem 1rem' }}><FaGithub size={20} /> Code</a>
                  <a href="https://summarize-it-eta.vercel.app/" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem' }}><ExternalLink size={20} /> Demo</a>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className="badge">Python</span>
                <span className="badge">FastAPI</span>
                <span className="badge">RAG Pipeline</span>
                <span className="badge">FAISS</span>
                <span className="badge">LLM</span>
              </div>

              <p style={{ opacity: 0.85, lineHeight: 1.8, fontSize: '1.15rem', maxWidth: '850px' }}>
                An AI-powered document analysis platform that lets users upload text files and interact through summaries and Q&amp;A.
                Implements a RAG (Retrieval-Augmented Generation) pipeline for contextual, accurate responses and uses FAISS for fast similarity search.
                Features question-answering functionality to help users deeply understand and prepare content efficiently.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Skills & Certifications */}
      <section id="skills" className="container section">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px' }}>Capabilities</h2>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--text-obsidian)', opacity: 0.1 }}></div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="glass-card"
          >
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 700 }}>
              <Code2 size={28} color="var(--accent-cyber-peach)" /> Technical Stack
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <strong style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: 'var(--text-obsidian)', fontSize: '1.1rem' }}>
                  <span>Languages</span>
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="badge">JavaScript (ES6+)</span>
                  <span className="badge">TypeScript</span>
                  <span className="badge">Python</span>
                  <span className="badge">HTML5</span>
                  <span className="badge">CSS3</span>
                </div>
              </div>

              <div>
                <strong style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: 'var(--text-obsidian)', fontSize: '1.1rem' }}>
                  <span>Frameworks & Tools</span>
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="badge">React.js</span>
                  <span className="badge">React Native</span>
                  <span className="badge">Node.js</span>
                  <span className="badge">Express.js</span>
                  <span className="badge">Pandas</span>
                </div>
              </div>

              <div>
                <strong style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: 'var(--text-obsidian)', fontSize: '1.1rem' }}>
                  <span>Databases & Others</span>
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="badge">MySQL</span>
                  <span className="badge">MongoDB</span>
                  <span className="badge">Prisma ORM</span>
                  <span className="badge">Git &amp; GitHub</span>
                  <span className="badge">Docker</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="glass-card"
          >
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 700 }}>
              <BrainCircuit size={28} color="var(--accent-electric-violet)" /> Certifications
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', top: '0px', right: '0', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-electric-violet)', fontFamily: 'Outfit' }}>Mar 2025</span>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700, paddingRight: '80px' }}>Generative AI</h4>
                <p style={{ fontWeight: 500, color: 'var(--accent-cyber-peach)', marginBottom: '0.5rem' }}>Coursera</p>
                <p style={{ opacity: 0.8, fontSize: '1rem', lineHeight: 1.6 }}>Proficient in Large Language Models (LLMs), deep Prompt Engineering workflows, RLHF methodologies, and Responsible AI deployment.</p>
              </div>

              <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--text-obsidian)', opacity: 0.1 }}></div>

              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', top: '0px', right: '0', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-electric-violet)', fontFamily: 'Outfit' }}>Mar 2025</span>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700, paddingRight: '80px' }}>AI For Everyone</h4>
                <p style={{ fontWeight: 500, color: 'var(--accent-cyber-peach)', marginBottom: '0.5rem' }}>Coursera</p>
                <p style={{ opacity: 0.8, fontSize: '1rem', lineHeight: 1.6 }}>Comprehensive understanding of core AI fundamentals, bridging the gap between real-world technical applications and strategic business impact.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Footer / Connect */}
      <section className="container section" style={{ textAlign: 'center', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <p style={{ color: 'var(--accent-electric-violet)', fontFamily: 'Outfit', fontWeight: 700, letterSpacing: '1.5px', marginBottom: '1rem', textTransform: 'uppercase' }}>What's Next?</p>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', marginBottom: '1.5rem', fontWeight: 800, letterSpacing: '-1px' }}>Get In Touch.</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 3rem auto', opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem' }}>
            My inbox is always open. Whether you have an exciting project, a job opportunity, or just want to say hi, I'll try my best to get back to you!
          </p>

          <a href="mailto:aryan.rana@adypu.edu.in" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem', marginBottom: '4rem' }}>
            Say Hello <ChevronRight size={20} />
          </a>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
            <a href="https://github.com/bitforge05" target="_blank" rel="noreferrer" className="text-link" aria-label="GitHub"><FaGithub size={24} /></a>
            <a href="https://www.linkedin.com/in/aryan-rana-a850162bb/" target="_blank" rel="noreferrer" className="text-link" aria-label="LinkedIn"><FaLinkedin size={24} /></a>
            <a href="mailto:aryan.rana@adypu.edu.in" className="text-link" aria-label="Email"><Mail size={24} /></a>
          </div>

          <p style={{ opacity: 0.5, fontSize: '1rem', fontFamily: 'Outfit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            Designed & Built by Aryan Rana
          </p>
        </motion.div>
      </section>

    </div>
  );
}