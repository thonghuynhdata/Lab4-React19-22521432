import { useParams } from 'react-router';
export default function PersonDetail({people}) { const {id}=useParams(); const person=people.find(p=>p.id===id);
 if(!person) return <div className="panel" role="alert"><h2>404: Person Not Found</h2><p>No record matches ID: {id}</p></div>;
 return <article className="panel"><span className="eyebrow">EXERCISE 1.2.2 · /people/{id}</span><h2>{person.name}</h2><dl className="person-details"><dt>Name</dt><dd>{person.name}</dd><dt>Role</dt><dd>{person.role}</dd><dt>Team</dt><dd>{person.team}</dd><dt>Location</dt><dd>{person.location}</dd><dt>Record ID</dt><dd>{person.id}</dd></dl></article>;
}