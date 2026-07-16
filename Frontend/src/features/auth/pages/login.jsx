import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const SEQUENCE = ["AUTH", "IDENTITY", "PROFILE VAULT", "CLEARANCE"];

const Login = () => {
  const { loading } = useAuth();
  const [seqIndex, setSeqIndex] = useState(0);
  const [typed, setTyped] = useState("");

  const handleGoogleLogin = () => {
    window.location.href = "https://interview-iq-ppv9.onrender.com/api/auth/google";
  };

  useEffect(() => {
    const id = setInterval(() => setSeqIndex((i) => (i + 1) % SEQUENCE.length), 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const full = "READY FOR DEPARTURE.";
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return (
      <main className="lp-loading">
        <div className="lp-loading__radar">
          <span className="lp-loading__sweep" />
          <span className="lp-loading__ring" />
        </div>
        <h1>ESTABLISHING UPLINK<span className="lp-dotdotdot"><i>.</i><i>.</i><i>.</i></span></h1>
        <p>Authenticating with Google Systems</p>
        <style>{LP_STYLES}</style>
      </main>
    );
  }

  return (
    <main className="lp-shell">
      <div className="lp-bg">
        <div className="lp-grid" />
        <div className="lp-horizon" />
        <div className="lp-star lp-star1" />
        <div className="lp-star lp-star2" />
        <div className="lp-star lp-star3" />
        <div className="lp-scanline" />
      </div>

      <div className="lp-topbar">
        <span className="lp-topbar__item">SYS // <b>ONLINE</b></span>
        <span className="lp-topbar__item">MODE // <b>{SEQUENCE[seqIndex]}</b></span>
        <span className="lp-topbar__item lp-topbar__clock" />
      </div>

      <div className="lp-wrap">
        <section className="lp-console">
          <div className="lp-corner lp-corner--tr" />
          <div className="lp-corner lp-corner--br" />

          <div className="lp-console__head">
            <span className="lp-tag">ACCESS PANEL</span>
            <h2>Ignition<br />Authorization</h2>
            <p>
              We verify identity through your Google account to spin up a
              secure InterviewIQ profile. No password stored, no password needed.
            </p>
          </div>

          {/* Pure White Button with Continuous Ray/Glow Effect */}
          <button className="lp-ignite lp-ignite--white-glow" onClick={handleGoogleLogin}>
            <span className="lp-ignite__bolt">
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.61l6.86-6.86C35.9 2.39 30.37 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.42 13.37 17.72 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.14-3.09-.39-4.55H24v9.1h12.94c-.56 3-2.25 5.55-4.8 7.26l7.73 6c4.52-4.17 7.11-10.31 7.11-17.81z" />
                <path fill="#FBBC05" d="M10.54 28.58A14.5 14.5 0 019.5 24c0-1.59.27-3.13.75-4.58l-7.98-6.2A24.03 24.03 0 000 24c0 3.88.93 7.54 2.57 10.78l7.97-6.2z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.89-5.81l-7.73-6c-2.15 1.44-4.89 2.31-8.16 2.31-6.28 0-11.58-3.87-13.46-9.32l-7.97 6.2C6.5 42.62 14.62 48 24 48z" />
              </svg>
            </span>
            <span>CONTINUE WITH GOOGLE</span>
            <span className="lp-ignite__arrow">›</span>
          </button>

          <div className="lp-statuslights">
            {["ARMED", "FUEL", "NAV-LOCK", "COMMS"].map((s, i) => (
              <div className="lp-light" key={s} style={{ "--d": i }}>
                <span className="lp-light__dot" />
                {s}
              </div>
            ))}
          </div>

          <div className="lp-divider"><span>SECURE CHANNEL</span></div>

          <ul className="lp-checklist">
            {[
              "No password required",
              "Profile auto-provisioned on first login",
              "Encrypted session, revocable anytime",
              "Verified Google accounts only",
            ].map((t, i) => (
              <li key={t} style={{ "--d": i }}>
                <span className="lp-checklist__tick">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="lp-brief">
          <div className="lp-corner lp-corner--tl" />
          <div className="lp-corner lp-corner--bl" />

          <div className="lp-callsign">
            <span className="lp-badge-emblem">
              <span className="lp-badge-emblem__ring" />
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2 L15 9 L22 9.5 L16.5 14 L18.5 21 L12 17 L5.5 21 L7.5 14 L2 9.5 L9 9 Z" />
              </svg>
            </span>
            <div>
              <h3>INTERVIEW_IQ&nbsp;<span>AI</span></h3>
              <span>FLIGHT DECK · INTERVIEW OPS</span>
            </div>
          </div>

          <span className="lp-eyebrow">
            <span className="lp-eyebrow__blink" />
            CALLSIGN AWAITING CLEARANCE
          </span>

          <h1>
            LAUNCH YOUR
            <br />
            <span className="lp-gradient-text">NEXT INTERVIEW</span>
          </h1>
          <p className="lp-typed">{typed}<span className="lp-cursor" /></p>

          <p className="lp-desc">
            Upload your resume, target any job description, and get an ATS
            match reading, technical &amp; behavioral question banks, and a
            day-by-day flight plan to prep — all instrumented by AI.
          </p>

          <div className="lp-panelrow">
            {[
              ["ATS", "Match Reading"],
              ["Q-BANK", "Question Sets"],
              ["ROADMAP", "Prep Sequence"],
              ["RESUME", "Auto-Tuned"],
            ].map(([code, label], i) => (
              <div className="lp-chip" key={code} style={{ "--d": i }}>
                <span className="lp-chip__code">{code}</span>
                <span className="lp-chip__label">{label}</span>
                <span className="lp-chip__light" />
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{LP_STYLES}</style>
    </main>
  );
};

const LP_STYLES = `
*{box-sizing:border-box;}
html,body,#root{height:100%;}
.lp-shell{
  --amber:#3d8bff; --crimson:#ff4d4d; --cyan:#3fd0ff;
  --bg:#070b16; --panel:#0e1526; --panel2:#121a2e;
  --line:rgba(61,139,255,.16); --text:#f4ede1; --muted:#9a8f7d;
  position:relative;min-height:100vh;min-height:100dvh;background:var(--bg);color:var(--text);
  font-family:'Inter',system-ui,sans-serif;overflow:hidden;padding:0;
}
.lp-bg{position:absolute;inset:0;z-index:0;overflow:hidden;}
.lp-grid{position:absolute;inset:-20%;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(ellipse at 50% 20%,black 0%,transparent 65%);animation:lpDrift 30s linear infinite;}
@keyframes lpDrift{0%{transform:translateY(0)}100%{transform:translateY(52px)}}
.lp-horizon{position:absolute;left:0;right:0;bottom:-2px;height:40%;background:radial-gradient(ellipse at 50% 100%, rgba(255,77,77,.18), transparent 70%);}
.lp-star{position:absolute;border-radius:50%;background:var(--amber);opacity:.7;animation:lpTwinkle 3s ease-in-out infinite;}
.lp-star1{width:3px;height:3px;top:12%;left:18%;}
.lp-star2{width:2px;height:2px;top:30%;left:74%;animation-delay:1s;}
.lp-star3{width:4px;height:4px;top:65%;left:50%;animation-delay:2s;background:var(--cyan);}
@keyframes lpTwinkle{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.3)}}
.lp-scanline{position:absolute;left:0;right:0;height:2px;top:0;background:linear-gradient(90deg,transparent,rgba(61,139,255,.5),transparent);animation:lpScanFall 6s linear infinite;}
@keyframes lpScanFall{0%{top:0;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}

.lp-topbar{position:relative;z-index:2;display:flex;gap:26px;padding:14px 28px;font-family:'Roboto Mono',monospace;font-size:11px;letter-spacing:.06em;color:var(--muted);border-bottom:1px solid var(--line);}
.lp-topbar__item b{color:var(--amber);font-weight:700;}
.lp-topbar__clock::before{content:"TIME // LOCAL";}

.lp-wrap{position:relative;z-index:1;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.25fr .95fr;min-height:calc(100vh - 46px);min-height:calc(100dvh - 46px);}
.lp-brief{order:1;}
.lp-console{order:2;}

.lp-corner{position:absolute;width:26px;height:26px;border-color:var(--amber);opacity:.7;}
.lp-corner--tl{top:14px;left:14px;border-top:2px solid;border-left:2px solid;}
.lp-corner--bl{bottom:14px;left:14px;border-bottom:2px solid;border-left:2px solid;}
.lp-corner--tr{top:14px;right:14px;border-top:2px solid;border-right:2px solid;}
.lp-corner--br{bottom:14px;right:14px;border-bottom:2px solid;border-right:2px solid;}

.lp-brief{position:relative;padding:68px 64px;display:flex;flex-direction:column;justify-content:center;border-right:1px solid var(--line);}
.lp-callsign{display:flex;align-items:center;gap:14px;margin-bottom:30px;animation:lpRise .7s both;}
@keyframes lpRise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
.lp-badge-emblem{position:relative;width:56px;height:56px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#1a1006;background:linear-gradient(135deg,var(--amber),#1e4fa8);flex-shrink:0;}
.lp-badge-emblem__ring{position:absolute;inset:-4px;border-radius:12px;border:1px dashed rgba(61,139,255,.5);animation:lpSpin 8s linear infinite;}
@keyframes lpSpin{to{transform:rotate(360deg)}}
.lp-callsign h3{margin:0;font-family:'Space Grotesk',sans-serif;font-size:22px;letter-spacing:.02em;}
.lp-callsign h3 span{color:var(--amber);}
.lp-callsign > div > span{font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.1em;color:var(--muted);}

.lp-eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:'Roboto Mono',monospace;font-size:11.5px;letter-spacing:.08em;color:var(--crimson);background:rgba(255,77,77,.08);border:1px solid rgba(255,77,77,.3);padding:6px 14px;border-radius:3px;margin-bottom:22px;width:fit-content;animation:lpRise .7s .05s both;}
.lp-eyebrow__blink{width:7px;height:7px;background:var(--crimson);border-radius:50%;animation:lpBlink 1s steps(1) infinite;}

.lp-brief h1{font-family:'Space Grotesk',sans-serif;font-size:54px;line-height:1.08;font-weight:700;margin:0;letter-spacing:-.01em;animation:lpRise .7s .1s both;}
.lp-gradient-text{background:linear-gradient(100deg,var(--amber),#a9c9ff,var(--crimson),var(--amber));background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:lpShift 5s ease infinite;}
@keyframes lpShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.lp-typed{font-family:'Roboto Mono',monospace;color:var(--amber);font-size:14px;letter-spacing:.05em;margin:18px 0 20px;min-height:18px;}
.lp-cursor{display:inline-block;width:8px;height:14px;background:var(--amber);margin-left:2px;vertical-align:middle;animation:lpBlink .8s steps(1) infinite;}
.lp-desc{color:var(--muted);font-size:15.5px;line-height:1.8;max-width:520px;animation:lpRise .7s .15s both;}

.lp-panelrow{margin-top:36px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
.lp-chip{position:relative;padding:14px 16px;background:var(--panel);border:1px solid var(--line);border-radius:6px;animation:lpRise .5s both;animation-delay:calc(var(--d)*.08s + .2s);transition:border-color .25s,transform .25s;}
.lp-chip:hover{border-color:var(--amber);transform:translateY(-3px);}
.lp-chip__code{display:block;font-family:'Roboto Mono',monospace;font-size:11px;letter-spacing:.1em;color:var(--amber);font-weight:700;}
.lp-chip__label{display:block;font-size:13px;color:var(--text);margin-top:5px;}
.lp-chip__light{position:absolute;top:12px;right:12px;width:6px;height:6px;border-radius:50%;background:var(--cyan);box-shadow:0 0 6px var(--cyan);animation:lpBlink 2.4s steps(1) infinite;}

.lp-console{position:relative;padding:68px 56px;display:flex;flex-direction:column;justify-content:center;background:linear-gradient(180deg,var(--panel),var(--bg));}
.lp-console__head{animation:lpRise .7s both;}
.lp-tag{display:inline-block;font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.14em;color:var(--amber);border:1px solid rgba(61,139,255,.35);padding:5px 12px;border-radius:3px;margin-bottom:18px;}
.lp-console__head h2{font-family:'Space Grotesk',sans-serif;font-size:34px;line-height:1.15;margin:0 0 14px;font-weight:700;}
.lp-console__head p{color:var(--muted);font-size:14.5px;line-height:1.7;margin:0 0 30px;}

/* Pure White Background & Continuous Rays Emitting Logic */
.lp-ignite--white-glow {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 17px 20px;
  background: #ffffff !important; /* Pure White Inside */
  color: #111827 !important;     /* High contrast dark text */
  font-weight: 700;
  font-size: 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  letter-spacing: .02em;
  transition: transform 0.2s, box-shadow 0.3s;
  
  /* Continuous Rays Emitting using multi-layer box-shadow pulsing */
  box-shadow: 0 0 0 0 rgba(61, 139, 255, 0.5), 
              0 0 0 0 rgba(61, 139, 255, 0.3), 
              0 4px 10px rgba(0, 0, 0, 0.3);
  animation: lpRayEmission 2.5s infinite linear;
}

.lp-ignite--white-glow:hover {
  transform: translateY(-2px);
}

.lp-ignite__bolt svg {
  background: transparent;
  display: block;
}

.lp-ignite__arrow {
  margin-left: auto;
  font-size: 20px;
  color: #111827; /* Dark matching arrow */
}

/* Keyframes for Continuous Light Rays Wave */
@keyframes lpRayEmission {
  0% {
    box-shadow: 0 0 0 0 rgba(61, 139, 255, 0.6), 
                0 0 0 4px rgba(61, 139, 255, 0.4), 
                0 0 0 10px rgba(61, 139, 255, 0.2),
                0 4px 10px rgba(0, 0, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(61, 139, 255, 0.4), 
                0 0 0 12px rgba(61, 139, 255, 0.2), 
                0 0 0 20px rgba(61, 139, 255, 0),
                0 6px 14px rgba(0, 0, 0, 0.4);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(61, 139, 255, 0.6), 
                0 0 0 4px rgba(61, 139, 255, 0.4), 
                0 0 0 10px rgba(61, 139, 255, 0.2),
                0 4px 10px rgba(0, 0, 0, 0.3);
  }
}

.lp-statuslights{display:flex;gap:18px;margin-top:22px;flex-wrap:wrap;}
.lp-light{display:flex;align-items:center;gap:7px;font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.08em;color:var(--muted);animation:lpRise .5s both;animation-delay:calc(var(--d)*.1s + .3s);}
.lp-light__dot{width:7px;height:7px;border-radius:50%;background:var(--cyan);box-shadow:0 0 8px var(--cyan);animation:lpBlink 1.6s steps(1) infinite;animation-delay:calc(var(--d)*.3s);}

.lp-divider{display:flex;align-items:center;gap:14px;margin:34px 0 22px;color:var(--muted);font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.14em;}
.lp-divider::before,.lp-divider::after{content:"";flex:1;height:1px;background:var(--line);}

.lp-checklist{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px;}
.lp-checklist li{display:flex;align-items:center;gap:10px;font-size:13.5px;color:var(--text);animation:lpRise .5s both;animation-delay:calc(var(--d)*.08s + .4s);}
.lp-checklist__tick{color:var(--amber);font-weight:700;}

.lp-footer{margin-top:30px;font-size:12px;color:var(--muted);line-height:1.7;}
.lp-footer strong{color:var(--amber);cursor:pointer;}

.lp-loading{min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:var(--bg,#070b16);color:#f4ede1;font-family:'Inter',sans-serif;}
.lp-loading__radar{position:relative;width:90px;height:90px;border-radius:50%;border:1px solid rgba(61, 139,255,.3);}
.lp-loading__ring{position:absolute;inset:16px;border-radius:50%;border:1px solid rgba(61, 139,255,.25);}
.lp-loading__sweep{position:absolute;inset:0;border-radius:50%;background:conic-gradient(rgba(61, 139,255,.65),transparent 40%);animation:lpSpin 1.1s linear infinite;}
.lp-loading h1{font-family:'Space Grotesk',sans-serif;font-size:20px;letter-spacing:.03em;}
.lp-dotdotdot i{font-style:normal;animation:lpBlink 1.2s steps(1) infinite;}
.lp-dotdotdot i:nth-child(2){animation-delay:.15s;}
.lp-dotdotdot i:nth-child(3){animation-delay:.3s;}
.lp-loading p{color:#9a8f7d;font-family:'Roboto Mono',monospace;font-size:12px;letter-spacing:.06em;}

@keyframes lpBlink{0%,49%{opacity:1}50%,100%{opacity:.15}}

@media(max-width:1080px){
  .lp-wrap{grid-template-columns:1fr;}
  .lp-brief{border-right:none;border-bottom:1px solid var(--line);order:2;}
  .lp-console{order:1;}
  .lp-brief h1{font-size:42px;}
}

@media(max-width:600px){
  .lp-shell{overflow-y:auto;}
  .lp-topbar{padding:8px 14px;gap:14px;font-size:9.5px;}
  .lp-topbar__item:nth-child(2){display:none;}
  .lp-wrap{grid-template-columns:1fr;min-height:auto;}

  .lp-console{order:1;padding:20px 20px 22px;border-bottom:1px solid var(--line);}
  .lp-brief{order:2;padding:22px 20px 28px;border-bottom:none;}

  .lp-console__head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px;}
  .lp-tag{margin-bottom:0;font-size:9.5px;padding:4px 9px;}
  .lp-console__head h2{font-size:20px;line-height:1.2;margin:0;flex-basis:100%;order:2;}
  .lp-console__head p{display:none;}

  .lp-ignite--white-glow{padding:14px 16px;font-size:13.5px;}
  .lp-statuslights{display:none;}
  .lp-divider{margin:16px 0 12px;}
  .lp-checklist{flex-direction:row;flex-wrap:wrap;column-gap:16px;row-gap:8px;}
  .lp-checklist li{font-size:11.5px;}

  .lp-corner{width:16px;height:16px;}

  .lp-callsign{margin-bottom:14px;}
  .lp-badge-emblem{width:38px;height:38px;}
  .lp-callsign h3{font-size:16px;}
  .lp-callsign > div > span{font-size:9px;}
  .lp-eyebrow{display:none;}
  .lp-brief h1{font-size:27px;}
  .lp-typed{display:none;}
  .lp-desc{font-size:13px;line-height:1.6;margin-top:2px;}
  .lp-panelrow{display:none;}
}

@media (prefers-reduced-motion: reduce){.lp-grid,.lp-star,.lp-scanline,.lp-badge-emblem__ring,.lp-cursor,.lp-chip__light,.lp-light__dot,.lp-loading__sweep,.lp-dotdotdot i,.lp-ignite--white-glow{animation:none !important;}}
`;

export default Login;





// import React, { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";

// const SEQUENCE = ["AUTH", "IDENTITY", "PROFILE VAULT", "CLEARANCE"];

// const Login = () => {
//   const { loading } = useAuth();
//   const [seqIndex, setSeqIndex] = useState(0);
//   const [typed, setTyped] = useState("");

//   const handleGoogleLogin = () => {
//     window.location.href = "https://interview-iq-ppv9.onrender.com/api/auth/google";
//   };

//   // cycles through a small "system check" ticker
//   useEffect(() => {
//     const id = setInterval(() => setSeqIndex((i) => (i + 1) % SEQUENCE.length), 1800);
//     return () => clearInterval(id);
//   }, []);

//   // typewriter for the mission line
//   useEffect(() => {
//     const full = "READY FOR DEPARTURE.";
//     let i = 0;
//     setTyped("");
//     const id = setInterval(() => {
//       i++;
//       setTyped(full.slice(0, i));
//       if (i >= full.length) clearInterval(id);
//     }, 55);
//     return () => clearInterval(id);
//   }, []);

//   if (loading) {
//     return (
//       <main className="lp-loading">
//         <div className="lp-loading__radar">
//           <span className="lp-loading__sweep" />
//           <span className="lp-loading__ring" />
//         </div>
//         <h1>ESTABLISHING UPLINK<span className="lp-dotdotdot"><i>.</i><i>.</i><i>.</i></span></h1>
//         <p>Authenticating with Google Systems</p>
//         <style>{LP_STYLES}</style>
//       </main>
//     );
//   }

//   return (
//     <main className="lp-shell">
//       <div className="lp-bg">
//         <div className="lp-grid" />
//         <div className="lp-horizon" />
//         <div className="lp-star lp-star1" />
//         <div className="lp-star lp-star2" />
//         <div className="lp-star lp-star3" />
//         <div className="lp-scanline" />
//       </div>

//       <div className="lp-topbar">
//         <span className="lp-topbar__item">SYS // <b>ONLINE</b></span>
//         <span className="lp-topbar__item">MODE // <b>{SEQUENCE[seqIndex]}</b></span>
//         <span className="lp-topbar__item lp-topbar__clock" />
//       </div>

//       <div className="lp-wrap">
//         {/* RIGHT (desktop) / TOP (mobile): IGNITION CONSOLE — the actual login action, kept above the fold on phones */}
//         <section className="lp-console">
//           <div className="lp-corner lp-corner--tr" />
//           <div className="lp-corner lp-corner--br" />

//           <div className="lp-console__head">
//             <span className="lp-tag">ACCESS PANEL</span>
//             <h2>Ignition<br />Authorization</h2>
//             <p>
//               We verify identity through your Google account to spin up a
//               secure InterviewIQ profile. No password stored, no password needed.
//             </p>
//           </div>

//           <button className="lp-ignite" onClick={handleGoogleLogin}>
//             <span className="lp-ignite__sweep" />
//             <span className="lp-ignite__bolt">
//               <svg width="20" height="20" viewBox="0 0 48 48">
//                 <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.61l6.86-6.86C35.9 2.39 30.37 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.42 13.37 17.72 9.5 24 9.5z" />
//                 <path fill="#4285F4" d="M46.98 24.55c0-1.57-.14-3.09-.39-4.55H24v9.1h12.94c-.56 3-2.25 5.55-4.8 7.26l7.73 6c4.52-4.17 7.11-10.31 7.11-17.81z" />
//                 <path fill="#FBBC05" d="M10.54 28.58A14.5 14.5 0 019.5 24c0-1.59.27-3.13.75-4.58l-7.98-6.2A24.03 24.03 0 000 24c0 3.88.93 7.54 2.57 10.78l7.97-6.2z" />
//                 <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.89-5.81l-7.73-6c-2.15 1.44-4.89 2.31-8.16 2.31-6.28 0-11.58-3.87-13.46-9.32l-7.97 6.2C6.5 42.62 14.62 48 24 48z" />
//               </svg>
//             </span>
//             <span>CONTINUE WITH GOOGLE</span>
//             <span className="lp-ignite__arrow">›</span>
//           </button>

//           <div className="lp-statuslights">
//             {["ARMED", "FUEL", "NAV-LOCK", "COMMS"].map((s, i) => (
//               <div className="lp-light" key={s} style={{ "--d": i }}>
//                 <span className="lp-light__dot" />
//                 {s}
//               </div>
//             ))}
//           </div>

//           <div className="lp-divider"><span>SECURE CHANNEL</span></div>

//           <ul className="lp-checklist">
//             {[
//               "No password required",
//               "Profile auto-provisioned on first login",
//               "Encrypted session, revocable anytime",
//               "Verified Google accounts only",
//             ].map((t, i) => (
//               <li key={t} style={{ "--d": i }}>
//                 <span className="lp-checklist__tick">✓</span>
//                 {t}
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* LEFT (desktop) / BOTTOM (mobile): MISSION BRIEF */}
//         <section className="lp-brief">
//           <div className="lp-corner lp-corner--tl" />
//           <div className="lp-corner lp-corner--bl" />

//           <div className="lp-callsign">
//             <span className="lp-badge-emblem">
//               <span className="lp-badge-emblem__ring" />
//               <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M12 2 L15 9 L22 9.5 L16.5 14 L18.5 21 L12 17 L5.5 21 L7.5 14 L2 9.5 L9 9 Z" />
//               </svg>
//             </span>
//             <div>
//               <h3>INTERVIEW_IQ&nbsp;<span>AI</span></h3>
//               <span>FLIGHT DECK · INTERVIEW OPS</span>
//             </div>
//           </div>

//           <span className="lp-eyebrow">
//             <span className="lp-eyebrow__blink" />
//             CALLSIGN AWAITING CLEARANCE
//           </span>

//           <h1>
//             LAUNCH YOUR
//             <br />
//             <span className="lp-gradient-text">NEXT INTERVIEW</span>
//           </h1>
//           <p className="lp-typed">{typed}<span className="lp-cursor" /></p>

//           <p className="lp-desc">
//             Upload your resume, target any job description, and get an ATS
//             match reading, technical &amp; behavioral question banks, and a
//             day-by-day flight plan to prep — all instrumented by AI.
//           </p>

//           <div className="lp-panelrow">
//             {[
//               ["ATS", "Match Reading"],
//               ["Q-BANK", "Question Sets"],
//               ["ROADMAP", "Prep Sequence"],
//               ["RESUME", "Auto-Tuned"],
//             ].map(([code, label], i) => (
//               <div className="lp-chip" key={code} style={{ "--d": i }}>
//                 <span className="lp-chip__code">{code}</span>
//                 <span className="lp-chip__label">{label}</span>
//                 <span className="lp-chip__light" />
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>

//       <style>{LP_STYLES}</style>
//     </main>
//   );
// };

// const LP_STYLES = `
// *{box-sizing:border-box;}
// html,body,#root{height:100%;}
// .lp-shell{
//   --amber:#3d8bff; --crimson:#ff4d4d; --cyan:#3fd0ff;
//   --bg:#070b16; --panel:#0e1526; --panel2:#121a2e;
//   --line:rgba(61,139,255,.16); --text:#f4ede1; --muted:#9a8f7d;
//   position:relative;min-height:100vh;min-height:100dvh;background:var(--bg);color:var(--text);
//   font-family:'Inter',system-ui,sans-serif;overflow:hidden;padding:0;
// }
// .lp-bg{position:absolute;inset:0;z-index:0;overflow:hidden;}
// .lp-grid{position:absolute;inset:-20%;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(ellipse at 50% 20%,black 0%,transparent 65%);animation:lpDrift 30s linear infinite;}
// @keyframes lpDrift{0%{transform:translateY(0)}100%{transform:translateY(52px)}}
// .lp-horizon{position:absolute;left:0;right:0;bottom:-2px;height:40%;background:radial-gradient(ellipse at 50% 100%, rgba(255,77,77,.18), transparent 70%);}
// .lp-star{position:absolute;border-radius:50%;background:var(--amber);opacity:.7;animation:lpTwinkle 3s ease-in-out infinite;}
// .lp-star1{width:3px;height:3px;top:12%;left:18%;}
// .lp-star2{width:2px;height:2px;top:30%;left:74%;animation-delay:1s;}
// .lp-star3{width:4px;height:4px;top:65%;left:50%;animation-delay:2s;background:var(--cyan);}
// @keyframes lpTwinkle{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.3)}}
// .lp-scanline{position:absolute;left:0;right:0;height:2px;top:0;background:linear-gradient(90deg,transparent,rgba(61,139,255,.5),transparent);animation:lpScanFall 6s linear infinite;}
// @keyframes lpScanFall{0%{top:0;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}

// .lp-topbar{position:relative;z-index:2;display:flex;gap:26px;padding:14px 28px;font-family:'Roboto Mono',monospace;font-size:11px;letter-spacing:.06em;color:var(--muted);border-bottom:1px solid var(--line);}
// .lp-topbar__item b{color:var(--amber);font-weight:700;}
// .lp-topbar__clock::before{content:"TIME // LOCAL";}

// .lp-wrap{position:relative;z-index:1;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.25fr .95fr;min-height:calc(100vh - 46px);min-height:calc(100dvh - 46px);}
// /* desktop: brief on the left, console on the right, regardless of DOM order */
// .lp-brief{order:1;}
// .lp-console{order:2;}

// .lp-corner{position:absolute;width:26px;height:26px;border-color:var(--amber);opacity:.7;}
// .lp-corner--tl{top:14px;left:14px;border-top:2px solid;border-left:2px solid;}
// .lp-corner--bl{bottom:14px;left:14px;border-bottom:2px solid;border-left:2px solid;}
// .lp-corner--tr{top:14px;right:14px;border-top:2px solid;border-right:2px solid;}
// .lp-corner--br{bottom:14px;right:14px;border-bottom:2px solid;border-right:2px solid;}

// .lp-brief{position:relative;padding:68px 64px;display:flex;flex-direction:column;justify-content:center;border-right:1px solid var(--line);}
// .lp-callsign{display:flex;align-items:center;gap:14px;margin-bottom:30px;animation:lpRise .7s both;}
// @keyframes lpRise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
// .lp-badge-emblem{position:relative;width:56px;height:56px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#1a1006;background:linear-gradient(135deg,var(--amber),#1e4fa8);flex-shrink:0;}
// .lp-badge-emblem__ring{position:absolute;inset:-4px;border-radius:12px;border:1px dashed rgba(61,139,255,.5);animation:lpSpin 8s linear infinite;}
// @keyframes lpSpin{to{transform:rotate(360deg)}}
// .lp-callsign h3{margin:0;font-family:'Space Grotesk',sans-serif;font-size:22px;letter-spacing:.02em;}
// .lp-callsign h3 span{color:var(--amber);}
// .lp-callsign > div > span{font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.1em;color:var(--muted);}

// .lp-eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:'Roboto Mono',monospace;font-size:11.5px;letter-spacing:.08em;color:var(--crimson);background:rgba(255,77,77,.08);border:1px solid rgba(255,77,77,.3);padding:6px 14px;border-radius:3px;margin-bottom:22px;width:fit-content;animation:lpRise .7s .05s both;}
// .lp-eyebrow__blink{width:7px;height:7px;background:var(--crimson);border-radius:50%;animation:lpBlink 1s steps(1) infinite;}
// @keyframes lpBlink{0%,49%{opacity:1}50%,100%{opacity:.15}}

// .lp-brief h1{font-family:'Space Grotesk',sans-serif;font-size:54px;line-height:1.08;font-weight:700;margin:0;letter-spacing:-.01em;animation:lpRise .7s .1s both;}
// .lp-gradient-text{background:linear-gradient(100deg,var(--amber),#a9c9ff,var(--crimson),var(--amber));background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:lpShift 5s ease infinite;}
// @keyframes lpShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
// .lp-typed{font-family:'Roboto Mono',monospace;color:var(--amber);font-size:14px;letter-spacing:.05em;margin:18px 0 20px;min-height:18px;}
// .lp-cursor{display:inline-block;width:8px;height:14px;background:var(--amber);margin-left:2px;vertical-align:middle;animation:lpBlink .8s steps(1) infinite;}
// .lp-desc{color:var(--muted);font-size:15.5px;line-height:1.8;max-width:520px;animation:lpRise .7s .15s both;}

// .lp-panelrow{margin-top:36px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
// .lp-chip{position:relative;padding:14px 16px;background:var(--panel);border:1px solid var(--line);border-radius:6px;animation:lpRise .5s both;animation-delay:calc(var(--d)*.08s + .2s);transition:border-color .25s,transform .25s;}
// .lp-chip:hover{border-color:var(--amber);transform:translateY(-3px);}
// .lp-chip__code{display:block;font-family:'Roboto Mono',monospace;font-size:11px;letter-spacing:.1em;color:var(--amber);font-weight:700;}
// .lp-chip__label{display:block;font-size:13px;color:var(--text);margin-top:5px;}
// .lp-chip__light{position:absolute;top:12px;right:12px;width:6px;height:6px;border-radius:50%;background:var(--cyan);box-shadow:0 0 6px var(--cyan);animation:lpBlink 2.4s steps(1) infinite;}

// .lp-console{position:relative;padding:68px 56px;display:flex;flex-direction:column;justify-content:center;background:linear-gradient(180deg,var(--panel),var(--bg));}
// .lp-console__head{animation:lpRise .7s both;}
// .lp-tag{display:inline-block;font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.14em;color:var(--amber);border:1px solid rgba(61,139,255,.35);padding:5px 12px;border-radius:3px;margin-bottom:18px;}
// .lp-console__head h2{font-family:'Space Grotesk',sans-serif;font-size:34px;line-height:1.15;margin:0 0 14px;font-weight:700;}
// .lp-console__head p{color:var(--muted);font-size:14.5px;line-height:1.7;margin:0 0 30px;}

// .lp-ignite{position:relative;width:100%;display:flex;align-items:center;gap:12px;padding:17px 20px;border:1px solid rgba(61,139,255,.4);background:linear-gradient(135deg,#2a1c0a,#1b1209);color:var(--text);font-weight:700;font-size:15px;border-radius:6px;cursor:pointer;overflow:hidden;transition:transform .2s,box-shadow .3s,border-color .2s;letter-spacing:.02em;}
// .lp-ignite:hover{transform:translateY(-3px);box-shadow:0 14px 30px -10px rgba(61,139,255,.35);border-color:var(--amber);}
// .lp-ignite__bolt svg{background:white;border-radius:50%;padding:3px;display:block;}
// .lp-ignite__sweep{position:absolute;top:0;left:-60%;width:50%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.16),transparent);transform:skewX(-20deg);}
// .lp-ignite:hover .lp-ignite__sweep{animation:lpSweep .9s ease;}
// @keyframes lpSweep{from{left:-60%}to{left:130%}}
// .lp-ignite__arrow{margin-left:auto;font-size:20px;color:var(--amber);transition:transform .25s;}
// .lp-ignite:hover .lp-ignite__arrow{transform:translateX(5px);}

// .lp-statuslights{display:flex;gap:18px;margin-top:22px;flex-wrap:wrap;}
// .lp-light{display:flex;align-items:center;gap:7px;font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.08em;color:var(--muted);animation:lpRise .5s both;animation-delay:calc(var(--d)*.1s + .3s);}
// .lp-light__dot{width:7px;height:7px;border-radius:50%;background:var(--cyan);box-shadow:0 0 8px var(--cyan);animation:lpBlink 1.6s steps(1) infinite;animation-delay:calc(var(--d)*.3s);}

// .lp-divider{display:flex;align-items:center;gap:14px;margin:34px 0 22px;color:var(--muted);font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.14em;}
// .lp-divider::before,.lp-divider::after{content:"";flex:1;height:1px;background:var(--line);}

// .lp-checklist{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px;}
// .lp-checklist li{display:flex;align-items:center;gap:10px;font-size:13.5px;color:var(--text);animation:lpRise .5s both;animation-delay:calc(var(--d)*.08s + .4s);}
// .lp-checklist__tick{color:var(--amber);font-weight:700;}

// .lp-footer{margin-top:30px;font-size:12px;color:var(--muted);line-height:1.7;}
// .lp-footer strong{color:var(--amber);cursor:pointer;}

// .lp-loading{min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:var(--bg,#070b16);color:#f4ede1;font-family:'Inter',sans-serif;}
// .lp-loading__radar{position:relative;width:90px;height:90px;border-radius:50%;border:1px solid rgba(61,139,255,.3);}
// .lp-loading__ring{position:absolute;inset:16px;border-radius:50%;border:1px solid rgba(61,139,255,.25);}
// .lp-loading__sweep{position:absolute;inset:0;border-radius:50%;background:conic-gradient(rgba(61,139,255,.65),transparent 40%);animation:lpSpin 1.1s linear infinite;}
// .lp-loading h1{font-family:'Space Grotesk',sans-serif;font-size:20px;letter-spacing:.03em;}
// .lp-dotdotdot i{font-style:normal;animation:lpBlink 1.2s steps(1) infinite;}
// .lp-dotdotdot i:nth-child(2){animation-delay:.15s;}
// .lp-dotdotdot i:nth-child(3){animation-delay:.3s;}
// .lp-loading p{color:#9a8f7d;font-family:'Roboto Mono',monospace;font-size:12px;letter-spacing:.06em;}

// @media(max-width:1080px){
//   .lp-wrap{grid-template-columns:1fr;}
//   .lp-brief{border-right:none;border-bottom:1px solid var(--line);}
//   .lp-brief h1{font-size:42px;}
// }

// /* ===== MOBILE: console (login) comes first and fits without scrolling ===== */
// @media(max-width:600px){
//   .lp-shell{overflow-y:auto;}
//   .lp-topbar{padding:8px 14px;gap:14px;font-size:9.5px;}
//   .lp-topbar__item:nth-child(2){display:none;} /* MODE ticker not essential on phone */
//   .lp-wrap{grid-template-columns:1fr;min-height:auto;}

//   /* reorder: console (login) first, brief content after — reachable with one small scroll */
//   .lp-console{order:1;padding:20px 20px 22px;border-bottom:1px solid var(--line);}
//   .lp-brief{order:2;padding:22px 20px 28px;border-bottom:none;}

//   .lp-console__head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px;}
//   .lp-tag{margin-bottom:0;font-size:9.5px;padding:4px 9px;}
//   .lp-console__head h2{font-size:20px;line-height:1.2;margin:0;flex-basis:100%;order:2;}
//   .lp-console__head p{display:none;} /* trimmed on phone to keep the button in view immediately */

//   .lp-ignite{padding:14px 16px;font-size:13.5px;}
//   .lp-statuslights{display:none;} /* decorative row, cut for a cleaner phone view */
//   .lp-divider{margin:16px 0 12px;}
//   .lp-checklist{flex-direction:row;flex-wrap:wrap;column-gap:16px;row-gap:8px;}
//   .lp-checklist li{font-size:11.5px;}

//   .lp-corner{width:16px;height:16px;}

//   .lp-callsign{margin-bottom:14px;}
//   .lp-badge-emblem{width:38px;height:38px;}
//   .lp-callsign h3{font-size:16px;}
//   .lp-callsign > div > span{font-size:9px;}
//   .lp-eyebrow{display:none;} /* redundant with the badge above the button; drop for a cleaner look */
//   .lp-brief h1{font-size:27px;}
//   .lp-typed{display:none;} /* same message as the button copy above, skip repeating it */
//   .lp-desc{font-size:13px;line-height:1.6;margin-top:2px;}
//   .lp-panelrow{display:none;} /* feature grid repeats the description; keep phone view to one clear message */
// }

// @media (prefers-reduced-motion: reduce){.lp-grid,.lp-star,.lp-scanline,.lp-badge-emblem__ring,.lp-eyebrow__blink,.lp-cursor,.lp-chip__light,.lp-light__dot,.lp-loading__sweep,.lp-dotdotdot i{animation:none !important;}}
// `;

// export default Login;




// import React, { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";

// const SEQUENCE = ["AUTH", "IDENTITY", "PROFILE VAULT", "CLEARANCE"];

// const Login = () => {
//   const { loading } = useAuth();
//   const [seqIndex, setSeqIndex] = useState(0);
//   const [typed, setTyped] = useState("");

//   const handleGoogleLogin = () => {
//     window.location.href = "https://interview-iq-ppv9.onrender.com/api/auth/google";
//   };

//   // cycles through a small "system check" ticker
//   useEffect(() => {
//     const id = setInterval(() => setSeqIndex((i) => (i + 1) % SEQUENCE.length), 1800);
//     return () => clearInterval(id);
//   }, []);

//   // typewriter for the mission line
//   useEffect(() => {
//     const full = "READY FOR DEPARTURE.";
//     let i = 0;
//     setTyped("");
//     const id = setInterval(() => {
//       i++;
//       setTyped(full.slice(0, i));
//       if (i >= full.length) clearInterval(id);
//     }, 55);
//     return () => clearInterval(id);
//   }, []);

//   if (loading) {
//     return (
//       <main className="lp-loading">
//         <div className="lp-loading__radar">
//           <span className="lp-loading__sweep" />
//           <span className="lp-loading__ring" />
//         </div>
//         <h1>ESTABLISHING UPLINK<span className="lp-dotdotdot"><i>.</i><i>.</i><i>.</i></span></h1>
//         <p>Authenticating with Google Systems</p>
//         <style>{LP_STYLES}</style>
//       </main>
//     );
//   }

//   return (
//     <main className="lp-shell">
//       <div className="lp-bg">
//         <div className="lp-grid" />
//         <div className="lp-horizon" />
//         <div className="lp-star lp-star1" />
//         <div className="lp-star lp-star2" />
//         <div className="lp-star lp-star3" />
//         <div className="lp-scanline" />
//       </div>

//       <div className="lp-topbar">
//         <span className="lp-topbar__item">SYS // <b>ONLINE</b></span>
//         <span className="lp-topbar__item">MODE // <b>{SEQUENCE[seqIndex]}</b></span>
//         <span className="lp-topbar__item lp-topbar__clock" />
//       </div>

//       <div className="lp-wrap">
//         {/* RIGHT (desktop) / TOP (mobile): IGNITION CONSOLE — the actual login action, kept above the fold on phones */}
//         <section className="lp-console">
//           <div className="lp-corner lp-corner--tr" />
//           <div className="lp-corner lp-corner--br" />

//           <div className="lp-console__head">
//             <span className="lp-tag">ACCESS PANEL</span>
//             <h2>Ignition<br />Authorization</h2>
//             <p>
//               We verify identity through your Google account to spin up a
//               secure InterviewIQ profile. No password stored, no password needed.
//             </p>
//           </div>

//           <button className="lp-ignite" onClick={handleGoogleLogin}>
//             <span className="lp-ignite__sweep" />
//             <span className="lp-ignite__bolt">
//               <svg width="20" height="20" viewBox="0 0 48 48">
//                 <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.61l6.86-6.86C35.9 2.39 30.37 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.42 13.37 17.72 9.5 24 9.5z" />
//                 <path fill="#4285F4" d="M46.98 24.55c0-1.57-.14-3.09-.39-4.55H24v9.1h12.94c-.56 3-2.25 5.55-4.8 7.26l7.73 6c4.52-4.17 7.11-10.31 7.11-17.81z" />
//                 <path fill="#FBBC05" d="M10.54 28.58A14.5 14.5 0 019.5 24c0-1.59.27-3.13.75-4.58l-7.98-6.2A24.03 24.03 0 000 24c0 3.88.93 7.54 2.57 10.78l7.97-6.2z" />
//                 <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.89-5.81l-7.73-6c-2.15 1.44-4.89 2.31-8.16 2.31-6.28 0-11.58-3.87-13.46-9.32l-7.97 6.2C6.5 42.62 14.62 48 24 48z" />
//               </svg>
//             </span>
//             <span>CONTINUE WITH GOOGLE</span>
//             <span className="lp-ignite__arrow">›</span>
//           </button>

//           <div className="lp-statuslights">
//             {["ARMED", "FUEL", "NAV-LOCK", "COMMS"].map((s, i) => (
//               <div className="lp-light" key={s} style={{ "--d": i }}>
//                 <span className="lp-light__dot" />
//                 {s}
//               </div>
//             ))}
//           </div>

//           <div className="lp-divider"><span>SECURE CHANNEL</span></div>

//           <ul className="lp-checklist">
//             {[
//               "No password required",
//               "Profile auto-provisioned on first login",
//               "Encrypted session, revocable anytime",
//               "Verified Google accounts only",
//             ].map((t, i) => (
//               <li key={t} style={{ "--d": i }}>
//                 <span className="lp-checklist__tick">✓</span>
//                 {t}
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* LEFT (desktop) / BOTTOM (mobile): MISSION BRIEF */}
//         <section className="lp-brief">
//           <div className="lp-corner lp-corner--tl" />
//           <div className="lp-corner lp-corner--bl" />

//           <div className="lp-callsign">
//             <span className="lp-badge-emblem">
//               <span className="lp-badge-emblem__ring" />
//               <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M12 2 L15 9 L22 9.5 L16.5 14 L18.5 21 L12 17 L5.5 21 L7.5 14 L2 9.5 L9 9 Z" />
//               </svg>
//             </span>
//             <div>
//               <h3>INTERVIEW_IQ&nbsp;<span>AI</span></h3>
//               <span>FLIGHT DECK · INTERVIEW OPS</span>
//             </div>
//           </div>

//           <span className="lp-eyebrow">
//             <span className="lp-eyebrow__blink" />
//             CALLSIGN AWAITING CLEARANCE
//           </span>

//           <h1>
//             LAUNCH YOUR
//             <br />
//             <span className="lp-gradient-text">NEXT INTERVIEW</span>
//           </h1>
//           <p className="lp-typed">{typed}<span className="lp-cursor" /></p>

//           <p className="lp-desc">
//             Upload your resume, target any job description, and get an ATS
//             match reading, technical &amp; behavioral question banks, and a
//             day-by-day flight plan to prep — all instrumented by AI.
//           </p>

//           <div className="lp-panelrow">
//             {[
//               ["ATS", "Match Reading"],
//               ["Q-BANK", "Question Sets"],
//               ["ROADMAP", "Prep Sequence"],
//               ["RESUME", "Auto-Tuned"],
//             ].map(([code, label], i) => (
//               <div className="lp-chip" key={code} style={{ "--d": i }}>
//                 <span className="lp-chip__code">{code}</span>
//                 <span className="lp-chip__label">{label}</span>
//                 <span className="lp-chip__light" />
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>

//       <style>{LP_STYLES}</style>
//     </main>
//   );
// };

// const LP_STYLES = `
// *{box-sizing:border-box;}
// html,body,#root{height:100%;}
// .lp-shell{
//   --amber:#3d8bff; --crimson:#ff4d4d; --cyan:#3fd0ff;
//   --bg:#070b16; --panel:#0e1526; --panel2:#121a2e;
//   --line:rgba(61,139,255,.16); --text:#f4ede1; --muted:#9a8f7d;
//   position:relative;min-height:100vh;min-height:100dvh;background:var(--bg);color:var(--text);
//   font-family:'Inter',system-ui,sans-serif;overflow:hidden;padding:0;
// }
// .lp-bg{position:absolute;inset:0;z-index:0;overflow:hidden;}
// .lp-grid{position:absolute;inset:-20%;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(ellipse at 50% 20%,black 0%,transparent 65%);animation:lpDrift 30s linear infinite;}
// @keyframes lpDrift{0%{transform:translateY(0)}100%{transform:translateY(52px)}}
// .lp-horizon{position:absolute;left:0;right:0;bottom:-2px;height:40%;background:radial-gradient(ellipse at 50% 100%, rgba(255,77,77,.18), transparent 70%);}
// .lp-star{position:absolute;border-radius:50%;background:var(--amber);opacity:.7;animation:lpTwinkle 3s ease-in-out infinite;}
// .lp-star1{width:3px;height:3px;top:12%;left:18%;}
// .lp-star2{width:2px;height:2px;top:30%;left:74%;animation-delay:1s;}
// .lp-star3{width:4px;height:4px;top:65%;left:50%;animation-delay:2s;background:var(--cyan);}
// @keyframes lpTwinkle{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.3)}}
// .lp-scanline{position:absolute;left:0;right:0;height:2px;top:0;background:linear-gradient(90deg,transparent,rgba(61,139,255,.5),transparent);animation:lpScanFall 6s linear infinite;}
// @keyframes lpScanFall{0%{top:0;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}

// .lp-topbar{position:relative;z-index:2;display:flex;gap:26px;padding:14px 28px;font-family:'Roboto Mono',monospace;font-size:11px;letter-spacing:.06em;color:var(--muted);border-bottom:1px solid var(--line);}
// .lp-topbar__item b{color:var(--amber);font-weight:700;}
// .lp-topbar__clock::before{content:"TIME // LOCAL";}

// .lp-wrap{position:relative;z-index:1;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.25fr .95fr;min-height:calc(100vh - 46px);min-height:calc(100dvh - 46px);}
// /* desktop: brief on the left, console on the right, regardless of DOM order */
// .lp-brief{order:1;}
// .lp-console{order:2;}

// .lp-corner{position:absolute;width:26px;height:26px;border-color:var(--amber);opacity:.7;}
// .lp-corner--tl{top:14px;left:14px;border-top:2px solid;border-left:2px solid;}
// .lp-corner--bl{bottom:14px;left:14px;border-bottom:2px solid;border-left:2px solid;}
// .lp-corner--tr{top:14px;right:14px;border-top:2px solid;border-right:2px solid;}
// .lp-corner--br{bottom:14px;right:14px;border-bottom:2px solid;border-right:2px solid;}

// .lp-brief{position:relative;padding:68px 64px;display:flex;flex-direction:column;justify-content:center;border-right:1px solid var(--line);}
// .lp-callsign{display:flex;align-items:center;gap:14px;margin-bottom:30px;animation:lpRise .7s both;}
// @keyframes lpRise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
// .lp-badge-emblem{position:relative;width:56px;height:56px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#1a1006;background:linear-gradient(135deg,var(--amber),#1e4fa8);flex-shrink:0;}
// .lp-badge-emblem__ring{position:absolute;inset:-4px;border-radius:12px;border:1px dashed rgba(61,139,255,.5);animation:lpSpin 8s linear infinite;}
// @keyframes lpSpin{to{transform:rotate(360deg)}}
// .lp-callsign h3{margin:0;font-family:'Space Grotesk',sans-serif;font-size:22px;letter-spacing:.02em;}
// .lp-callsign h3 span{color:var(--amber);}
// .lp-callsign > div > span{font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.1em;color:var(--muted);}

// .lp-eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:'Roboto Mono',monospace;font-size:11.5px;letter-spacing:.08em;color:var(--crimson);background:rgba(255,77,77,.08);border:1px solid rgba(255,77,77,.3);padding:6px 14px;border-radius:3px;margin-bottom:22px;width:fit-content;animation:lpRise .7s .05s both;}
// .lp-eyebrow__blink{width:7px;height:7px;background:var(--crimson);border-radius:50%;animation:lpBlink 1s steps(1) infinite;}
// @keyframes lpBlink{0%,49%{opacity:1}50%,100%{opacity:.15}}

// .lp-brief h1{font-family:'Space Grotesk',sans-serif;font-size:54px;line-height:1.08;font-weight:700;margin:0;letter-spacing:-.01em;animation:lpRise .7s .1s both;}
// .lp-gradient-text{background:linear-gradient(100deg,var(--amber),#a9c9ff,var(--crimson),var(--amber));background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:lpShift 5s ease infinite;}
// @keyframes lpShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
// .lp-typed{font-family:'Roboto Mono',monospace;color:var(--amber);font-size:14px;letter-spacing:.05em;margin:18px 0 20px;min-height:18px;}
// .lp-cursor{display:inline-block;width:8px;height:14px;background:var(--amber);margin-left:2px;vertical-align:middle;animation:lpBlink .8s steps(1) infinite;}
// .lp-desc{color:var(--muted);font-size:15.5px;line-height:1.8;max-width:520px;animation:lpRise .7s .15s both;}

// .lp-panelrow{margin-top:36px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
// .lp-chip{position:relative;padding:14px 16px;background:var(--panel);border:1px solid var(--line);border-radius:6px;animation:lpRise .5s both;animation-delay:calc(var(--d)*.08s + .2s);transition:border-color .25s,transform .25s;}
// .lp-chip:hover{border-color:var(--amber);transform:translateY(-3px);}
// .lp-chip__code{display:block;font-family:'Roboto Mono',monospace;font-size:11px;letter-spacing:.1em;color:var(--amber);font-weight:700;}
// .lp-chip__label{display:block;font-size:13px;color:var(--text);margin-top:5px;}
// .lp-chip__light{position:absolute;top:12px;right:12px;width:6px;height:6px;border-radius:50%;background:var(--cyan);box-shadow:0 0 6px var(--cyan);animation:lpBlink 2.4s steps(1) infinite;}

// .lp-console{position:relative;padding:68px 56px;display:flex;flex-direction:column;justify-content:center;background:linear-gradient(180deg,var(--panel),var(--bg));}
// .lp-console__head{animation:lpRise .7s both;}
// .lp-tag{display:inline-block;font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.14em;color:var(--amber);border:1px solid rgba(61,139,255,.35);padding:5px 12px;border-radius:3px;margin-bottom:18px;}
// .lp-console__head h2{font-family:'Space Grotesk',sans-serif;font-size:34px;line-height:1.15;margin:0 0 14px;font-weight:700;}
// .lp-console__head p{color:var(--muted);font-size:14.5px;line-height:1.7;margin:0 0 30px;}

// .lp-ignite{position:relative;width:100%;display:flex;align-items:center;gap:12px;padding:17px 20px;border:1px solid rgba(61,139,255,.4);background:linear-gradient(135deg,#2a1c0a,#1b1209);color:var(--text);font-weight:700;font-size:15px;border-radius:6px;cursor:pointer;overflow:hidden;transition:transform .2s,box-shadow .3s,border-color .2s;letter-spacing:.02em;}
// .lp-ignite:hover{transform:translateY(-3px);box-shadow:0 14px 30px -10px rgba(61,139,255,.35);border-color:var(--amber);}
// .lp-ignite__bolt svg{background:white;border-radius:50%;padding:3px;display:block;}
// .lp-ignite__sweep{position:absolute;top:0;left:-60%;width:50%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.16),transparent);transform:skewX(-20deg);}
// .lp-ignite:hover .lp-ignite__sweep{animation:lpSweep .9s ease;}
// @keyframes lpSweep{from{left:-60%}to{left:130%}}
// .lp-ignite__arrow{margin-left:auto;font-size:20px;color:var(--amber);transition:transform .25s;}
// .lp-ignite:hover .lp-ignite__arrow{transform:translateX(5px);}

// .lp-statuslights{display:flex;gap:18px;margin-top:22px;flex-wrap:wrap;}
// .lp-light{display:flex;align-items:center;gap:7px;font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.08em;color:var(--muted);animation:lpRise .5s both;animation-delay:calc(var(--d)*.1s + .3s);}
// .lp-light__dot{width:7px;height:7px;border-radius:50%;background:var(--cyan);box-shadow:0 0 8px var(--cyan);animation:lpBlink 1.6s steps(1) infinite;animation-delay:calc(var(--d)*.3s);}

// .lp-divider{display:flex;align-items:center;gap:14px;margin:34px 0 22px;color:var(--muted);font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.14em;}
// .lp-divider::before,.lp-divider::after{content:"";flex:1;height:1px;background:var(--line);}

// .lp-checklist{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px;}
// .lp-checklist li{display:flex;align-items:center;gap:10px;font-size:13.5px;color:var(--text);animation:lpRise .5s both;animation-delay:calc(var(--d)*.08s + .4s);}
// .lp-checklist__tick{color:var(--amber);font-weight:700;}

// .lp-footer{margin-top:30px;font-size:12px;color:var(--muted);line-height:1.7;}
// .lp-footer strong{color:var(--amber);cursor:pointer;}

// .lp-loading{min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:var(--bg,#070b16);color:#f4ede1;font-family:'Inter',sans-serif;}
// .lp-loading__radar{position:relative;width:90px;height:90px;border-radius:50%;border:1px solid rgba(61,139,255,.3);}
// .lp-loading__ring{position:absolute;inset:16px;border-radius:50%;border:1px solid rgba(61,139,255,.25);}
// .lp-loading__sweep{position:absolute;inset:0;border-radius:50%;background:conic-gradient(rgba(61,139,255,.65),transparent 40%);animation:lpSpin 1.1s linear infinite;}
// .lp-loading h1{font-family:'Space Grotesk',sans-serif;font-size:20px;letter-spacing:.03em;}
// .lp-dotdotdot i{font-style:normal;animation:lpBlink 1.2s steps(1) infinite;}
// .lp-dotdotdot i:nth-child(2){animation-delay:.15s;}
// .lp-dotdotdot i:nth-child(3){animation-delay:.3s;}
// .lp-loading p{color:#9a8f7d;font-family:'Roboto Mono',monospace;font-size:12px;letter-spacing:.06em;}

// @media(max-width:1080px){
//   .lp-wrap{grid-template-columns:1fr;}
//   .lp-brief{border-right:none;border-bottom:1px solid var(--line);}
//   .lp-brief h1{font-size:42px;}
// }

// /* ===== MOBILE: console (login) comes first and fits without scrolling ===== */
// @media(max-width:600px){
//   .lp-shell{overflow-y:auto;}
//   .lp-topbar{padding:8px 14px;gap:14px;font-size:9.5px;}
//   .lp-topbar__item:nth-child(2){display:none;} /* MODE ticker not essential on phone */
//   .lp-wrap{grid-template-columns:1fr;min-height:auto;}

//   /* reorder: console (login) first, brief content after — reachable with one small scroll */
//   .lp-console{order:1;padding:20px 20px 22px;border-bottom:1px solid var(--line);}
//   .lp-brief{order:2;padding:22px 20px 28px;border-bottom:none;}

//   .lp-console__head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px;}
//   .lp-tag{margin-bottom:0;font-size:9.5px;padding:4px 9px;}
//   .lp-console__head h2{font-size:20px;line-height:1.2;margin:0;flex-basis:100%;order:2;}
//   .lp-console__head p{display:none;} /* trimmed on phone to keep the button in view immediately */

//   .lp-ignite{padding:14px 16px;font-size:13.5px;}
//   .lp-statuslights{display:none;} /* decorative row, cut for a cleaner phone view */
//   .lp-divider{margin:16px 0 12px;}
//   .lp-checklist{flex-direction:row;flex-wrap:wrap;column-gap:16px;row-gap:8px;}
//   .lp-checklist li{font-size:11.5px;}

//   .lp-corner{width:16px;height:16px;}

//   .lp-callsign{margin-bottom:14px;}
//   .lp-badge-emblem{width:38px;height:38px;}
//   .lp-callsign h3{font-size:16px;}
//   .lp-callsign > div > span{font-size:9px;}
//   .lp-eyebrow{display:none;} /* redundant with the badge above the button; drop for a cleaner look */
//   .lp-brief h1{font-size:27px;}
//   .lp-typed{display:none;} /* same message as the button copy above, skip repeating it */
//   .lp-desc{font-size:13px;line-height:1.6;margin-top:2px;}
//   .lp-panelrow{display:none;} /* feature grid repeats the description; keep phone view to one clear message */
// }

// @media (prefers-reduced-motion: reduce){.lp-grid,.lp-star,.lp-scanline,.lp-badge-emblem__ring,.lp-eyebrow__blink,.lp-cursor,.lp-chip__light,.lp-light__dot,.lp-loading__sweep,.lp-dotdotdot i{animation:none !important;}}
// `;

// export default Login;




// import React, { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";

// const SEQUENCE = ["AUTH", "IDENTITY", "PROFILE VAULT", "CLEARANCE"];

// const Login = () => {
//   const { loading } = useAuth();
//   const [seqIndex, setSeqIndex] = useState(0);
//   const [typed, setTyped] = useState("");

//   const handleGoogleLogin = () => {
//     window.location.href = "https://interview-iq-ppv9.onrender.com/api/auth/google";
//   };

//   // cycles through a small "system check" ticker
//   useEffect(() => {
//     const id = setInterval(() => setSeqIndex((i) => (i + 1) % SEQUENCE.length), 1800);
//     return () => clearInterval(id);
//   }, []);

//   // typewriter for the mission line
//   useEffect(() => {
//     const full = "READY FOR DEPARTURE.";
//     let i = 0;
//     setTyped("");
//     const id = setInterval(() => {
//       i++;
//       setTyped(full.slice(0, i));
//       if (i >= full.length) clearInterval(id);
//     }, 55);
//     return () => clearInterval(id);
//   }, []);

//   if (loading) {
//     return (
//       <main className="lp-loading">
//         <div className="lp-loading__radar">
//           <span className="lp-loading__sweep" />
//           <span className="lp-loading__ring" />
//         </div>
//         <h1>ESTABLISHING UPLINK<span className="lp-dotdotdot"><i>.</i><i>.</i><i>.</i></span></h1>
//         <p>Authenticating with Google Systems</p>
//         <style>{LP_STYLES}</style>
//       </main>
//     );
//   }

//   return (
//     <main className="lp-shell">
//       <div className="lp-bg">
//         <div className="lp-grid" />
//         <div className="lp-horizon" />
//         <div className="lp-star lp-star1" />
//         <div className="lp-star lp-star2" />
//         <div className="lp-star lp-star3" />
//         <div className="lp-scanline" />
//       </div>

//       <div className="lp-topbar">
//         <span className="lp-topbar__item">SYS // <b>ONLINE</b></span>
//         <span className="lp-topbar__item">MODE // <b>{SEQUENCE[seqIndex]}</b></span>
//         <span className="lp-topbar__item lp-topbar__clock" />
//       </div>

//       <div className="lp-wrap">
//         {/* RIGHT (desktop) / TOP (mobile): IGNITION CONSOLE — the actual login action, kept above the fold on phones */}
//         <section className="lp-console">
//           <div className="lp-corner lp-corner--tr" />
//           <div className="lp-corner lp-corner--br" />

//           <div className="lp-console__head">
//             <span className="lp-tag">ACCESS PANEL</span>
//             <h2>Ignition<br />Authorization</h2>
//             <p>
//               We verify identity through your Google account to spin up a
//               secure InterviewIQ profile. No password stored, no password needed.
//             </p>
//           </div>

//           <button className="lp-ignite" onClick={handleGoogleLogin}>
//             <span className="lp-ignite__sweep" />
//             <span className="lp-ignite__bolt">
//               <svg width="20" height="20" viewBox="0 0 48 48">
//                 <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.61l6.86-6.86C35.9 2.39 30.37 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.42 13.37 17.72 9.5 24 9.5z" />
//                 <path fill="#4285F4" d="M46.98 24.55c0-1.57-.14-3.09-.39-4.55H24v9.1h12.94c-.56 3-2.25 5.55-4.8 7.26l7.73 6c4.52-4.17 7.11-10.31 7.11-17.81z" />
//                 <path fill="#FBBC05" d="M10.54 28.58A14.5 14.5 0 019.5 24c0-1.59.27-3.13.75-4.58l-7.98-6.2A24.03 24.03 0 000 24c0 3.88.93 7.54 2.57 10.78l7.97-6.2z" />
//                 <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.89-5.81l-7.73-6c-2.15 1.44-4.89 2.31-8.16 2.31-6.28 0-11.58-3.87-13.46-9.32l-7.97 6.2C6.5 42.62 14.62 48 24 48z" />
//               </svg>
//             </span>
//             <span>CONTINUE WITH GOOGLE</span>
//             <span className="lp-ignite__arrow">›</span>
//           </button>

//           <div className="lp-statuslights">
//             {["ARMED", "FUEL", "NAV-LOCK", "COMMS"].map((s, i) => (
//               <div className="lp-light" key={s} style={{ "--d": i }}>
//                 <span className="lp-light__dot" />
//                 {s}
//               </div>
//             ))}
//           </div>

//           <div className="lp-divider"><span>SECURE CHANNEL</span></div>

//           <ul className="lp-checklist">
//             {[
//               "No password required",
//               "Profile auto-provisioned on first login",
//               "Encrypted session, revocable anytime",
//               "Verified Google accounts only",
//             ].map((t, i) => (
//               <li key={t} style={{ "--d": i }}>
//                 <span className="lp-checklist__tick">✓</span>
//                 {t}
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* LEFT (desktop) / BOTTOM (mobile): MISSION BRIEF */}
//         <section className="lp-brief">
//           <div className="lp-corner lp-corner--tl" />
//           <div className="lp-corner lp-corner--bl" />

//           <div className="lp-callsign">
//             <span className="lp-badge-emblem">
//               <span className="lp-badge-emblem__ring" />
//               <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M12 2 L15 9 L22 9.5 L16.5 14 L18.5 21 L12 17 L5.5 21 L7.5 14 L2 9.5 L9 9 Z" />
//               </svg>
//             </span>
//             <div>
//               <h3>INTERVIEW_IQ&nbsp;<span>AI</span></h3>
//               <span>FLIGHT DECK · INTERVIEW OPS</span>
//             </div>
//           </div>

//           <span className="lp-eyebrow">
//             <span className="lp-eyebrow__blink" />
//             CALLSIGN AWAITING CLEARANCE
//           </span>

//           <h1>
//             LAUNCH YOUR
//             <br />
//             <span className="lp-gradient-text">NEXT INTERVIEW</span>
//           </h1>
//           <p className="lp-typed">{typed}<span className="lp-cursor" /></p>

//           <p className="lp-desc">
//             Upload your resume, target any job description, and get an ATS
//             match reading, technical &amp; behavioral question banks, and a
//             day-by-day flight plan to prep — all instrumented by AI.
//           </p>

//           <div className="lp-panelrow">
//             {[
//               ["ATS", "Match Reading"],
//               ["Q-BANK", "Question Sets"],
//               ["ROADMAP", "Prep Sequence"],
//               ["RESUME", "Auto-Tuned"],
//             ].map(([code, label], i) => (
//               <div className="lp-chip" key={code} style={{ "--d": i }}>
//                 <span className="lp-chip__code">{code}</span>
//                 <span className="lp-chip__label">{label}</span>
//                 <span className="lp-chip__light" />
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>

//       <style>{LP_STYLES}</style>
//     </main>
//   );
// };

// const LP_STYLES = `
// *{box-sizing:border-box;}
// html,body,#root{height:100%;}
// .lp-shell{
//   --amber:#3d8bff; --crimson:#ff4d4d; --cyan:#3fd0ff;
//   --bg:#070b16; --panel:#0e1526; --panel2:#121a2e;
//   --line:rgba(61,139,255,.16); --text:#f4ede1; --muted:#9a8f7d;
//   position:relative;min-height:100vh;min-height:100dvh;background:var(--bg);color:var(--text);
//   font-family:'Inter',system-ui,sans-serif;overflow:hidden;padding:0;
// }
// .lp-bg{position:absolute;inset:0;z-index:0;overflow:hidden;}
// .lp-grid{position:absolute;inset:-20%;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(ellipse at 50% 20%,black 0%,transparent 65%);animation:lpDrift 30s linear infinite;}
// @keyframes lpDrift{0%{transform:translateY(0)}100%{transform:translateY(52px)}}
// .lp-horizon{position:absolute;left:0;right:0;bottom:-2px;height:40%;background:radial-gradient(ellipse at 50% 100%, rgba(255,77,77,.18), transparent 70%);}
// .lp-star{position:absolute;border-radius:50%;background:var(--amber);opacity:.7;animation:lpTwinkle 3s ease-in-out infinite;}
// .lp-star1{width:3px;height:3px;top:12%;left:18%;}
// .lp-star2{width:2px;height:2px;top:30%;left:74%;animation-delay:1s;}
// .lp-star3{width:4px;height:4px;top:65%;left:50%;animation-delay:2s;background:var(--cyan);}
// @keyframes lpTwinkle{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.3)}}
// .lp-scanline{position:absolute;left:0;right:0;height:2px;top:0;background:linear-gradient(90deg,transparent,rgba(61,139,255,.5),transparent);animation:lpScanFall 6s linear infinite;}
// @keyframes lpScanFall{0%{top:0;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}

// .lp-topbar{position:relative;z-index:2;display:flex;gap:26px;padding:14px 28px;font-family:'Roboto Mono',monospace;font-size:11px;letter-spacing:.06em;color:var(--muted);border-bottom:1px solid var(--line);}
// .lp-topbar__item b{color:var(--amber);font-weight:700;}
// .lp-topbar__clock::before{content:"TIME // LOCAL";}

// .lp-wrap{position:relative;z-index:1;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.25fr .95fr;min-height:calc(100vh - 46px);min-height:calc(100dvh - 46px);}
// /* desktop: brief on the left, console on the right, regardless of DOM order */
// .lp-brief{order:1;}
// .lp-console{order:2;}

// .lp-corner{position:absolute;width:26px;height:26px;border-color:var(--amber);opacity:.7;}
// .lp-corner--tl{top:14px;left:14px;border-top:2px solid;border-left:2px solid;}
// .lp-corner--bl{bottom:14px;left:14px;border-bottom:2px solid;border-left:2px solid;}
// .lp-corner--tr{top:14px;right:14px;border-top:2px solid;border-right:2px solid;}
// .lp-corner--br{bottom:14px;right:14px;border-bottom:2px solid;border-right:2px solid;}

// .lp-brief{position:relative;padding:68px 64px;display:flex;flex-direction:column;justify-content:center;border-right:1px solid var(--line);}
// .lp-callsign{display:flex;align-items:center;gap:14px;margin-bottom:30px;animation:lpRise .7s both;}
// @keyframes lpRise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
// .lp-badge-emblem{position:relative;width:56px;height:56px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#1a1006;background:linear-gradient(135deg,var(--amber),#1e4fa8);flex-shrink:0;}
// .lp-badge-emblem__ring{position:absolute;inset:-4px;border-radius:12px;border:1px dashed rgba(61,139,255,.5);animation:lpSpin 8s linear infinite;}
// @keyframes lpSpin{to{transform:rotate(360deg)}}
// .lp-callsign h3{margin:0;font-family:'Space Grotesk',sans-serif;font-size:22px;letter-spacing:.02em;}
// .lp-callsign h3 span{color:var(--amber);}
// .lp-callsign > div > span{font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.1em;color:var(--muted);}

// .lp-eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:'Roboto Mono',monospace;font-size:11.5px;letter-spacing:.08em;color:var(--crimson);background:rgba(255,77,77,.08);border:1px solid rgba(255,77,77,.3);padding:6px 14px;border-radius:3px;margin-bottom:22px;width:fit-content;animation:lpRise .7s .05s both;}
// .lp-eyebrow__blink{width:7px;height:7px;background:var(--crimson);border-radius:50%;animation:lpBlink 1s steps(1) infinite;}
// @keyframes lpBlink{0%,49%{opacity:1}50%,100%{opacity:.15}}

// .lp-brief h1{font-family:'Space Grotesk',sans-serif;font-size:54px;line-height:1.08;font-weight:700;margin:0;letter-spacing:-.01em;animation:lpRise .7s .1s both;}
// .lp-gradient-text{background:linear-gradient(100deg,var(--amber),#a9c9ff,var(--crimson),var(--amber));background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:lpShift 5s ease infinite;}
// @keyframes lpShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
// .lp-typed{font-family:'Roboto Mono',monospace;color:var(--amber);font-size:14px;letter-spacing:.05em;margin:18px 0 20px;min-height:18px;}
// .lp-cursor{display:inline-block;width:8px;height:14px;background:var(--amber);margin-left:2px;vertical-align:middle;animation:lpBlink .8s steps(1) infinite;}
// .lp-desc{color:var(--muted);font-size:15.5px;line-height:1.8;max-width:520px;animation:lpRise .7s .15s both;}

// .lp-panelrow{margin-top:36px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
// .lp-chip{position:relative;padding:14px 16px;background:var(--panel);border:1px solid var(--line);border-radius:6px;animation:lpRise .5s both;animation-delay:calc(var(--d)*.08s + .2s);transition:border-color .25s,transform .25s;}
// .lp-chip:hover{border-color:var(--amber);transform:translateY(-3px);}
// .lp-chip__code{display:block;font-family:'Roboto Mono',monospace;font-size:11px;letter-spacing:.1em;color:var(--amber);font-weight:700;}
// .lp-chip__label{display:block;font-size:13px;color:var(--text);margin-top:5px;}
// .lp-chip__light{position:absolute;top:12px;right:12px;width:6px;height:6px;border-radius:50%;background:var(--cyan);box-shadow:0 0 6px var(--cyan);animation:lpBlink 2.4s steps(1) infinite;}

// .lp-console{position:relative;padding:68px 56px;display:flex;flex-direction:column;justify-content:center;background:linear-gradient(180deg,var(--panel),var(--bg));}
// .lp-console__head{animation:lpRise .7s both;}
// .lp-tag{display:inline-block;font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.14em;color:var(--amber);border:1px solid rgba(61,139,255,.35);padding:5px 12px;border-radius:3px;margin-bottom:18px;}
// .lp-console__head h2{font-family:'Space Grotesk',sans-serif;font-size:34px;line-height:1.15;margin:0 0 14px;font-weight:700;}
// .lp-console__head p{color:var(--muted);font-size:14.5px;line-height:1.7;margin:0 0 30px;}

// .lp-ignite{position:relative;width:100%;display:flex;align-items:center;gap:12px;padding:17px 20px;border:1px solid rgba(61,139,255,.4);background:linear-gradient(135deg,#2a1c0a,#1b1209);color:var(--text);font-weight:700;font-size:15px;border-radius:6px;cursor:pointer;overflow:hidden;transition:transform .2s,box-shadow .3s,border-color .2s;letter-spacing:.02em;}
// .lp-ignite:hover{transform:translateY(-3px);box-shadow:0 14px 30px -10px rgba(61,139,255,.35);border-color:var(--amber);}
// .lp-ignite__bolt svg{background:white;border-radius:50%;padding:3px;display:block;}
// .lp-ignite__sweep{position:absolute;top:0;left:-60%;width:50%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.16),transparent);transform:skewX(-20deg);}
// .lp-ignite:hover .lp-ignite__sweep{animation:lpSweep .9s ease;}
// @keyframes lpSweep{from{left:-60%}to{left:130%}}
// .lp-ignite__arrow{margin-left:auto;font-size:20px;color:var(--amber);transition:transform .25s;}
// .lp-ignite:hover .lp-ignite__arrow{transform:translateX(5px);}

// .lp-statuslights{display:flex;gap:18px;margin-top:22px;flex-wrap:wrap;}
// .lp-light{display:flex;align-items:center;gap:7px;font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.08em;color:var(--muted);animation:lpRise .5s both;animation-delay:calc(var(--d)*.1s + .3s);}
// .lp-light__dot{width:7px;height:7px;border-radius:50%;background:var(--cyan);box-shadow:0 0 8px var(--cyan);animation:lpBlink 1.6s steps(1) infinite;animation-delay:calc(var(--d)*.3s);}

// .lp-divider{display:flex;align-items:center;gap:14px;margin:34px 0 22px;color:var(--muted);font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.14em;}
// .lp-divider::before,.lp-divider::after{content:"";flex:1;height:1px;background:var(--line);}

// .lp-checklist{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px;}
// .lp-checklist li{display:flex;align-items:center;gap:10px;font-size:13.5px;color:var(--text);animation:lpRise .5s both;animation-delay:calc(var(--d)*.08s + .4s);}
// .lp-checklist__tick{color:var(--amber);font-weight:700;}

// .lp-footer{margin-top:30px;font-size:12px;color:var(--muted);line-height:1.7;}
// .lp-footer strong{color:var(--amber);cursor:pointer;}

// .lp-loading{min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:var(--bg,#070b16);color:#f4ede1;font-family:'Inter',sans-serif;}
// .lp-loading__radar{position:relative;width:90px;height:90px;border-radius:50%;border:1px solid rgba(61,139,255,.3);}
// .lp-loading__ring{position:absolute;inset:16px;border-radius:50%;border:1px solid rgba(61,139,255,.25);}
// .lp-loading__sweep{position:absolute;inset:0;border-radius:50%;background:conic-gradient(rgba(61,139,255,.65),transparent 40%);animation:lpSpin 1.1s linear infinite;}
// .lp-loading h1{font-family:'Space Grotesk',sans-serif;font-size:20px;letter-spacing:.03em;}
// .lp-dotdotdot i{font-style:normal;animation:lpBlink 1.2s steps(1) infinite;}
// .lp-dotdotdot i:nth-child(2){animation-delay:.15s;}
// .lp-dotdotdot i:nth-child(3){animation-delay:.3s;}
// .lp-loading p{color:#9a8f7d;font-family:'Roboto Mono',monospace;font-size:12px;letter-spacing:.06em;}

// @media(max-width:1080px){
//   .lp-wrap{grid-template-columns:1fr;}
//   .lp-brief{border-right:none;border-bottom:1px solid var(--line);}
//   .lp-brief h1{font-size:42px;}
// }

// /* ===== MOBILE: console (login) comes first and fits without scrolling ===== */
// @media(max-width:600px){
//   .lp-shell{overflow-y:auto;}
//   .lp-topbar{padding:8px 14px;gap:14px;font-size:9.5px;}
//   .lp-topbar__item:nth-child(2){display:none;} /* MODE ticker not essential on phone */
//   .lp-wrap{grid-template-columns:1fr;min-height:auto;}

//   /* reorder: console (login) first, brief content after — reachable with one small scroll */
//   .lp-console{order:1;padding:20px 20px 22px;border-bottom:1px solid var(--line);}
//   .lp-brief{order:2;padding:22px 20px 36px;border-bottom:none;}

//   .lp-console__head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px;}
//   .lp-tag{margin-bottom:0;font-size:9.5px;padding:4px 9px;}
//   .lp-console__head h2{font-size:20px;line-height:1.2;margin:0;flex-basis:100%;order:2;}
//   .lp-console__head p{display:none;} /* trimmed on phone to keep the button in view immediately */

//   .lp-ignite{padding:14px 16px;font-size:13.5px;}
//   .lp-statuslights{margin-top:14px;gap:12px;}
//   .lp-light{font-size:9px;}
//   .lp-divider{margin:18px 0 14px;}
//   .lp-checklist{gap:8px;}
//   .lp-checklist li{font-size:12.5px;}

//   .lp-corner{width:16px;height:16px;}

//   .lp-callsign{margin-bottom:16px;}
//   .lp-badge-emblem{width:42px;height:42px;}
//   .lp-callsign h3{font-size:17px;}
//   .lp-eyebrow{font-size:10px;padding:5px 11px;margin-bottom:14px;}
//   .lp-brief h1{font-size:30px;}
//   .lp-typed{font-size:12px;margin:12px 0 14px;}
//   .lp-desc{font-size:13.5px;line-height:1.65;}
//   .lp-panelrow{margin-top:22px;gap:10px;}
//   .lp-chip{padding:11px 13px;}
// }

// @media (prefers-reduced-motion: reduce){.lp-grid,.lp-star,.lp-scanline,.lp-badge-emblem__ring,.lp-eyebrow__blink,.lp-cursor,.lp-chip__light,.lp-light__dot,.lp-loading__sweep,.lp-dotdotdot i{animation:none !important;}}
// `;

// export default Login;










// import React, { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";

// const SEQUENCE = ["AUTH", "IDENTITY", "PROFILE VAULT", "CLEARANCE"];

// const Login = () => {
//   const { loading } = useAuth();
//   const [seqIndex, setSeqIndex] = useState(0);
//   const [typed, setTyped] = useState("");

//   const handleGoogleLogin = () => {
//     window.location.href = "https://interview-iq-ppv9.onrender.com/api/auth/google";
//   };

//   // cycles through a small "system check" ticker
//   useEffect(() => {
//     const id = setInterval(() => setSeqIndex((i) => (i + 1) % SEQUENCE.length), 1800);
//     return () => clearInterval(id);
//   }, []);

//   // typewriter for the mission line
//   useEffect(() => {
//     const full = "READY FOR DEPARTURE.";
//     let i = 0;
//     setTyped("");
//     const id = setInterval(() => {
//       i++;
//       setTyped(full.slice(0, i));
//       if (i >= full.length) clearInterval(id);
//     }, 55);
//     return () => clearInterval(id);
//   }, []);

//   if (loading) {
//     return (
//       <main className="lp-loading">
//         <div className="lp-loading__radar">
//           <span className="lp-loading__sweep" />
//           <span className="lp-loading__ring" />
//         </div>
//         <h1>ESTABLISHING UPLINK<span className="lp-dotdotdot"><i>.</i><i>.</i><i>.</i></span></h1>
//         <p>Authenticating with Google Systems</p>
//         <style>{LP_STYLES}</style>
//       </main>
//     );
//   }

//   return (
//     <main className="lp-shell">
//       <div className="lp-bg">
//         <div className="lp-grid" />
//         <div className="lp-horizon" />
//         <div className="lp-star lp-star1" />
//         <div className="lp-star lp-star2" />
//         <div className="lp-star lp-star3" />
//         <div className="lp-scanline" />
//       </div>

//       <div className="lp-topbar">
//         <span className="lp-topbar__item">SYS // <b>ONLINE</b></span>
//         <span className="lp-topbar__item">MODE // <b>{SEQUENCE[seqIndex]}</b></span>
//         <span className="lp-topbar__item lp-topbar__clock" />
//       </div>

//       <div className="lp-wrap">
//         {/* LEFT: MISSION BRIEF */}
//         <section className="lp-brief">
//           <div className="lp-corner lp-corner--tl" />
//           <div className="lp-corner lp-corner--bl" />

//           <div className="lp-callsign">
//             <span className="lp-badge-emblem">
//               <span className="lp-badge-emblem__ring" />
//               <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M12 2 L15 9 L22 9.5 L16.5 14 L18.5 21 L12 17 L5.5 21 L7.5 14 L2 9.5 L9 9 Z" />
//               </svg>
//             </span>
//             <div>
//               <h3>INTERVIEW_IQ&nbsp;<span>AI</span></h3>
//               <span>FLIGHT DECK · INTERVIEW OPS</span>
//             </div>
//           </div>

//           <span className="lp-eyebrow">
//             <span className="lp-eyebrow__blink" />
//             CALLSIGN AWAITING CLEARANCE
//           </span>

//           <h1>
//             LAUNCH YOUR
//             <br />
//             <span className="lp-gradient-text">NEXT INTERVIEW</span>
//           </h1>
//           <p className="lp-typed">{typed}<span className="lp-cursor" /></p>

//           <p className="lp-desc">
//             Upload your resume, target any job description, and get an ATS
//             match reading, technical &amp; behavioral question banks, and a
//             day-by-day flight plan to prep — all instrumented by AI.
//           </p>

//           <div className="lp-panelrow">
//             {[
//               ["ATS", "Match Reading"],
//               ["Q-BANK", "Question Sets"],
//               ["ROADMAP", "Prep Sequence"],
//               ["RESUME", "Auto-Tuned"],
//             ].map(([code, label], i) => (
//               <div className="lp-chip" key={code} style={{ "--d": i }}>
//                 <span className="lp-chip__code">{code}</span>
//                 <span className="lp-chip__label">{label}</span>
//                 <span className="lp-chip__light" />
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* RIGHT: IGNITION CONSOLE */}
//         <section className="lp-console">
//           <div className="lp-corner lp-corner--tr" />
//           <div className="lp-corner lp-corner--br" />

//           <div className="lp-console__head">
//             <span className="lp-tag">ACCESS PANEL</span>
//             <h2>Ignition<br />Authorization</h2>
//             <p>
//               We verify identity through your Google account to spin up a
//               secure InterviewIQ profile. No password stored, no password needed.
//             </p>
//           </div>

//           <button className="lp-ignite" onClick={handleGoogleLogin}>
//             <span className="lp-ignite__sweep" />
//             <span className="lp-ignite__bolt">
//               <svg width="20" height="20" viewBox="0 0 48 48">
//                 <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.61l6.86-6.86C35.9 2.39 30.37 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.42 13.37 17.72 9.5 24 9.5z" />
//                 <path fill="#4285F4" d="M46.98 24.55c0-1.57-.14-3.09-.39-4.55H24v9.1h12.94c-.56 3-2.25 5.55-4.8 7.26l7.73 6c4.52-4.17 7.11-10.31 7.11-17.81z" />
//                 <path fill="#FBBC05" d="M10.54 28.58A14.5 14.5 0 019.5 24c0-1.59.27-3.13.75-4.58l-7.98-6.2A24.03 24.03 0 000 24c0 3.88.93 7.54 2.57 10.78l7.97-6.2z" />
//                 <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.89-5.81l-7.73-6c-2.15 1.44-4.89 2.31-8.16 2.31-6.28 0-11.58-3.87-13.46-9.32l-7.97 6.2C6.5 42.62 14.62 48 24 48z" />
//               </svg>
//             </span>
//             <span>CONTINUE WITH GOOGLE</span>
//             <span className="lp-ignite__arrow">›</span>
//           </button>

//           <div className="lp-statuslights">
//             {["ARMED", "FUEL", "NAV-LOCK", "COMMS"].map((s, i) => (
//               <div className="lp-light" key={s} style={{ "--d": i }}>
//                 <span className="lp-light__dot" />
//                 {s}
//               </div>
//             ))}
//           </div>

//           <div className="lp-divider"><span>SECURE CHANNEL</span></div>

//           <ul className="lp-checklist">
//             {[
//               "No password required",
//               "Profile auto-provisioned on first login",
//               "Encrypted session, revocable anytime",
//               "Verified Google accounts only",
//             ].map((t, i) => (
//               <li key={t} style={{ "--d": i }}>
//                 <span className="lp-checklist__tick">✓</span>
//                 {t}
//               </li>
//             ))}
//           </ul>

//         </section>
//       </div>

//       <style>{LP_STYLES}</style>
//     </main>
//   );
// };

// const LP_STYLES = `
// *{box-sizing:border-box;}
// .lp-shell{
//   --amber:#3d8bff; --crimson:#ff4d4d; --cyan:#3fd0ff;
//   --bg:#070b16; --panel:#0e1526; --panel2:#121a2e;
//   --line:rgba(61,139,255,.16); --text:#f4ede1; --muted:#9a8f7d;
//   position:relative;min-height:100vh;background:var(--bg);color:var(--text);
//   font-family:'Inter',system-ui,sans-serif;overflow:hidden;padding:0;
// }
// .lp-bg{position:absolute;inset:0;z-index:0;overflow:hidden;}
// .lp-grid{position:absolute;inset:-20%;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(ellipse at 50% 20%,black 0%,transparent 65%);animation:lpDrift 30s linear infinite;}
// @keyframes lpDrift{0%{transform:translateY(0)}100%{transform:translateY(52px)}}
// .lp-horizon{position:absolute;left:0;right:0;bottom:-2px;height:40%;background:radial-gradient(ellipse at 50% 100%, rgba(255,77,77,.18), transparent 70%);}
// .lp-star{position:absolute;border-radius:50%;background:var(--amber);opacity:.7;animation:lpTwinkle 3s ease-in-out infinite;}
// .lp-star1{width:3px;height:3px;top:12%;left:18%;}
// .lp-star2{width:2px;height:2px;top:30%;left:74%;animation-delay:1s;}
// .lp-star3{width:4px;height:4px;top:65%;left:50%;animation-delay:2s;background:var(--cyan);}
// @keyframes lpTwinkle{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.3)}}
// .lp-scanline{position:absolute;left:0;right:0;height:2px;top:0;background:linear-gradient(90deg,transparent,rgba(61,139,255,.5),transparent);animation:lpScanFall 6s linear infinite;}
// @keyframes lpScanFall{0%{top:0;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}

// .lp-topbar{position:relative;z-index:2;display:flex;gap:26px;padding:14px 28px;font-family:'Roboto Mono',monospace;font-size:11px;letter-spacing:.06em;color:var(--muted);border-bottom:1px solid var(--line);}
// .lp-topbar__item b{color:var(--amber);font-weight:700;}
// .lp-topbar__clock::before{content:"TIME // LOCAL";}

// .lp-wrap{position:relative;z-index:1;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.25fr .95fr;min-height:calc(100vh - 46px);}

// .lp-corner{position:absolute;width:26px;height:26px;border-color:var(--amber);opacity:.7;}
// .lp-corner--tl{top:14px;left:14px;border-top:2px solid;border-left:2px solid;}
// .lp-corner--bl{bottom:14px;left:14px;border-bottom:2px solid;border-left:2px solid;}
// .lp-corner--tr{top:14px;right:14px;border-top:2px solid;border-right:2px solid;}
// .lp-corner--br{bottom:14px;right:14px;border-bottom:2px solid;border-right:2px solid;}

// .lp-brief{position:relative;padding:68px 64px;display:flex;flex-direction:column;justify-content:center;border-right:1px solid var(--line);}
// .lp-callsign{display:flex;align-items:center;gap:14px;margin-bottom:30px;animation:lpRise .7s both;}
// @keyframes lpRise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
// .lp-badge-emblem{position:relative;width:56px;height:56px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#1a1006;background:linear-gradient(135deg,var(--amber),#1e4fa8);flex-shrink:0;}
// .lp-badge-emblem__ring{position:absolute;inset:-4px;border-radius:12px;border:1px dashed rgba(61,139,255,.5);animation:lpSpin 8s linear infinite;}
// @keyframes lpSpin{to{transform:rotate(360deg)}}
// .lp-callsign h3{margin:0;font-family:'Space Grotesk',sans-serif;font-size:22px;letter-spacing:.02em;}
// .lp-callsign h3 span{color:var(--amber);}
// .lp-callsign > div > span{font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.1em;color:var(--muted);}

// .lp-eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:'Roboto Mono',monospace;font-size:11.5px;letter-spacing:.08em;color:var(--crimson);background:rgba(255,77,77,.08);border:1px solid rgba(255,77,77,.3);padding:6px 14px;border-radius:3px;margin-bottom:22px;width:fit-content;animation:lpRise .7s .05s both;}
// .lp-eyebrow__blink{width:7px;height:7px;background:var(--crimson);border-radius:50%;animation:lpBlink 1s steps(1) infinite;}
// @keyframes lpBlink{0%,49%{opacity:1}50%,100%{opacity:.15}}

// .lp-brief h1{font-family:'Space Grotesk',sans-serif;font-size:54px;line-height:1.08;font-weight:700;margin:0;letter-spacing:-.01em;animation:lpRise .7s .1s both;}
// .lp-gradient-text{background:linear-gradient(100deg,var(--amber),#a9c9ff,var(--crimson),var(--amber));background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:lpShift 5s ease infinite;}
// @keyframes lpShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
// .lp-typed{font-family:'Roboto Mono',monospace;color:var(--amber);font-size:14px;letter-spacing:.05em;margin:18px 0 20px;min-height:18px;}
// .lp-cursor{display:inline-block;width:8px;height:14px;background:var(--amber);margin-left:2px;vertical-align:middle;animation:lpBlink .8s steps(1) infinite;}
// .lp-desc{color:var(--muted);font-size:15.5px;line-height:1.8;max-width:520px;animation:lpRise .7s .15s both;}

// .lp-panelrow{margin-top:36px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
// .lp-chip{position:relative;padding:14px 16px;background:var(--panel);border:1px solid var(--line);border-radius:6px;animation:lpRise .5s both;animation-delay:calc(var(--d)*.08s + .2s);transition:border-color .25s,transform .25s;}
// .lp-chip:hover{border-color:var(--amber);transform:translateY(-3px);}
// .lp-chip__code{display:block;font-family:'Roboto Mono',monospace;font-size:11px;letter-spacing:.1em;color:var(--amber);font-weight:700;}
// .lp-chip__label{display:block;font-size:13px;color:var(--text);margin-top:5px;}
// .lp-chip__light{position:absolute;top:12px;right:12px;width:6px;height:6px;border-radius:50%;background:var(--cyan);box-shadow:0 0 6px var(--cyan);animation:lpBlink 2.4s steps(1) infinite;}

// .lp-console{position:relative;padding:68px 56px;display:flex;flex-direction:column;justify-content:center;background:linear-gradient(180deg,var(--panel),var(--bg));}
// .lp-console__head{animation:lpRise .7s both;}
// .lp-tag{display:inline-block;font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.14em;color:var(--amber);border:1px solid rgba(61,139,255,.35);padding:5px 12px;border-radius:3px;margin-bottom:18px;}
// .lp-console__head h2{font-family:'Space Grotesk',sans-serif;font-size:34px;line-height:1.15;margin:0 0 14px;font-weight:700;}
// .lp-console__head p{color:var(--muted);font-size:14.5px;line-height:1.7;margin:0 0 30px;}

// .lp-ignite{position:relative;width:100%;display:flex;align-items:center;gap:12px;padding:17px 20px;border:1px solid rgba(61,139,255,.4);background:linear-gradient(135deg,#2a1c0a,#1b1209);color:var(--text);font-weight:700;font-size:15px;border-radius:6px;cursor:pointer;overflow:hidden;transition:transform .2s,box-shadow .3s,border-color .2s;letter-spacing:.02em;}
// .lp-ignite:hover{transform:translateY(-3px);box-shadow:0 14px 30px -10px rgba(61,139,255,.35);border-color:var(--amber);}
// .lp-ignite__bolt svg{background:white;border-radius:50%;padding:3px;display:block;}
// .lp-ignite__sweep{position:absolute;top:0;left:-60%;width:50%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.16),transparent);transform:skewX(-20deg);}
// .lp-ignite:hover .lp-ignite__sweep{animation:lpSweep .9s ease;}
// @keyframes lpSweep{from{left:-60%}to{left:130%}}
// .lp-ignite__arrow{margin-left:auto;font-size:20px;color:var(--amber);transition:transform .25s;}
// .lp-ignite:hover .lp-ignite__arrow{transform:translateX(5px);}

// .lp-statuslights{display:flex;gap:18px;margin-top:22px;flex-wrap:wrap;}
// .lp-light{display:flex;align-items:center;gap:7px;font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.08em;color:var(--muted);animation:lpRise .5s both;animation-delay:calc(var(--d)*.1s + .3s);}
// .lp-light__dot{width:7px;height:7px;border-radius:50%;background:var(--cyan);box-shadow:0 0 8px var(--cyan);animation:lpBlink 1.6s steps(1) infinite;animation-delay:calc(var(--d)*.3s);}

// .lp-divider{display:flex;align-items:center;gap:14px;margin:34px 0 22px;color:var(--muted);font-family:'Roboto Mono',monospace;font-size:10.5px;letter-spacing:.14em;}
// .lp-divider::before,.lp-divider::after{content:"";flex:1;height:1px;background:var(--line);}

// .lp-checklist{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px;}
// .lp-checklist li{display:flex;align-items:center;gap:10px;font-size:13.5px;color:var(--text);animation:lpRise .5s both;animation-delay:calc(var(--d)*.08s + .4s);}
// .lp-checklist__tick{color:var(--amber);font-weight:700;}

// .lp-footer{margin-top:30px;font-size:12px;color:var(--muted);line-height:1.7;}
// .lp-footer strong{color:var(--amber);cursor:pointer;}

// .lp-loading{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:var(--bg,#070b16);color:#f4ede1;font-family:'Inter',sans-serif;}
// .lp-loading__radar{position:relative;width:90px;height:90px;border-radius:50%;border:1px solid rgba(61,139,255,.3);}
// .lp-loading__ring{position:absolute;inset:16px;border-radius:50%;border:1px solid rgba(61,139,255,.25);}
// .lp-loading__sweep{position:absolute;inset:0;border-radius:50%;background:conic-gradient(rgba(61,139,255,.65),transparent 40%);animation:lpSpin 1.1s linear infinite;}
// .lp-loading h1{font-family:'Space Grotesk',sans-serif;font-size:20px;letter-spacing:.03em;}
// .lp-dotdotdot i{font-style:normal;animation:lpBlink 1.2s steps(1) infinite;}
// .lp-dotdotdot i:nth-child(2){animation-delay:.15s;}
// .lp-dotdotdot i:nth-child(3){animation-delay:.3s;}
// .lp-loading p{color:#9a8f7d;font-family:'Roboto Mono',monospace;font-size:12px;letter-spacing:.06em;}

// @media(max-width:1080px){.lp-wrap{grid-template-columns:1fr;}.lp-brief{border-right:none;border-bottom:1px solid var(--line);}.lp-brief h1{font-size:42px;}}
// @media(max-width:600px){.lp-brief,.lp-console{padding:44px 26px;}.lp-brief h1{font-size:34px;}.lp-panelrow{grid-template-columns:1fr;}.lp-topbar{flex-wrap:wrap;gap:10px;padding:12px 18px;}}
// @media (prefers-reduced-motion: reduce){.lp-grid,.lp-star,.lp-scanline,.lp-badge-emblem__ring,.lp-eyebrow__blink,.lp-cursor,.lp-chip__light,.lp-light__dot,.lp-loading__sweep,.lp-dotdotdot i{animation:none !important;}}
// `;

// export default Login;