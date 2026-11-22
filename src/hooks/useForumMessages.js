import {useEffect,useState} from 'react';
export function useForumMessages(forumId){const [data,setData]=useState([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');const [revision,setRevision]=useState(0);
 useEffect(()=>{const controller=new AbortController();setLoading(true);setError('');setData([]);
 async function fetchMessages(){try{const response=await fetch(`/api/messages/${encodeURIComponent(forumId)}`,{signal:controller.signal});if(!response.ok)throw new Error(`HTTP ${response.status}`);const result=await response.json();if(!controller.signal.aborted)setData(result);}catch(err){if(!controller.signal.aborted)setError(err.message||'Network error');}finally{if(!controller.signal.aborted)setLoading(false);}}
 fetchMessages();return ()=>controller.abort();},[forumId,revision]);
 async function postMessage(payload){const response=await fetch(`/api/messages/${encodeURIComponent(forumId)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!response.ok){const body=await response.json().catch(()=>({}));throw new Error(body.error||`HTTP ${response.status}`);}const created=await response.json();setRevision(prev=>prev+1);return created;}
 return {data,loading,error,postMessage};
}