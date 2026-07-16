import React, { useState, useRef, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { useAuth } from "../../auth/hooks/useAuth"
import logo from "../../../../assets/img.png";
import "../../interview/style/home.scss";

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [fileName, setFileName] = useState("")
    const [dragActive, setDragActive] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [imgBroken, setImgBroken] = useState(false)
    const resumeInputRef = useRef()
    const menuRef = useRef()

    const navigate = useNavigate()
    const { handleLogout, user } = useAuth()

    // useEffect(() => {
    //     const onClick = (e) => {
    //         if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    //     }
    //     document.addEventListener('mousedown', onClick)
    //     return () => document.removeEventListener('mousedown', onClick)
    // }, [])

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
        };
    }, []);

    const logoutUser = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        alert("Logout Clicked");

        try {
            await handleLogout();
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0];

        const data = await generateReport({
            jobDescription,
            selfDescription,
            resumeFile,
        });

        navigate(`/interview/${data._id}`);
    };

    const handleFileChange = (e) => {
        const f = e.target.files[0]
        setFileName(f ? f.name : "")
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragActive(false)
        const f = e.dataTransfer.files[0]
        if (f) {
            resumeInputRef.current.files = e.dataTransfer.files
            setFileName(f.name)
        }
    }

    const displayName = user?.username || user?.name || "Your Account"
    const initials = displayName.trim().charAt(0).toUpperCase() || "U"
    const canGenerate = jobDescription.trim().length > 0 && (fileName || selfDescription.trim().length > 0) && !loading

    return (
        <div className="hb-page">
            <div className="hb-bg">
                <div className="hb-grid" />
                <div className="hb-flare hb-flare1" />
                <div className="hb-flare hb-flare2" />
                <div className="hb-scanline" />
            </div>

            <div className="hb-topbar">
                <span>MISSION FILE // <b>NEW BRIEF</b></span>
                <span>STATUS // <b className={loading ? "hb-blinktext" : ""}>{loading ? "PROCESSING" : "STANDBY"}</b></span>
            </div>

            <header className="hb-header">
                <div className="hb-brand">
                    <span className="hb-brand__dot" />
                    <img src={logo} alt="InterviewIQ" className="hb-brand__logo" />
                </div>

                <div className="hb-profile" ref={menuRef}>
                    <button
                        className={`hb-profile__chip ${menuOpen ? 'hb-profile__chip--open' : ''}`}
                        onClick={() => setMenuOpen(o => !o)}
                    >
                        <span className="hb-avatar">
                            <span className="hb-avatar__ring" />
                            {user?.picture && !imgBroken ? (
                                <img
                                    src={user.picture}
                                    alt={displayName}
                                    onError={() => setImgBroken(true)}
                                />
                            ) : (
                                <span className="hb-avatar__fallback">{initials}</span>
                            )}
                        </span>
                        <span className="hb-profile__text" style={({ color: "white" })}>
                            <span className="hb-profile__name">{displayName}</span>
                            <span className="hb-profile__email">{user?.email || ""}</span>
                        </span>
                        <svg className="hb-profile__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>

                    <div className={`hb-profile__dropdown ${menuOpen ? 'is-open' : ''}`}>
                        <div className="hb-profile__dropdown-inner">
                            <div className="hb-profile__dd-head">
                                <span className="hb-avatar hb-avatar--lg">
                                    {user?.picture && !imgBroken ? (
                                        <img src={user.picture} alt={displayName} />
                                    ) : (
                                        <span className="hb-avatar__fallback">{initials}</span>
                                    )}
                                </span>
                                <div>
                                    <p className="hb-profile__dd-name">{displayName}</p>
                                    <p className="hb-profile__dd-email">{user?.email}</p>
                                    {user?.provider && (
                                        <span className="hb-profile__provider">via {user.provider}</span>
                                    )}
                                </div>
                            </div>
                            <div className="hb-profile__dd-divider" />
                            <button
                                type="button"
                                className="hb-profile__logout"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    logoutUser();
                                }}
                            >
                                Logout
                            </button>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
        </div>
            </header >

            <section className="hb-hero">
                <span className="hb-hero__eyebrow">
                    <span className="hb-hero__eyebrow-dot" />
                    MISSION BRIEFING · INTERVIEW IQ
                </span>
                <h1>
                    FILE YOUR <span className="hb-gradient-text">INTERVIEW BRIEF</span>
                </h1>
                <div className="hb-hero__scanline" />
                <p>Feed the console your target role and profile — AI charts the flight plan.</p>
            </section>

            <div className="hb-card">
                <div className="hb-corner hb-corner--tl" />
                <div className="hb-corner hb-corner--br" />
                <div className="hb-card__body">

                    <div className="hb-panel">
                        <div className="hb-panel__header">
                            <span className="hb-panel__icon">
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>TARGET // Job Description</h2>
                            <span className="hb-badge hb-badge--req">Required</span>
                        </div>
                        <div className="hb-field">
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="hb-textarea"
                                placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                                maxLength={5000}
                            />
                            <span className="hb-field__glow" />
                        </div>
                        <div className="hb-counter">
                            <div className="hb-counter__track">
                                <div className="hb-counter__fill" style={{ width: `${Math.min((jobDescription.length / 5000) * 100, 100)}%` }} />
                            </div>
                            <span className="hb-mono">{jobDescription.length} / 5000</span>
                        </div>
                    </div>

                    <div className="hb-divider" />

                    <div className="hb-panel">
                        <div className="hb-panel__header">
                            <span className="hb-panel__icon">
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>PILOT // Your Profile</h2>
                        </div>

                        <div className="hb-upload">
                            <label className="hb-section-label">
                                Upload Resume
                                <span className="hb-badge hb-badge--best">Best Signal</span>
                            </label>
                            <label
                                className={`hb-dropzone ${dragActive ? 'hb-dropzone--active' : ''} ${fileName ? 'hb-dropzone--filled' : ''}`}
                                htmlFor="resume"
                                onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                                onDragLeave={() => setDragActive(false)}
                                onDrop={handleDrop}
                            >
                                <span className="hb-dropzone__pulse" />
                                <span className="hb-dropzone__icon">
                                    {fileName ? (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                    ) : (
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                    )}
                                </span>
                                <p className="hb-dropzone__title">{fileName || "Click to upload or drag & drop"}</p>
                                <p className="hb-dropzone__subtitle hb-mono">PDF / DOCX · MAX 5MB</p>
                                <input ref={resumeInputRef} hidden type="file" id="resume" name="resume" accept=".pdf,.docx" onChange={handleFileChange} />
                            </label>
                        </div>

                        <div className="hb-or"><span>OR</span></div>

                        <div className="hb-self">
                            <label className="hb-section-label" htmlFor="selfDescription">Quick Self-Description</label>
                            <textarea
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id="selfDescription"
                                name="selfDescription"
                                className="hb-textarea hb-textarea--short"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        <div className="hb-info">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a flight plan.</p>
                        </div>
                    </div>
                </div>

                <div className="hb-card__footer">
                    <span className="hb-footer-info hb-mono">AI STRATEGY GEN · APPROX 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className={`hb-generate ${loading ? 'hb-generate--loading' : ''}`}
                        disabled={!canGenerate}
                    >
                        <span className="hb-generate__sweep" />
                        {loading ? (
                            <>
                                <span className="hb-generate__spinner" />
                                ANALYZING PROFILE...
                            </>
                        ) : (
                            <>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 L15 9 L22 9.5 L16.5 14 L18.5 21 L12 17 L5.5 21 L7.5 14 L2 9.5 L9 9 Z" /></svg>
                                LAUNCH MY STRATEGY
                            </>
                        )}
                    </button>
                </div>
            </div>

