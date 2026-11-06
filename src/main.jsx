import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, Bot, Boxes, BrainCircuit, Check, ChevronRight, Command, Cpu, Globe2, LayoutDashboard, LogOut, Menu, Play, Plus, Search, Settings2, ShieldCheck, Sparkles, Workflow, Zap } from 'lucide-react';
import './style.css';
import AuthGate from './AuthGate';

const initialAgents = [
  {name:'Research Agent', type:'Research & intelligence', status:'Active', color:'violet', icon:BrainCircuit, tasks:12},
  {name:'Workflow Agent', type:'Automation operations', status:'Active', color:'cyan', icon:Workflow, tasks:8},
  {name:'Content Agent', type:'Content generation', status:'Idle', color:'pink', icon:Sparkles, tasks:4},
];
const modules = [
  {name:'AI Agent Hub',desc:'Create, configure and orchestrate AI agents.',icon:Bot,color:'violet',tag:'CORE'},
  {name:'Automation Studio',desc:'Design repeatable workflows with visual logic.',icon:Workflow,color:'cyan',tag:'BUILD'},
  {name:'AI Content Factory',desc:'Plan and draft content across channels.',icon:Sparkles,color:'pink',tag:'CREATE'},
  {name:'Business Intelligence',desc:'Turn operational data into clear insights.',icon:Activity,color:'blue',tag:'ANALYZE'},
  {name:'Developer Hub',desc:'Manage integrations, keys and environments.',icon:Cpu,color:'green',tag:'DEV'},
  {name:'Cloud Workspace',desc:'Organize projects, assets and resources.',icon:Boxes,color:'orange',tag:'WORKSPACE'},
];
function App({user,onLogout}){
  const [active,setActive]=useState('Overview');
  const [agents,setAgents]=useState(initialAgents);
  const [query,setQuery]=useState('');
  const [notice,setNotice]=useState('');
  const [showAgent,setShowAgent]=useState(false);
  const [agentName,setAgentName]=useState('');
  const [running,setRunning]=useState(false);
  const [tasks,setTasks]=useState([{title:'Review workspace health',status:'Completed',time:'2 min ago'},{title:'Prepare content workflow',status:'In progress',time:'8 min ago'},{title:'Sync agent configurations',status:'Queued',time:'12 min ago'}]);
  const nav=[['Overview',LayoutDashboard],['AI Agent Hub',Bot],['Automation Studio',Workflow],['Content Factory',Sparkles],['Business OS',Globe2],['Developer Hub',Cpu],['Settings',Settings2]];
  const filtered=modules.filter(m=>m.name.toLowerCase().includes(query.toLowerCase())||m.desc.toLowerCase().includes(query.toLowerCase()));
  function toast(msg){setNotice(msg);setTimeout(()=>setNotice(''),2800)}
  function addAgent(e){e.preventDefault();if(!agentName.trim())return;setAgents([...agents,{name:agentName.trim(),type:'Custom agent',status:'Idle',color:'cyan',icon:Bot,tasks:0}]);setAgentName('');setShowAgent(false);toast('New agent added to your workspace');}
  function runWorkflow(){setRunning(true);setTasks([{title:'Manual workflow run',status:'Running',time:'Just now'},...tasks]);toast('Workflow run started (workspace simulation)');setTimeout(()=>setRunning(false),2200)}
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Command size={21}/></div><div><b>HYPERLINK</b><span>OPERATING SYSTEM</span></div></div>
      <div className="workspace-label">WORKSPACE <span className="live-dot"/> ONLINE</div>
      <nav>{nav.map(([label,Icon])=><button key={label} className={active===label?'nav-item active':'nav-item'} onClick={()=>setActive(label)}><Icon size={18}/><span>{label}</span>{label==='AI Agent Hub'&&<small>{agents.length}</small>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="upgrade-card"><div className="upgrade-icon"><Zap size={18}/></div><b>Unlock your potential</b><p>Connect tools and scale your workflows.</p><button onClick={()=>toast('Plans are not enabled in this starter yet')}>Explore platform <ChevronRight size={15}/></button></div><div className="profile"><div className="avatar">AK</div><div><b>Workspace Admin</b><span>Free workspace</span></div><Settings2 size={17}/></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><button className="mobile-menu" onClick={()=>toast('Use sidebar navigation on desktop view')}><Menu/></button><div className="breadcrumb">Workspace <ChevronRight size={14}/> <strong>{active}</strong></div><div className="top-actions"><div className="status-pill"><span className="live-dot"/> All systems nominal</div><button className="icon-button" onClick={()=>setActive('Settings')}><Settings2 size={18}/></button><button className="icon-button" title="Sign out" onClick={onLogout}><LogOut size={17}/></button><div className="avatar small">{(user?.email||'U').slice(0,2).toUpperCase()}</div></div></header>
      <section className="content">
        <div className="welcome-row"><div><div className="eyebrow"><Sparkles size={14}/> YOUR AI COMMAND CENTER</div><h1>{active==='Overview'?'Make intelligence work for you.':active}</h1><p className="subhead">{active==='Overview'?'One workspace. Connected tools. More meaningful work.':'Manage your '+active.toLowerCase()+' from one unified workspace.'}</p></div><button className="primary-btn" onClick={()=>setShowAgent(true)}><Plus size={17}/> Create agent</button></div>
        <div className="hero-panel"><div className="hero-copy"><div className="hero-chip"><span/> HYPERLINK OS / CORE</div><h2>From scattered tools<br/>to <span>connected intelligence.</span></h2><p>Your command center for AI agents, workflows and business operations. Build a system that works alongside you.</p><div className="hero-buttons"><button className="white-btn" onClick={()=>setActive('AI Agent Hub')}>Explore agents <ChevronRight size={16}/></button><button className="ghost-btn" onClick={()=>setActive('Automation Studio')}><Play size={15}/> Open automation studio</button></div></div><div className="orb-scene"><div className="orb-ring ring1"/><div className="orb-ring ring2"/><div className="orb-ring ring3"/><div className="orb"><div className="orb-core"><Command size={32}/></div></div><div className="orbit-node node-a"><Bot size={17}/></div><div className="orbit-node node-b"><Workflow size={17}/></div><div className="orbit-node node-c"><Sparkles size={17}/></div><div className="orbit-node node-d"><Cpu size={17}/></div></div><div className="hero-footer"><span><ShieldCheck size={15}/> Secure-by-design foundation</span><span><Activity size={15}/> Modular architecture</span><span><Globe2 size={15}/> Ready to expand</span></div></div>
        <div className="stats-grid"><Stat label="AI agents" value={agents.length.toString().padStart(2,'0')} detail="Workspace agents" icon={Bot} tone="violet"/><Stat label="Workflow runs" value="24" detail="+6 this week" icon={Workflow} tone="cyan"/><Stat label="Tasks completed" value="128" detail="Across your workspace" icon={Check} tone="green"/><Stat label="System health" value="98.6%" detail="Local UI indicator" icon={Activity} tone="pink"/></div>
        <div className="section-heading"><div><h3>Platform modules</h3><p>Purpose-built tools in one connected environment.</p></div><div className="search-box"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search modules..."/></div></div>
        <div className="module-grid">{modules.filter(m=>m.name.toLowerCase().includes(query.toLowerCase())||m.desc.toLowerCase().includes(query.toLowerCase())).map(m=><button className="module-card" key={m.name} onClick={()=>{setActive(m.name);toast(m.name+' workspace opened')}}><div className={'module-icon '+m.color}><m.icon size={20}/></div><div className="module-tag">{m.tag}</div><h4>{m.name}</h4><p>{m.desc}</p><div className="module-link">Open module <ChevronRight size={15}/></div></button>)}</div>
        <div className="lower-grid"><section className="panel"><div className="panel-head"><div><h3>AI Agent Hub</h3><p>Agents in your workspace</p></div><button className="text-btn" onClick={()=>setActive('AI Agent Hub')}>View all <ChevronRight size={14}/></button></div>{agents.map((a,i)=><div className="agent-row" key={a.name}><div className={'agent-icon '+a.color}><a.icon size={18}/></div><div className="agent-info"><b>{a.name}</b><span>{a.type}</span></div><span className={'agent-status '+(a.status==='Active'?'active-status':'')}>{a.status}</span><button className="dots" onClick={()=>toast(a.name+': settings panel coming in next build')}>•••</button></div>)}</section>
        <section className="panel"><div className="panel-head"><div><h3>Activity stream</h3><p>Recent workspace operations</p></div><button className="text-btn" onClick={runWorkflow}><Play size={13}/> Run workflow</button></div>{tasks.map((t,i)=><div className="task-row" key={i}><div className={'task-dot '+(t.status==='Completed'?'done':t.status==='Running'?'running':'')}/><div className="task-info"><b>{t.title}</b><span>{t.time}</span></div><span className="task-status">{t.status}</span></div>)}</section></div>
        <footer><span>HYPERLINK OS <i>v0.1.0 / Foundation</i></span><span>Built for connected intelligence <span className="live-dot"/></span></footer>
      </section>
    </main>
    {showAgent&&<div className="modal-backdrop" onClick={()=>setShowAgent(false)}><form className="modal" onSubmit={addAgent} onClick={e=>e.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">AGENT BUILDER</span><h2>Create an agent</h2></div><button type="button" className="icon-button" onClick={()=>setShowAgent(false)}>×</button></div><label>Agent name</label><input autoFocus value={agentName} onChange={e=>setAgentName(e.target.value)} placeholder="e.g. Customer Support Agent"/><p className="modal-note">This adds a local workspace agent entry. AI model/API integration will be configured in a later secure backend phase.</p><button className="primary-btn full" type="submit"><Plus size={16}/> Create agent</button></form></div>}
    {notice&&<div className="toast"><Check size={16}/>{notice}</div>}
  </div>
}
function Stat({label,value,detail,icon:Icon,tone}){return <div className="stat-card"><div className={'stat-icon '+tone}><Icon size={18}/></div><span className="stat-label">{label}</span><strong>{value}</strong><small>{detail}</small></div>}
createRoot(document.getElementById('root')).render(<AuthGate><App /></AuthGate>);
