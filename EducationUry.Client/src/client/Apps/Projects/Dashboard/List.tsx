import {observer} from "mobx-react-lite";
import * as React from "react";
import { Store } from "./Store";
import {NavLink} from "react-router-dom";
import { Button } from "../../../Layouts/Button";
import { Project } from "../../../Shared/Api/Controllers/ApiProjects";
import { DateTime } from "../../../Shared/DateTime";

export const List = observer((props: {
    store: Store
    canArchive: boolean
}) => {
    const store = props.store;

	return <div>
        {store.projects.map((p, idx) => 
            <ProjectView project={p} key={idx} canArchive={props.canArchive} onArchive={() => store.toArchive(p.id)}/>)}
    </div>
});

const ProjectView = observer((props: {
    project: Project
    key: number
    onArchive: () => void
    canArchive: boolean
}) => {
    const proj = props.project;

	return <div className='profile-container' key={props.key} style={{boxShadow: '0px 0px 12px -5px #ccc', borderRadius: '5px', marginTop: '10px', padding: `15px 15px 15px 15px`}}>
        <div style={{display:"flex"}}>
            {/* <div style={{marginLeft: '10px', marginTop: 'auto', marginBottom: 'auto'}}><span style={{border: '1px solid #ccc', borderRadius: '50%', textAlign: 'center', display: 'block', width: '23px', height: '23px'}}>{proj.ads}</span></div> */}
            <div style={{marginLeft: '32px', fontSize: '21px', lineHeight: '13px', marginTop: 'auto', marginBottom: 'auto'}}>
                <NavLink 
                    id={`project-${proj.id}`}
                    style={{color: '#b5b2b2'}}
		            className={`js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade ${props.className}`}
                    to={`/project?id=${proj.id}`}>
                        {proj.name}
                </NavLink>
            </div>
            {props.canArchive &&
            <div style={{marginLeft: 'auto'}}>
                <span>{new DateTime(new Date(proj.created)).toShortWhenString(true)}</span>
                <Button onClick={() => props.onArchive()} style={{marginLeft: '10px'}}>Удалить</Button>
            </div>}
        </div>
    </div>
});