{
    reports.length > 0 && (
        <section className="hb-recent">
            <h2>INTERVIEWIQ LOG // Recent Interview Plans</h2>
            <ul className="hb-recent__list">
                {reports.map((report, i) => (
                    <li
                        key={report._id}
                        className="hb-recent__item"
                        style={{ '--d': i }}
                        onClick={() => navigate(`/interview/${report._id}`)}
                    >
                        <span className="hb-recent__idx hb-mono">{String(i + 1).padStart(2, "0")}</span>
                        <div className="hb-recent__main">
                            <h3>{report.title || 'Untitled Position'}</h3>
                            <p className="hb-recent__meta hb-mono">LOGGED {new Date(report.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`hb-score ${report.matchScore >= 80 ? 'hb-score--high' : report.matchScore >= 60 ? 'hb-score--mid' : 'hb-score--low'}`}>
                            {report.matchScore}%
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

<footer className="hb-footer">
    <div className="hb-footer__social">
        <a
            href="https://www.instagram.com/1_VIDYASAGAR_SINGH"
            target="_blank"
            rel="noreferrer"
            className="hb-footer__icon"
            aria-label="Instagram"
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        </a>

        <a
            href="https://www.linkedin.com/in/vidya-sagar-singh-00a558342"
            target="_blank"
            rel="noreferrer"
            className="hb-footer__icon"
            aria-label="LinkedIn"
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        </a>

        <a
            href="https://github.com/1VIDYASAGAR"
            target="_blank"
            rel="noreferrer"
            className="hb-footer__icon"
            aria-label="GitHub"
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        </a>
    </div>

    <p className="hb-footer__copy">
        &copy; <b>InterviewIQ</b> 2026 &mdash; Your AI Interview Coach
    </p>
</footer>

        </div >
    )
}

export default Home



// import React, { useState, useRef, useEffect } from 'react'
// import { useInterview } from '../hooks/useInterview.js'
// import { useNavigate } from 'react-router'
// import { useAuth } from "../../auth/hooks/useAuth"
// import logo from "../../../../assets/img.png";
// import "../../interview/style/home.scss";

// const Home = () => {
//     const { loading, generateReport, reports } = useInterview()
//     const [jobDescription, setJobDescription] = useState("")
//     const [selfDescription, setSelfDescription] = useState("")
//     const [fileName, setFileName] = useState("")
//     const [dragActive, setDragActive] = useState(false)
//     const [menuOpen, setMenuOpen] = useState(false)
//     const [imgBroken, setImgBroken] = useState(false)
//     const resumeInputRef = useRef()
//     const menuRef = useRef()

//     const navigate = useNavigate()
//     const { handleLogout, user } = useAuth()

//     useEffect(() => {
//         const onClick = (e) => {
//             if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
//         }
//         document.addEventListener('mousedown', onClick)
//         return () => document.removeEventListener('mousedown', onClick)
//     }, [])

//     const logoutUser = async () => {
//         try {
//             await handleLogout()
//             navigate("/login")
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     const handleGenerateReport = async () => {
//     const resumeFile = resumeInputRef.current.files[0];

//     const data = await generateReport({
//         jobDescription,
//         selfDescription,
//         resumeFile,
//     });

//     navigate(`/interview/${data._id}`);
// };

//     const handleFileChange = (e) => {
//         const f = e.target.files[0]
//         setFileName(f ? f.name : "")
//     }

//     const handleDrop = (e) => {
//         e.preventDefault()
//         setDragActive(false)
//         const f = e.dataTransfer.files[0]
//         if (f) {
//             resumeInputRef.current.files = e.dataTransfer.files
//             setFileName(f.name)
//         }
//     }

//     const displayName = user?.username || user?.name || "Your Account"
//     const initials = displayName.trim().charAt(0).toUpperCase() || "U"
//     const canGenerate = jobDescription.trim().length > 0 && (fileName || selfDescription.trim().length > 0) && !loading

//     return (
//         <div className="hb-page">
//             <div className="hb-bg">
//                 <div className="hb-grid" />
//                 <div className="hb-flare hb-flare1" />
//                 <div className="hb-flare hb-flare2" />
//                 <div className="hb-scanline" />
//             </div>

//             <div className="hb-topbar">
//                 <span>MISSION FILE // <b>NEW BRIEF</b></span>
//                 <span>STATUS // <b className={loading ? "hb-blinktext" : ""}>{loading ? "PROCESSING" : "STANDBY"}</b></span>
//             </div>

//             <header className="hb-header">
//                 <div className="hb-brand">
//                     <span className="hb-brand__dot" />
//                     <img src={logo} alt="InterviewIQ" className="hb-brand__logo" />
//                 </div>

//                 <div className="hb-profile" ref={menuRef}>
//                     <button
//                         className={`hb-profile__chip ${menuOpen ? 'hb-profile__chip--open' : ''}`}
//                         onClick={() => setMenuOpen(o => !o)}
//                     >
//                         <span className="hb-avatar">
//                             <span className="hb-avatar__ring" />
//                             {user?.picture && !imgBroken ? (
//                                 <img
//                                     src={user.picture}
//                                     alt={displayName}
//                                     onError={() => setImgBroken(true)}
//                                 />
//                             ) : (
//                                 <span className="hb-avatar__fallback">{initials}</span>
//                             )}
//                         </span>
//                         <span className="hb-profile__text" style={({color:"white"})}>
//                             <span className="hb-profile__name">{displayName}</span>
//                             <span className="hb-profile__email">{user?.email || ""}</span>
//                         </span>
//                         <svg className="hb-profile__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <polyline points="6 9 12 15 18 9" />
//                         </svg>
//                     </button>

//                     <div className={`hb-profile__dropdown ${menuOpen ? 'is-open' : ''}`}>
//                         <div className="hb-profile__dropdown-inner">
//                             <div className="hb-profile__dd-head">
//                                 <span className="hb-avatar hb-avatar--lg">
//                                     {user?.picture && !imgBroken ? (
//                                         <img src={user.picture} alt={displayName} />
//                                     ) : (
//                                         <span className="hb-avatar__fallback">{initials}</span>
//                                     )}
//                                 </span>
//                                 <div>
//                                     <p className="hb-profile__dd-name">{displayName}</p>
//                                     <p className="hb-profile__dd-email">{user?.email}</p>
//                                     {user?.provider && (
//                                         <span className="hb-profile__provider">via {user.provider}</span>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="hb-profile__dd-divider" />
//                             <button onClick={logoutUser} className="hb-profile__logout">
//                                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                                     <polyline points="16 17 21 12 16 7" />
//                                     <line x1="21" y1="12" x2="9" y2="12" />
//                                 </svg>
//                                 Logout
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             <section className="hb-hero">
//                 <span className="hb-hero__eyebrow">
//                     <span className="hb-hero__eyebrow-dot" />
//                     MISSION BRIEFING · INTERVIEW IQ
//                 </span>
//                 <h1>
//                     FILE YOUR <span className="hb-gradient-text">INTERVIEW BRIEF</span>
//                 </h1>
//                 <div className="hb-hero__scanline" />
//                 <p>Feed the console your target role and profile — AI charts the flight plan.</p>
//             </section>

//             <div className="hb-card">
//                 <div className="hb-corner hb-corner--tl" />
//                 <div className="hb-corner hb-corner--br" />
//                 <div className="hb-card__body">

//                     <div className="hb-panel">
//                         <div className="hb-panel__header">
//                             <span className="hb-panel__icon">
//                                 <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
//                             </span>
//                             <h2>TARGET // Job Description</h2>
//                             <span className="hb-badge hb-badge--req">Required</span>
//                         </div>
//                         <div className="hb-field">
//                             <textarea
//                                 value={jobDescription}
//                                 onChange={(e) => setJobDescription(e.target.value)}
//                                 className="hb-textarea"
//                                 placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
//                                 maxLength={5000}
//                             />
//                             <span className="hb-field__glow" />
//                         </div>
//                         <div className="hb-counter">
//                             <div className="hb-counter__track">
//                                 <div className="hb-counter__fill" style={{ width: `${Math.min((jobDescription.length / 5000) * 100, 100)}%` }} />
//                             </div>
//                             <span className="hb-mono">{jobDescription.length} / 5000</span>
//                         </div>
//                     </div>

//                     <div className="hb-divider" />

//                     <div className="hb-panel">
//                         <div className="hb-panel__header">
//                             <span className="hb-panel__icon">
//                                 <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
//                             </span>
//                             <h2>PILOT // Your Profile</h2>
//                         </div>

//                         <div className="hb-upload">
//                             <label className="hb-section-label">
//                                 Upload Resume
//                                 <span className="hb-badge hb-badge--best">Best Signal</span>
//                             </label>
//                             <label
//                                 className={`hb-dropzone ${dragActive ? 'hb-dropzone--active' : ''} ${fileName ? 'hb-dropzone--filled' : ''}`}
//                                 htmlFor="resume"
//                                 onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
//                                 onDragLeave={() => setDragActive(false)}
//                                 onDrop={handleDrop}
//                             >
//                                 <span className="hb-dropzone__pulse" />
//                                 <span className="hb-dropzone__icon">
//                                     {fileName ? (
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
//                                     ) : (
//                                         <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
//                                     )}
//                                 </span>
//                                 <p className="hb-dropzone__title">{fileName || "Click to upload or drag & drop"}</p>
//                                 <p className="hb-dropzone__subtitle hb-mono">PDF / DOCX · MAX 5MB</p>
//                                 <input ref={resumeInputRef} hidden type="file" id="resume" name="resume" accept=".pdf,.docx" onChange={handleFileChange} />
//                             </label>
//                         </div>

//                         <div className="hb-or"><span>OR</span></div>

//                         <div className="hb-self">
//                             <label className="hb-section-label" htmlFor="selfDescription">Quick Self-Description</label>
//                             <textarea
//                                 value={selfDescription}
//                                 onChange={(e) => setSelfDescription(e.target.value)}
//                                 id="selfDescription"
//                                 name="selfDescription"
//                                 className="hb-textarea hb-textarea--short"
//                                 placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
//                             />
//                         </div>

//                         <div className="hb-info">
//                             <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
//                             <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a flight plan.</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="hb-card__footer">
//                     <span className="hb-footer-info hb-mono">AI STRATEGY GEN · APPROX 30s</span>
//                     <button
//                         onClick={handleGenerateReport}
//                         className={`hb-generate ${loading ? 'hb-generate--loading' : ''}`}
//                         disabled={!canGenerate}
//                     >
//                         <span className="hb-generate__sweep" />
//                         {loading ? (
//                             <>
//                                 <span className="hb-generate__spinner" />
//                                 ANALYZING PROFILE...
//                             </>
//                         ) : (
//                             <>
//                                 <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 L15 9 L22 9.5 L16.5 14 L18.5 21 L12 17 L5.5 21 L7.5 14 L2 9.5 L9 9 Z" /></svg>
//                                 LAUNCH MY STRATEGY
//                             </>
//                         )}
//                     </button>
//                 </div>
//             </div>

//             {reports.length > 0 && (
//                 <section className="hb-recent">
//                     <h2>INTERVIEWIQ LOG // Recent Interview Plans</h2>
//                     <ul className="hb-recent__list">
//                         {reports.map((report, i) => (
//                             <li
//                                 key={report._id}
//                                 className="hb-recent__item"
//                                 style={{ '--d': i }}
//                                 onClick={() => navigate(`/interview/${report._id}`)}
//                             >
//                                 <span className="hb-recent__idx hb-mono">{String(i + 1).padStart(2, "0")}</span>
//                                 <div className="hb-recent__main">
//                                     <h3>{report.title || 'Untitled Position'}</h3>
//                                     <p className="hb-recent__meta hb-mono">LOGGED {new Date(report.createdAt).toLocaleDateString()}</p>
//                                 </div>
//                                 <span className={`hb-score ${report.matchScore >= 80 ? 'hb-score--high' : report.matchScore >= 60 ? 'hb-score--mid' : 'hb-score--low'}`}>
//                                     {report.matchScore}%
//                                 </span>
//                             </li>
//                         ))}
//                     </ul>
//                 </section>
//             )}

//             <footer className="hb-footer">
//                 <a href="https://www.linkedin.com/in/vidya-sagar-singh-00a558342" target="_blank" rel="noreferrer">Contact for any Query</a>
//             </footer>

//         </div>
//     )
// }


// export default Home

