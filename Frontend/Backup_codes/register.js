// // import React ,{useState} from 'react'
// // import {useNavigate,Link} from 'react-router'
// // import  {useAuth} from '../hooks/useAuth'
// // const Register = () => {
// //   const navigate = useNavigate();
// //   const [username,setUsername] = React.useState("")
// //   const [email,setEmail] = React.useState("")
// //   const [password,setPassword] = React.useState("")

// //   const {loading,handleRegister} = useAuth()

// //   const handleSubmit = async (e)=>{
// //   e.preventDefault();
// //   await handleRegister(username,email,password)
// //   navigate("/login")
// // }

// // if(loading){
// //   return (<main><h1>Loading.....</h1></main>)
// // }

// //   return (
// //      <main>
// //       <div className="container">
// //         <div className="form-container">
// //           <h1>Register</h1>

// //           <form onSubmit={handleSubmit}>
// //             <div className="input-group">
// //               <label htmlFor="username">Username</label>
// //               <input
// //               onChange={(e)=>{setUsername(e.target.value)}}
// //                 type="text"
// //                 id="username"
// //                 name="username"
// //                 placeholder="Enter username"
// //               />
// //             </div>
// //             <div className="input-group">
// //               <label htmlFor="email">Email</label>
// //               <input
// //               onChange={(e)=>{setEmail(e.target.value)}}
// //                 type="email"
// //                 id="email"
// //                 name="email"
// //                 placeholder="Enter email address"
// //               />
// //             </div>

// //             <div className="input-group">
// //               <label htmlFor="password">Password</label>
// //               <input
// //               onChange={(e)=>{setPassword(e.target.value)}}
// //                 type="password"
// //                 id="password"
// //                 placeholder="Enter Password"
// //               />
// //             </div>

// //             <button className="button primary-button" type="submit">
// //               Register
// //             </button>
// //           </form>
// //           <p>Already have an account? <Link to ={"/login"}>Login</Link></p>
// //         </div>
// //       </div>
// //     </main>
// //   )
// // }

// // export default Register


// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router'
// import { useAuth } from '../hooks/useAuth'

// const getStrength = (pw) => {
//   let score = 0
//   if (pw.length >= 6) score++
//   if (pw.length >= 10) score++
//   if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++
//   if (/[^A-Za-z0-9]/.test(pw)) score++
//   return Math.min(score, 4)
// }
// const STRENGTH_LABEL = ['Too short', 'Weak', 'Okay', 'Strong', 'Excellent']

// const Register = () => {
//   const navigate = useNavigate()
//   const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [focusField, setFocusField] = useState(null)
//   const { loading, handleRegister } = useAuth()

//   const strength = getStrength(password)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     await handleRegister(username, email, password)
//     navigate("/login")
//   }

//   if (loading) {
//     return (
//       <main className="ax-loading">
//         <div className="ax-loading__ring" />
//         <h1>Creating your account…</h1>
//         <style>{AX_STYLES}</style>
//       </main>
//     )
//   }

//   return (
//     <main className="ax-shell">
//       <div className="ax-wrap">

//         {/* Brand / Signature Panel */}
//         <section className="ax-brand">
//           <div className="ax-brand__glow" />
//           <div className="ax-brand__content">
//             <div className="ax-logo">
//               <span className="ax-logo__dot" />
//               PrepPilot
//             </div>
//             <h1>Your next offer<br />starts here.</h1>
//             <p>Create an account and get a tailored interview plan in minutes.</p>

//             <div className="ax-wave" aria-hidden="true">
//               {Array.from({ length: 24 }).map((_, i) => (
//                 <span key={i} className="ax-wave__bar" style={{ '--i': i }} />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Form Panel */}
//         <section className="ax-panel">
//           <div className="ax-panel__inner">
//             <p className="ax-eyebrow">Get started</p>
//             <h2>Create your account</h2>

