import { lazy, Suspense } from 'react';
import { NavLink, Navigate, Outlet, Route, Routes } from 'react-router';
import { people } from './data/people.js';
import PeopleLayout from './components/PeopleLayout.jsx';
import SimpleForm from './components/SimpleForm.jsx';
import Forum from './components/Forum.jsx';
const PersonDetail = lazy(() => import('./components/PersonDetail.jsx'));
function Shell() {
  return <><header className="top"><div><small>UNIVERSITY OF INFORMATION TECHNOLOGY · S3T</small><h1>Lab 4 · Full-Stack React 19</h1><p>Exercises 1.1–1.3 · Router, Context Form & REST API</p></div></header>
    <nav className="tabs" aria-label="Primary navigation"><NavLink end to="/people" className={({isActive})=>isActive?'active':''}>People directory</NavLink><NavLink to="/form" className={({isActive})=>isActive?'active':''}>Context form</NavLink><NavLink to="/forum" className={({isActive})=>isActive?'active':''}>Forum messages</NavLink></nav><main className="container"><Outlet /></main><footer>UIT · Lab 4 Exercise Demonstration · Student: Huỳnh Quốc Minh Thông · 22521432</footer></>;
}
function LoadingCard() { return <div className="panel skeleton" role="status" aria-live="polite" aria-busy="true"><div className="skeleton-line"/><div className="skeleton-line short"/><span>Loading detail…</span></div>; }
export default function App() { return <Routes><Route path="/" element={<Shell/>}><Route index element={<Navigate to="/people" replace/>}/><Route path="people" element={<PeopleLayout people={people}/> }><Route index element={<div className="panel"><h2>People directory</h2><p>Choose a person to open their profile. Direct URLs also work.</p></div>}/><Route path=":id" element={<Suspense fallback={<LoadingCard/>}><PersonDetail people={people}/></Suspense>}/></Route><Route path="form" element={<SimpleForm/>}/><Route path="forum" element={<Forum/>}/><Route path="*" element={<div role="alert" className="panel"><h2>404 — Page not found</h2><NavLink to="/people">Back to directory</NavLink></div>}/></Route></Routes>; }