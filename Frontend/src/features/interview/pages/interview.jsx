import React, { useState, useEffect, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import "../../interview/style/interview.scss";

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical', icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral', icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Flight Plan', icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={`cp-qcard ${open ? 'cp-qcard--open' : ''}`} style={{ '--d': index }}>
            <div className="cp-qcard__header" onClick={() => setOpen(o => !o)}>
                <span className="cp-qcard__index">Q{String(index + 1).padStart(2, '0')}</span>
                <p className="cp-qcard__question">{item.question}</p>
                <span className="cp-qcard__chevron">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            <div className="cp-qcard__body-wrap">
                <div className="cp-qcard__body">
                    <div className="cp-qcard__section">
                        <span className="cp-qcard__tag cp-qcard__tag--intention">Why it's asked</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className="cp-qcard__section">
                        <span className="cp-qcard__tag cp-qcard__tag--answer">Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RoadMapDay = ({ day, index }) => (
    <div className="cp-day" style={{ '--d': index }}>
        <div className="cp-day__rail">
            <span className="cp-day__dot" />
            <span className="cp-day__line" />
        </div>
        <div className="cp-day__content">
            <div className="cp-day__header">
                <span className="cp-day__badge">D+{day.day}</span>
                <h3>{day.focus}</h3>
            </div>
            <ul className="cp-day__tasks">
                {day.tasks.map((task, i) => (
                    <li key={i}><span className="cp-day__bullet" />{task}</li>
                ))}
            </ul>
        </div>
    </div>
)

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const [ringReady, setRingReady] = useState(false)
    const [scoreCount, setScoreCount] = useState(0)
    const navRefs = useRef({})
    const [indicator, setIndicator] = useState({ top: 0, height: 0 })
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewId) getReportById(interviewId)
    }, [interviewId])

    useEffect(() => {
        if (report) {
            const t = setTimeout(() => setRingReady(true), 120)
            const start = Date.now()
            const duration = 1000
            const tick = () => {
                const p = Math.min((Date.now() - start) / duration, 1)
                setScoreCount(Math.round(p * report.matchScore))
                if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            return () => clearTimeout(t)
        }
    }, [report])

    useEffect(() => {
        const el = navRefs.current[activeNav]
        if (el) setIndicator({ top: el.offsetTop, height: el.offsetHeight })
    }, [activeNav, report])

    if (loading || !report) {
        return (
            <main className="cp-loading">
                <div className="cp-loading__radar"><span className="cp-loading__sweep" /></div>
                <h2>COMPILING FLIGHT DATA…</h2>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'cp-score--high' :
            report.matchScore >= 60 ? 'cp-score--mid' : 'cp-score--low'

    // gauge geometry: 270-degree sweep from -225deg to 45deg
    const gaugeSweep = 270
    const gaugeAngle = ringReady ? (report.matchScore / 100) * gaugeSweep : 0
    const needleRotation = -135 + gaugeAngle

    const ticks = Array.from({ length: 12 })

    return (
        <div className="cp-page">
            <div className="cp-bg">
                <div className="cp-grid" />
                <div className="cp-flare cp-flare1" />
                <div className="cp-flare cp-flare2" />
            </div>

            <div className="cp-topbar">
                <span>REPORT ID // <b>{interviewId?.slice(-8) || '—'}</b></span>
                <span>MATCH // <b className={scoreColor.replace('cp-score--', 'cp-top-')}>{report.matchScore}%</b></span>
            </div>

            <div className="cp-layout">

                <nav className="cp-nav">
                    <div className="cp-nav__content">
                        <p className="cp-nav__label">Console</p>
                        <div className="cp-nav__indicator" style={{ transform: `translateY(${indicator.top}px)`, height: indicator.height }} />
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                ref={(el) => (navRefs.current[item.id] = el)}
                                className={`cp-nav__item ${activeNav === item.id ? 'cp-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className="cp-nav__icon">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => getResumePdf(interviewId)} className="cp-download">
                        <span className="cp-download__sweep" />
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" /></svg>
                        Download Resume
                    </button>
                </nav>

                <main className="cp-content" key={activeNav}>
                    {activeNav === 'technical' && (
                        <section>
                            <div className="cp-content__header">
                                <h2>Technical Questions</h2>
                                <span className="cp-content__count cp-mono">{report.technicalQuestions.length} LOADED</span>
                            </div>
                            <div className="cp-qlist">
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className="cp-content__header">
                                <h2>Behavioral Questions</h2>
                                <span className="cp-content__count cp-mono">{report.behavioralQuestions.length} LOADED</span>
                            </div>
                            <div className="cp-qlist">
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className="cp-content__header">
                                <h2>Preparation Flight Plan</h2>
                                <span className="cp-content__count cp-mono">{report.preparationPlan.length}-DAY SEQUENCE</span>
                            </div>
                            <div className="cp-daylist">
                                {report.preparationPlan.map((day, i) => (
                                    <RoadMapDay key={day.day} day={day} index={i} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <aside className="cp-sidebar">
                    <div className="cp-gauge-wrap">
                        <p className="cp-gauge__label">Match Gauge</p>
                        <div className={`cp-gauge ${scoreColor}`}>
                            <svg width="150" height="150" viewBox="0 0 150 150">
                                {ticks.map((_, i) => {
                                    const a = -225 + (i * (270 / (ticks.length - 1)))
                                    const rad = (a * Math.PI) / 180
                                    const x1 = 75 + 58 * Math.cos(rad), y1 = 75 + 58 * Math.sin(rad)
                                    const x2 = 75 + 66 * Math.cos(rad), y2 = 75 + 66 * Math.sin(rad)
                                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="cp-gauge__tick" />
                                })}
                                <circle cx="75" cy="75" r="50" fill="none" className="cp-gauge__track" strokeWidth="6" />
                                <circle
                                    cx="75" cy="75" r="50" fill="none" strokeWidth="6" strokeLinecap="round"
                                    className="cp-gauge__fill"
                                    style={{ strokeDasharray: `${(gaugeAngle / 360) * 314.16} 314.16` }}
                                />
                                <g style={{ transform: `rotate(${needleRotation}deg)`, transformOrigin: '75px 75px', transition: 'transform 1.1s cubic-bezier(.34,1.4,.4,1)' }}>
                                    <line x1="75" y1="75" x2="75" y2="30" className="cp-gauge__needle" />
                                    <circle cx="75" cy="75" r="6" className="cp-gauge__hub" />
                                </g>
                            </svg>
                            <div className="cp-gauge__value">
                                <span>{scoreCount}</span><small>%</small>
                            </div>
                        </div>
                        <p className="cp-gauge__sub">Strong match for this role</p>
                    </div>

                    <div className="cp-sidebar__divider" />

                    <div className="cp-gaps">
                        <p className="cp-gaps__label">Skill Gaps</p>
                        <div className="cp-gaps__list">
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`cp-tag cp-tag--${gap.severity}`} style={{ '--d': i }}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button className="cp-backhome" onClick={() => navigate('/')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                        Back to Base
                    </button>
                </aside>
            </div>
        </div>
    )
}



export default Interview