//             <form onSubmit={handleSubmit} className="ax-form">
//               <div className={`ax-field ${focusField === 'username' || username ? 'ax-field--active' : ''}`}>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={username}
//                   autoComplete="username"
//                   onFocus={() => setFocusField('username')}
//                   onBlur={() => setFocusField(null)}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//                 <label htmlFor="username">Username</label>
//                 <span className="ax-field__line" />
//               </div>

//               <div className={`ax-field ${focusField === 'email' || email ? 'ax-field--active' : ''}`}>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={email}
//                   autoComplete="email"
//                   onFocus={() => setFocusField('email')}
//                   onBlur={() => setFocusField(null)}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <label htmlFor="email">Email address</label>
//                 <span className="ax-field__line" />
//               </div>

//               <div className={`ax-field ${focusField === 'password' || password ? 'ax-field--active' : ''}`}>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="password"
//                   name="password"
//                   value={password}
//                   autoComplete="new-password"
//                   onFocus={() => setFocusField('password')}
//                   onBlur={() => setFocusField(null)}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <label htmlFor="password">Password</label>
//                 <span className="ax-field__line" />
//                 <button
//                   type="button"
//                   className="ax-field__toggle"
//                   onClick={() => setShowPassword(s => !s)}
//                   aria-label={showPassword ? 'Hide password' : 'Show password'}
//                 >
//                   {showPassword ? (
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.86 21.86 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.86 21.86 0 0 1-3.22 4.53M14.12 14.12a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
//                   ) : (
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
//                   )}
//                 </button>
//               </div>

//               {password && (
//                 <div className="ax-strength">
//                   <div className="ax-strength__bars">
//                     {[0, 1, 2, 3].map(i => (
//                       <span key={i} className={`ax-strength__bar ${i < strength ? `ax-strength__bar--${strength}` : ''}`} />
//                     ))}
//                   </div>
//                   <span className="ax-strength__label">{STRENGTH_LABEL[strength]}</span>
//                 </div>
//               )}

//               <button type="submit" className="ax-submit">
//                 <span>Create account</span>
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
//               </button>
//             </form>

//             <p className="ax-switch">Already have an account? <Link to="/login">Login</Link></p>
//           </div>
//         </section>
//       </div>
//       <style>{AX_STYLES}</style>
//     </main>
//   )
// }

// const AX_STYLES = `
// .ax-shell{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0e14;font-family:'Inter',system-ui,sans-serif;padding:24px;box-sizing:border-box;}
// .ax-wrap{width:100%;max-width:920px;min-height:600px;display:grid;grid-template-columns:1fr 1fr;background:#0f141d;border-radius:20px;overflow:hidden;box-shadow:0 30px 80px -20px rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.06);}
// .ax-brand{position:relative;padding:48px 40px;display:flex;flex-direction:column;justify-content:center;overflow:hidden;background:radial-gradient(circle at 30% 20%,#132030,#0a0e14 65%);}
// .ax-brand__glow{position:absolute;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(0,217,181,.25),transparent 70%);top:-120px;left:-100px;animation:axFloat 9s ease-in-out infinite;filter:blur(10px);}
// @keyframes axFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,60px)}}
// .ax-brand__content{position:relative;z-index:1;animation:axRise .7s cubic-bezier(.2,.8,.2,1) both;}
// @keyframes axRise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
// .ax-logo{display:flex;align-items:center;gap:8px;color:#e7ecf3;font-family:'Space Grotesk',sans-serif;font-weight:600;letter-spacing:.02em;margin-bottom:40px;font-size:15px;}
// .ax-logo__dot{width:8px;height:8px;border-radius:50%;background:#00d9b5;box-shadow:0 0 12px #00d9b5;}
// .ax-brand h1{font-family:'Space Grotesk',sans-serif;font-size:34px;line-height:1.15;color:#f2f5f9;margin:0 0 14px;font-weight:600;}
// .ax-brand p{color:#8b96a5;font-size:15px;line-height:1.6;max-width:340px;margin:0 0 40px;}
// .ax-wave{display:flex;align-items:flex-end;gap:4px;height:48px;}
// .ax-wave__bar{width:4px;border-radius:3px;background:linear-gradient(180deg,#00d9b5,#0a4f45);height:20%;animation:axPulse 1.4s ease-in-out infinite;animation-delay:calc(var(--i) * 0.06s);}
// @keyframes axPulse{0%,100%{height:18%}50%{height:calc(20% + var(--i,0) * 1% + 30%)}}
// .ax-panel{padding:52px 48px;display:flex;align-items:center;background:#0f141d;}
// .ax-panel__inner{width:100%;animation:axRise .7s .1s cubic-bezier(.2,.8,.2,1) both;}
// .ax-eyebrow{color:#00d9b5;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;margin:0 0 8px;}
// .ax-panel h2{font-family:'Space Grotesk',sans-serif;color:#f2f5f9;font-size:24px;margin:0 0 28px;font-weight:600;}
// .ax-form{display:flex;flex-direction:column;gap:24px;}
// .ax-field{position:relative;}
// .ax-field input{width:100%;background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,.14);color:#e7ecf3;font-size:15px;padding:10px 34px 10px 2px;outline:none;box-sizing:border-box;transition:border-color .25s;}
// .ax-field label{position:absolute;left:2px;top:10px;color:#6b7684;font-size:15px;pointer-events:none;transition:all .22s cubic-bezier(.4,0,.2,1);}
// .ax-field--active label{top:-14px;font-size:11.5px;color:#00d9b5;letter-spacing:.03em;}
// .ax-field__line{position:absolute;left:0;bottom:0;height:2px;width:0;background:#00d9b5;box-shadow:0 0 10px rgba(0,217,181,.6);transition:width .3s cubic-bezier(.4,0,.2,1);}
// .ax-field input:focus ~ .ax-field__line{width:100%;}
// .ax-field__toggle{position:absolute;right:0;top:6px;background:none;border:none;color:#6b7684;cursor:pointer;padding:4px;display:flex;transition:color .2s;}
// .ax-field__toggle:hover{color:#00d9b5;}
// .ax-strength{display:flex;align-items:center;gap:10px;margin-top:-10px;animation:axRise .3s both;}
// .ax-strength__bars{display:flex;gap:4px;flex:1;}
// .ax-strength__bar{height:4px;flex:1;border-radius:2px;background:rgba(255,255,255,.1);transition:background .3s;}
// .ax-strength__bar--1{background:#e85c5c;}
// .ax-strength__bar--2{background:#e8b95c;}
// .ax-strength__bar--3{background:#5ce8a8;}
// .ax-strength__bar--4{background:#00d9b5;}
// .ax-strength__label{font-size:12px;color:#6b7684;white-space:nowrap;min-width:70px;text-align:right;}
// .ax-submit{margin-top:6px;display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#00d9b5,#00a68c);color:#06110f;font-weight:600;font-size:15px;border:none;border-radius:10px;padding:13px 20px;cursor:pointer;transition:transform .18s,box-shadow .25s;box-shadow:0 8px 20px -6px rgba(0,217,181,.5);}
// .ax-submit:hover{transform:translateY(-2px);box-shadow:0 12px 26px -6px rgba(0,217,181,.65);}
// .ax-submit:active{transform:translateY(0) scale(.98);}
// .ax-submit svg{transition:transform .25s;}
// .ax-submit:hover svg{transform:translateX(3px);}
// .ax-switch{margin-top:24px;color:#6b7684;font-size:14px;}
// .ax-switch a{color:#00d9b5;text-decoration:none;font-weight:600;}
// .ax-switch a:hover{text-decoration:underline;}
// .ax-loading{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;background:#0a0e14;color:#e7ecf3;font-family:'Inter',sans-serif;}
// .ax-loading__ring{width:40px;height:40px;border-radius:50%;border:3px solid rgba(0,217,181,.2);border-top-color:#00d9b5;animation:axSpin .8s linear infinite;}
// @keyframes axSpin{to{transform:rotate(360deg)}}
// @media (max-width:760px){.ax-wrap{grid-template-columns:1fr;}.ax-brand{padding:36px 28px;}.ax-brand h1{font-size:26px;}.ax-panel{padding:32px 28px;}}
// `

// export default Register